"""Ollama's native chat API adapted to the application's LLM contract."""

import json
import logging
import re

import httpx

from .base import BaseLLMClient
from .errors import LLMError


logger = logging.getLogger(__name__)


class ContentCleaner:
    @staticmethod
    def strip_think_tags(text: str) -> str:
        if not text:
            return text
        return re.sub(r"<think>.*?</think>", "", text, flags=re.DOTALL).strip()


class OllamaClient(BaseLLMClient):
    """Use a local Ollama model without exposing native API differences upstream."""

    def __init__(self, base_url: str, model: str):
        self.base_url = base_url.rstrip("/")
        self.model = model

    @staticmethod
    def _options(options: dict | None) -> dict:
        result = dict(options or {})
        if "max_tokens" in result:
            result["num_predict"] = result.pop("max_tokens")
        return result or {"temperature": 0.7, "top_p": 0.9, "num_predict": 1024}

    @staticmethod
    def _normalize_tool_call(call: dict) -> dict:
        function = call.get("function") or {}
        name = function.get("name")
        arguments = function.get("arguments", {})
        if isinstance(arguments, str):
            try:
                arguments = json.loads(arguments)
            except json.JSONDecodeError as error:
                raise LLMError(
                    "invalid_tool_call", "本地模型返回了无效的工具参数，请重试。", 502
                ) from error
        if not isinstance(name, str) or not name or not isinstance(arguments, dict):
            raise LLMError("invalid_tool_call", "本地模型返回了无效的工具调用，请重试。", 502)
        return {
            "type": "function",
            "function": {"name": name, "arguments": arguments},
        }

    @classmethod
    def _native_messages(cls, messages: list[dict]) -> list[dict]:
        """Ollama uses tool_name rather than OpenAI's tool_call_id."""
        result = []
        pending_names = []
        for message in messages:
            item = dict(message)
            if item.get("role") == "assistant" and item.get("tool_calls"):
                calls = [cls._normalize_tool_call(call) for call in item["tool_calls"]]
                item["tool_calls"] = calls
                pending_names.extend(call["function"]["name"] for call in calls)
            elif item.get("role") == "tool":
                item.pop("tool_call_id", None)
                if pending_names:
                    item["tool_name"] = pending_names.pop(0)
            result.append(item)
        return result

    @staticmethod
    def _selected_tool(tools: list | None, tool_choice) -> tuple[list | None, dict | None]:
        if tool_choice == "none":
            return None, None
        if not isinstance(tool_choice, dict):
            return tools, None
        name = (tool_choice.get("function") or {}).get("name")
        selected = next(
            (tool for tool in tools or [] if tool.get("function", {}).get("name") == name),
            None,
        )
        if selected is None:
            raise LLMError("invalid_tool_choice", "指定的本地工具不可用。", 500)
        return [selected], selected

    @staticmethod
    def _required_tool_call(selected_tool: dict | None) -> list[dict]:
        if selected_tool is None:
            return []
        function = selected_tool["function"]
        if (function.get("parameters") or {}).get("required"):
            raise LLMError("tool_call_missing", "本地模型未能调用所需工具，请重试。", 502)
        # The forced personal-data routes have no required parameters. Querying
        # SQLite is safer than accepting an ungrounded answer from the model.
        return [{"type": "function", "function": {"name": function["name"], "arguments": {}}}]

    def _payload(
        self,
        messages: list[dict],
        options: dict | None,
        tools: list | None,
        tool_choice,
        stream: bool,
    ) -> tuple[dict, dict | None]:
        selected_tools, forced_tool = self._selected_tool(tools, tool_choice)
        native_messages = self._native_messages(messages)
        if forced_tool:
            instruction = (
                f"先调用提供的 {forced_tool['function']['name']} 工具读取用户数据，"
                "不要根据记忆猜测或直接回答。"
            )
            if native_messages and native_messages[0].get("role") == "system":
                native_messages[0]["content"] += "\n\n" + instruction
            else:
                native_messages.insert(0, {"role": "system", "content": instruction})
        payload = {
            "model": self.model,
            "messages": native_messages,
            "stream": stream,
            "options": self._options(options),
            "think": False,
        }
        if selected_tools:
            payload["tools"] = selected_tools
        return payload, forced_tool

    @staticmethod
    def _error(error: Exception) -> LLMError:
        if isinstance(error, LLMError):
            return error
        if isinstance(error, httpx.TimeoutException):
            return LLMError("timeout", "本地模型响应超时，请稍后重试。", 504)
        if isinstance(error, httpx.HTTPStatusError):
            if error.response.status_code == 404:
                return LLMError(
                    "model_not_found", "本地模型未找到，请先使用 ollama pull 下载配置的模型。", 503
                )
            return LLMError("upstream", "本地模型服务返回错误，请检查 Ollama。", 502)
        if isinstance(error, httpx.RequestError):
            return LLMError(
                "connection", "无法连接 Ollama，请确认本地服务已启动。", 503
            )
        return LLMError("upstream", "本地模型返回了无法识别的响应，请重试。", 502)

    async def chat(
        self,
        messages: list[dict],
        options: dict | None = None,
        tools: list | None = None,
        tool_choice="auto",
        request_id: str | None = None,
    ) -> dict:
        payload, forced_tool = self._payload(messages, options, tools, tool_choice, False)
        try:
            async with httpx.AsyncClient(timeout=120.0, trust_env=False) as client:
                response = await client.post(f"{self.base_url}/api/chat", json=payload)
                response.raise_for_status()
                message = response.json().get("message", {})
            if not isinstance(message, dict):
                raise ValueError("invalid Ollama message")
            calls = [self._normalize_tool_call(call) for call in message.get("tool_calls") or []]
            if forced_tool and not calls:
                calls = self._required_tool_call(forced_tool)
            content = ContentCleaner.strip_think_tags(message.get("content") or "")
            if not content and not calls:
                raise LLMError("empty_response", "本地模型没有返回有效内容，请重试。", 502)
            return {"content": content, "tool_calls": calls}
        except Exception as error:
            safe_error = self._error(error)
            logger.warning(
                "ollama_chat_failed request_id=%s model=%s error_type=%s",
                request_id or "untracked",
                self.model,
                safe_error.kind,
            )
            if safe_error is error:
                raise
            raise safe_error from error

    async def chat_stream(
        self,
        messages: list[dict],
        options: dict | None = None,
        tools: list | None = None,
        tool_choice="auto",
        request_id: str | None = None,
    ):
        payload, forced_tool = self._payload(messages, options, tools, tool_choice, True)
        calls = []
        received_content = False
        try:
            async with httpx.AsyncClient(timeout=120.0, trust_env=False) as client:
                async with client.stream(
                    "POST", f"{self.base_url}/api/chat", json=payload
                ) as response:
                    response.raise_for_status()
                    async for line in response.aiter_lines():
                        if not line:
                            continue
                        data = json.loads(line)
                        if not isinstance(data, dict):
                            raise ValueError("invalid Ollama stream chunk")
                        message = data.get("message") or {}
                        for call in message.get("tool_calls") or []:
                            calls.append(self._normalize_tool_call(call))
                        content = message.get("content") or ""
                        if content:
                            received_content = True
                            if not forced_tool:
                                yield {"message": {"content": content}, "done": False}
                        if data.get("done"):
                            if forced_tool and not calls:
                                calls = self._required_tool_call(forced_tool)
                            if not received_content and not calls:
                                raise LLMError(
                                    "empty_response", "本地模型没有返回有效内容，请重试。", 502
                                )
                            if calls:
                                yield {
                                    "message": {"content": "", "tool_calls": calls},
                                    "done": False,
                                }
                            yield {"message": {"content": ""}, "done": True}
                            return
            raise LLMError("upstream", "本地模型的流式响应意外结束，请重试。", 502)
        except Exception as error:
            safe_error = self._error(error)
            logger.warning(
                "ollama_stream_failed request_id=%s model=%s error_type=%s",
                request_id or "untracked",
                self.model,
                safe_error.kind,
            )
            if safe_error is error:
                raise
            raise safe_error from error
