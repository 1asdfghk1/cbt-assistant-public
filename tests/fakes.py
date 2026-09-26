from collections import deque
from copy import deepcopy

from src.llm.deepseek_client import DeepSeekError
from src.rag.embeddings import EmbeddingProvider


class FakeLLMClient:
    """Deterministic queue-based replacement for DeepSeek in API tests."""

    ERROR_DEFAULTS = {
        "timeout": ("AI 服务响应超时，请稍后重试。", 504, False),
        "connection": ("无法连接 AI 服务，请检查网络后重试。", 503, True),
        "authentication": ("AI 服务配置异常，请检查 API Key。", 503, False),
        "rate_limit": ("AI 服务当前请求较多，请稍后再试。", 429, False),
        "upstream": ("AI 服务暂时不可用，请稍后重试。", 502, True),
        "empty_response": ("AI 服务没有返回有效内容，请重新尝试。", 502, False),
    }

    def __init__(self):
        self._responses = deque()
        self.calls = []

    def queue(self, *responses):
        self._responses.extend(responses)
        return self

    def queue_text(self, content="测试回复"):
        return self.queue({"content": content, "tool_calls": []})

    def queue_tool_call(self, name, arguments="{}", call_id="fake-tool-call-1"):
        return self.queue(
            {
                "content": "",
                "tool_calls": [
                    {
                        "id": call_id,
                        "type": "function",
                        "function": {"name": name, "arguments": arguments},
                    }
                ],
            }
        )

    def queue_error(self, kind, *, status_code=None):
        message, default_status, retryable = self.ERROR_DEFAULTS[kind]
        return self.queue(
            DeepSeekError(
                kind,
                message,
                status_code=status_code or default_status,
                retryable=retryable,
            )
        )

    async def chat(self, messages, **kwargs):
        self.calls.append(
            {
                "messages": deepcopy(messages),
                **deepcopy(kwargs),
            }
        )
        if not self._responses:
            raise AssertionError("FakeLLMClient has no queued response")

        response = self._responses.popleft()
        if isinstance(response, BaseException):
            raise response
        if callable(response):
            response = response(self.calls[-1])
        return deepcopy(response)

    async def chat_stream(self, messages, **kwargs):
        """Emit deterministic DeepSeek-shaped chunks for SSE/WebSocket tests."""
        self.calls.append(
            {
                "messages": deepcopy(messages),
                **deepcopy(kwargs),
            }
        )
        if not self._responses:
            raise AssertionError("FakeLLMClient has no queued response")

        response = self._responses.popleft()
        if isinstance(response, BaseException):
            raise response
        if callable(response):
            response = response(self.calls[-1])
        response = deepcopy(response)

        content = response.get("content", "")
        if content:
            yield {"message": {"content": content}, "done": False}

        tool_calls = response.get("tool_calls") or []
        if tool_calls:
            yield {
                "message": {"content": "", "tool_calls": tool_calls},
                "done": False,
            }

        yield {"message": {"content": ""}, "done": True}

    @property
    def call_count(self):
        return len(self.calls)


def tool_message_from(call):
    return next(message for message in call["messages"] if message["role"] == "tool")


class FakeEmbeddingProvider(EmbeddingProvider):
    """Substring-mapped vectors for deterministic RAG tests."""

    provider_name = "fake"

    def __init__(
        self,
        mapping=None,
        *,
        default_vector=None,
        model="fake-embedding-v1",
    ):
        self.mapping = list((mapping or {}).items())
        self.default_vector = list(default_vector or [0.0, 0.0, 0.0, 0.0])
        self.model = model
        self.document_calls = []
        self.query_calls = []
        self.document_error = None
        self.query_error = None

    async def embed_texts(self, texts):
        if self.document_error:
            raise self.document_error
        self.document_calls.append(list(texts))
        return [self._vector_for(text) for text in texts]

    async def embed_query(self, text):
        if self.query_error:
            raise self.query_error
        self.query_calls.append(text)
        return self._vector_for(text)

    def _vector_for(self, text):
        normalized = text.lower()
        for keyword, vector in self.mapping:
            if keyword.lower() in normalized:
                return list(vector)
        return list(self.default_vector)
