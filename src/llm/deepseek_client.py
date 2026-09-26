import asyncio
import logging
import time

from openai import (
    APIConnectionError,
    APIStatusError,
    APITimeoutError,
    AsyncOpenAI,
    AuthenticationError,
    RateLimitError,
)

from .base import BaseLLMClient
from .errors import LLMError


logger = logging.getLogger(__name__)


class DeepSeekError(LLMError):
    """Keep the existing DeepSeek exception type for compatibility."""


class DeepSeekClient(BaseLLMClient):

    def __init__(
        self,
        api_key: str,
        model: str = "deepseek-chat",
        request_timeout_seconds: float = 30.0,
        max_attempts: int = 2,
        retry_delay_seconds: float = 0.5,
    ):
        self.client = AsyncOpenAI(
            api_key=api_key,
            base_url="https://api.deepseek.com",
            timeout=request_timeout_seconds,
            # Keep retries explicit so they stay limited and observable.
            max_retries=0,
        )
        self.model = model
        self.max_attempts = max(1, max_attempts)
        self.retry_delay_seconds = max(0.0, retry_delay_seconds)

    @staticmethod
    def _categorize_error(exc: Exception) -> DeepSeekError:
        if isinstance(exc, DeepSeekError):
            return exc

        if isinstance(exc, APITimeoutError):
            return DeepSeekError(
                "timeout",
                "AI 服务响应超时，请稍后重试。",
                status_code=504,
            )

        if isinstance(exc, AuthenticationError):
            return DeepSeekError(
                "authentication",
                "AI 服务配置异常，请检查 API Key。",
                status_code=503,
            )

        if isinstance(exc, RateLimitError):
            return DeepSeekError(
                "rate_limit",
                "AI 服务当前请求较多，请稍后再试。",
                status_code=429,
            )

        if isinstance(exc, APIConnectionError):
            return DeepSeekError(
                "connection",
                "无法连接 AI 服务，请检查网络后重试。",
                status_code=503,
                retryable=True,
            )

        if isinstance(exc, APIStatusError):
            return DeepSeekError(
                "upstream",
                "AI 服务暂时不可用，请稍后重试。",
                status_code=502,
                retryable=exc.status_code in {502, 503, 504},
            )

        return DeepSeekError(
            "unexpected",
            "AI 服务暂时不可用，请稍后重试。",
            status_code=503,
        )

    async def _create_completion(
        self,
        params: dict,
        request_id: str | None,
        operation: str,
    ):
        safe_request_id = request_id or "untracked"
        started_at = time.monotonic()

        for attempt in range(1, self.max_attempts + 1):
            try:
                response = await self.client.chat.completions.create(**params)
                logger.info(
                    "deepseek_request_completed request_id=%s model=%s operation=%s "
                    "attempt=%s elapsed_ms=%s",
                    safe_request_id,
                    self.model,
                    operation,
                    attempt,
                    round((time.monotonic() - started_at) * 1000),
                )
                return response
            except Exception as exc:
                error = self._categorize_error(exc)
                will_retry = error.retryable and attempt < self.max_attempts
                logger.warning(
                    "deepseek_request_failed request_id=%s model=%s operation=%s "
                    "attempt=%s error_type=%s retry=%s elapsed_ms=%s",
                    safe_request_id,
                    self.model,
                    operation,
                    attempt,
                    error.kind,
                    will_retry,
                    round((time.monotonic() - started_at) * 1000),
                )
                if not will_retry:
                    raise error from exc
                await asyncio.sleep(self.retry_delay_seconds * attempt)

        raise DeepSeekError("unexpected", "AI 服务暂时不可用，请稍后重试。")

    async def chat(
        self,
        messages: list[dict],
        options: dict = None,
        tools=None,
        tool_choice="auto",
        request_id: str | None = None,
    ):
        params = {
            "model": self.model,
            "messages": messages,
            "temperature": 0.7,
        }

        if options:
            params.update(options)

        if tools:
            params["tools"] = tools
            params["tool_choice"] = tool_choice

        response = await self._create_completion(params, request_id, "chat")
        choices = getattr(response, "choices", None)
        if not choices:
            raise DeepSeekError(
                "empty_response",
                "AI 服务没有返回有效内容，请重新尝试。",
                status_code=502,
            )

        msg = choices[0].message
        content = msg.content or ""
        tool_calls = getattr(msg, "tool_calls", None) or []
        if not content.strip() and not tool_calls:
            raise DeepSeekError(
                "empty_response",
                "AI 服务没有返回有效内容，请重新尝试。",
                status_code=502,
            )

        result = {"content": content}
        if tool_calls:
            result["tool_calls"] = [
                {
                    "id": tc.id,
                    "type": "function",
                    "function": {
                        "name": tc.function.name,
                        "arguments": tc.function.arguments,
                    },
                }
                for tc in tool_calls
            ]

        return result



    async def chat_stream(
        self,
        messages: list[dict],
        options: dict = None,
        tools=None,
        tool_choice="auto",
        request_id: str | None = None,
    ):
        params = {
            "model": self.model,
            "messages": messages,
            "temperature": 0.7,
            "stream": True,
        }

        if options:
            params.update(options)

        if tools:
            params["tools"] = tools
            params["tool_choice"] = tool_choice

        stream = await self._create_completion(params, request_id, "chat_stream")
        tool_call_parts: dict[int, dict] = {}
        received_content = False

        try:
            async for chunk in stream:
                choices = getattr(chunk, "choices", None)
                if not choices:
                    continue

                delta = choices[0].delta
                content = delta.content or ""
                if content:
                    received_content = True
                    yield {"message": {"content": content}, "done": False}

                for tc in getattr(delta, "tool_calls", None) or []:
                    index = getattr(tc, "index", 0)
                    part = tool_call_parts.setdefault(
                        index,
                        {
                            "id": "",
                            "type": "function",
                            "function": {"name": "", "arguments": ""},
                        },
                    )
                    if getattr(tc, "id", None):
                        part["id"] = tc.id
                    function = getattr(tc, "function", None)
                    if function:
                        if getattr(function, "name", None):
                            part["function"]["name"] = function.name
                        if getattr(function, "arguments", None):
                            part["function"]["arguments"] += function.arguments
        except Exception as exc:
            error = self._categorize_error(exc)
            logger.warning(
                "deepseek_stream_failed request_id=%s model=%s error_type=%s",
                request_id or "untracked",
                self.model,
                error.kind,
            )
            raise error from exc

        if tool_call_parts:
            yield {
                "message": {
                    "content": "",
                    "tool_calls": [tool_call_parts[i] for i in sorted(tool_call_parts)],
                },
                "done": False,
            }

        if not received_content and not tool_call_parts:
            raise DeepSeekError(
                "empty_response",
                "AI 服务没有返回有效内容，请重新尝试。",
                status_code=502,
            )

        yield {"done": True, "message": {"content": ""}}
