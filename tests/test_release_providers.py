import json
import os
import subprocess
import sys
from dataclasses import replace
from pathlib import Path

import httpx
import pytest

from src.llm.deepseek_client import DeepSeekClient
from src.llm.ollama_client import OllamaClient


def _mock_ollama(monkeypatch, handler):
    transport = httpx.MockTransport(handler)
    original_client = httpx.AsyncClient
    monkeypatch.setattr(
        "src.llm.ollama_client.httpx.AsyncClient",
        lambda **kwargs: original_client(transport=transport, **kwargs),
    )


def _ollama_response(message, stream):
    if stream:
        chunks = [
            {"message": message, "done": False},
            {"message": {"content": ""}, "done": True},
        ]
        return httpx.Response(
            200, text="".join(json.dumps(chunk) + "\n" for chunk in chunks)
        )
    return httpx.Response(200, json={"message": message})


def test_release_defaults_to_ollama_and_can_build_deepseek_client():
    import backend.server as server

    assert server.LLM_PROVIDER == "ollama"
    assert isinstance(server.create_llm_client(server.model_settings), OllamaClient)

    deepseek_settings = replace(
        server.model_settings,
        llm_provider="deepseek",
        deepseek_api_key="test-only-not-a-real-key",
    )
    client = server.create_llm_client(deepseek_settings)
    assert isinstance(client, DeepSeekClient)
    assert client.model == "deepseek-chat"


@pytest.mark.parametrize(
    ("provider", "key", "client_name"),
    [
        ("ollama", None, "OllamaClient"),
        ("deepseek", "test-only-not-a-real-key", "DeepSeekClient"),
    ],
)
def test_server_imports_with_selected_provider(
    tmp_path, provider, key, client_name
):
    project_root = Path(__file__).resolve().parent.parent
    environment = os.environ.copy()
    environment["LLM_PROVIDER"] = provider
    if key is None:
        environment.pop("DEEPSEEK_API_KEY", None)
    else:
        environment["DEEPSEEK_API_KEY"] = key
    environment["CBT_DATA_DIR"] = str(tmp_path / "runtime")
    environment["RAG_ENABLED"] = "false"

    result = subprocess.run(
        [
            sys.executable,
            "-c",
            "import backend.server as s; print(s.LLM_PROVIDER, type(s.llm_client).__name__)",
        ],
        cwd=project_root,
        env=environment,
        capture_output=True,
        text=True,
        timeout=20,
        check=False,
    )

    assert result.returncode == 0, result.stderr
    assert f"{provider} {client_name}" in result.stdout


def test_ollama_http_chat_uses_real_tool_result(
    fastapi_client, override_db, monkeypatch
):
    import backend.server as server

    session_id = "public-ollama-http"
    override_db.sync_test_results(
        session_id,
        [{"name": "GAD-7", "score": 7, "level": "mild", "date": "2026-09-26"}],
    )
    payloads = []

    def respond(request):
        payload = json.loads(request.content)
        payloads.append(payload)
        if payload.get("tools"):
            return _ollama_response(
                {
                    "content": "",
                    "tool_calls": [
                        {"function": {"name": "get_user_test_results", "arguments": {}}}
                    ],
                },
                stream=False,
            )
        return _ollama_response({"content": "你的 GAD-7 分数是 7。"}, stream=False)

    _mock_ollama(monkeypatch, respond)
    monkeypatch.setattr(server, "llm_client", server.create_llm_client(server.model_settings))

    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": session_id, "message": "我最近的 GAD-7 是多少？"},
    )

    assert response.status_code == 200
    assert "7" in response.json()["response"]
    assert len(payloads) == 2
    assert payloads[1]["messages"][-1]["tool_name"] == "get_user_test_results"
    assert '"score": 7' in payloads[1]["messages"][-1]["content"]


def test_ollama_stream_chat_finishes_after_tool_round(
    fastapi_client, override_db, monkeypatch
):
    import backend.server as server

    session_id = "public-ollama-stream"
    override_db.sync_test_results(
        session_id,
        [{"name": "GAD-7", "score": 5, "level": "mild", "date": "2026-09-26"}],
    )
    payloads = []

    def respond(request):
        payload = json.loads(request.content)
        payloads.append(payload)
        if payload.get("tools"):
            return _ollama_response(
                {
                    "tool_calls": [
                        {"function": {"name": "get_user_test_results", "arguments": {}}}
                    ]
                },
                stream=True,
            )
        return _ollama_response({"content": "你的分数是 5。"}, stream=True)

    _mock_ollama(monkeypatch, respond)
    monkeypatch.setattr(server, "llm_client", server.create_llm_client(server.model_settings))

    response = fastapi_client.post(
        "/api/chat/stream",
        json={"session_id": session_id, "message": "我最近的 GAD-7 是多少？"},
    )
    events = [
        json.loads(line.removeprefix("data: "))
        for line in response.text.splitlines()
        if line.startswith("data: ")
    ]

    assert response.status_code == 200
    assert any(event.get("tool_call") == "get_user_test_results" for event in events)
    assert next(event for event in events if event.get("done"))["full_response"] == (
        "你的分数是 5。"
    )
    assert len(payloads) == 2
    assert "tools" not in payloads[1]


def test_ollama_disconnected_returns_safe_http_error(fastapi_client, monkeypatch):
    import backend.server as server

    def respond(request):
        raise httpx.ConnectError("private machine path", request=request)

    _mock_ollama(monkeypatch, respond)
    monkeypatch.setattr(server, "llm_client", server.create_llm_client(server.model_settings))
    response = fastapi_client.post(
        "/api/chat", json={"session_id": "disconnected", "message": "你好"}
    )

    assert response.status_code == 503
    assert response.json()["detail"]["code"] == "connection"
    assert "private machine path" not in response.text
