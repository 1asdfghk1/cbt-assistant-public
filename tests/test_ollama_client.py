import json

import httpx
import pytest

from src.llm.errors import LLMError
from src.llm.ollama_client import OllamaClient


def _use_mock_transport(monkeypatch, handler):
    transport = httpx.MockTransport(handler)
    original_client = httpx.AsyncClient
    monkeypatch.setattr(
        "src.llm.ollama_client.httpx.AsyncClient",
        lambda **kwargs: original_client(transport=transport, **kwargs),
    )


@pytest.mark.asyncio
async def test_ollama_chat_accepts_server_arguments_and_maps_options(monkeypatch):
    requests = []

    def respond(request):
        requests.append(json.loads(request.content))
        return httpx.Response(
            200, json={"message": {"role": "assistant", "content": "你好"}}
        )

    _use_mock_transport(monkeypatch, respond)
    client = OllamaClient("http://127.0.0.1:11434", "qwen3:4b")

    reply = await client.chat(
        [{"role": "user", "content": "你好"}],
        options={"temperature": 0.7, "max_tokens": 128},
        tool_choice="auto",
        request_id="test-001",
    )

    assert reply == {"content": "你好", "tool_calls": []}
    assert requests[0]["options"] == {"temperature": 0.7, "num_predict": 128}
    assert requests[0]["model"] == "qwen3:4b"
    assert "tool_choice" not in requests[0]


@pytest.mark.asyncio
async def test_ollama_forced_read_tool_uses_database_even_if_model_returns_text(monkeypatch):
    payloads = []

    def respond(request):
        payloads.append(json.loads(request.content))
        return httpx.Response(200, json={"message": {"content": "guess"}})

    _use_mock_transport(monkeypatch, respond)
    client = OllamaClient("http://127.0.0.1:11434", "qwen3:4b")
    tool = {
        "type": "function",
        "function": {
            "name": "get_user_test_results",
            "description": "Read test results",
            "parameters": {"type": "object", "properties": {}},
        },
    }
    unused_tool = {
        "type": "function",
        "function": {"name": "other", "parameters": {"type": "object"}},
    }

    result = await client.chat(
        [{"role": "user", "content": "我的 GAD-7 分数是多少？"}],
        tools=[tool, unused_tool],
        tool_choice={"type": "function", "function": {"name": "get_user_test_results"}},
    )

    assert result["tool_calls"][0]["function"] == {
        "name": "get_user_test_results",
        "arguments": {},
    }
    assert payloads[0]["tools"] == [tool]
    assert "直接回答" in payloads[0]["messages"][0]["content"]

    await client.chat(
        [
            {"role": "user", "content": "我的 GAD-7 分数是多少？"},
            {"role": "assistant", "content": "", "tool_calls": result["tool_calls"]},
            {"role": "tool", "content": '[{"score": 7}]'},
        ],
        tools=None,
    )
    assert payloads[1]["messages"][-1]["tool_name"] == "get_user_test_results"
    assert "tools" not in payloads[1]


@pytest.mark.asyncio
async def test_ollama_stream_normalizes_tool_calls(monkeypatch):
    def respond(request):
        lines = [
            {"message": {"content": ""}, "done": False},
            {
                "message": {
                    "tool_calls": [
                        {"function": {"name": "get_user_test_results", "arguments": {}}}
                    ]
                },
                "done": False,
            },
            {
                "message": {
                    "tool_calls": [
                        {"function": {"name": "get_user_activities", "arguments": {}}}
                    ]
                },
                "done": False,
            },
            {"message": {"content": ""}, "done": True},
        ]
        body = "".join(json.dumps(line) + "\n" for line in lines)
        return httpx.Response(200, text=body)

    _use_mock_transport(monkeypatch, respond)
    client = OllamaClient("http://127.0.0.1:11434", "qwen3:4b")
    chunks = [
        chunk
        async for chunk in client.chat_stream(
            [{"role": "user", "content": "我的分数"}], request_id="stream-001"
        )
    ]

    assert chunks[0]["message"]["tool_calls"][0]["function"]["name"] == (
        "get_user_test_results"
    )
    assert len(chunks[0]["message"]["tool_calls"]) == 2
    assert chunks[-1]["done"] is True


@pytest.mark.asyncio
async def test_ollama_connection_error_is_safe(monkeypatch):
    def respond(request):
        raise httpx.ConnectError("private local path", request=request)

    _use_mock_transport(monkeypatch, respond)
    client = OllamaClient("http://127.0.0.1:11434", "qwen3:4b")

    with pytest.raises(LLMError) as error:
        await client.chat([{"role": "user", "content": "你好"}])

    assert error.value.kind == "connection"
    assert error.value.status_code == 503
    assert "private local path" not in error.value.user_message


@pytest.mark.asyncio
async def test_ollama_missing_model_gives_download_hint(monkeypatch):
    _use_mock_transport(monkeypatch, lambda request: httpx.Response(404))
    client = OllamaClient("http://127.0.0.1:11434", "qwen3:4b")

    with pytest.raises(LLMError) as error:
        await client.chat([{"role": "user", "content": "你好"}])

    assert error.value.kind == "model_not_found"
    assert "ollama pull" in error.value.user_message
