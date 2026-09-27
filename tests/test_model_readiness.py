"""Model readiness reports actionable local setup problems without contacting a model."""

import io
import json
import socket

import httpx
import pytest

from scripts import start_local


@pytest.mark.parametrize(
    ("model_list", "ready", "detail"),
    [
        ([{"name": "qwen3:4b-instruct"}], True, None),
        ([{"name": "another-model"}], False, "ollama pull qwen3:4b-instruct"),
        ("unexpected", False, "无法读取 Ollama 模型清单"),
        (["unexpected"], False, "无法读取 Ollama 模型清单"),
    ],
)
def test_readiness_checks_configured_ollama_model(
    fastapi_client, monkeypatch, model_list, ready, detail,
):
    real_client = httpx.AsyncClient
    transport = httpx.MockTransport(
        lambda request: httpx.Response(200, json={"models": model_list})
    )
    monkeypatch.setattr(
        httpx, "AsyncClient",
        lambda **kwargs: real_client(transport=transport, **kwargs),
    )

    response = fastapi_client.get("/api/ready")

    assert response.status_code == 200
    assert response.json()["ready"] is ready
    assert response.json()["provider"] == "Ollama"
    assert response.json()["model"] == "qwen3:4b-instruct"
    if detail:
        assert detail in response.json()["detail"]


def test_readiness_reports_ollama_connection_failure(fastapi_client, monkeypatch):
    real_client = httpx.AsyncClient

    def disconnected(request):
        raise httpx.ConnectError("test-only connection failure", request=request)

    transport = httpx.MockTransport(disconnected)
    monkeypatch.setattr(
        httpx, "AsyncClient",
        lambda **kwargs: real_client(transport=transport, **kwargs),
    )

    response = fastapi_client.get("/api/ready")

    assert response.status_code == 200
    assert response.json()["ready"] is False
    assert "无法连接 Ollama" in response.json()["detail"]


def test_deepseek_readiness_only_reports_configured_key(fastapi_client, monkeypatch):
    import backend.server as server

    monkeypatch.setattr(server, "LLM_PROVIDER", "deepseek")
    monkeypatch.setattr(server, "ACTIVE_MODEL", "deepseek-chat")

    response = fastapi_client.get("/api/ready")

    assert response.status_code == 200
    assert response.json()["ready"] is True
    assert response.json()["provider"] == "DeepSeek"
    assert "不验证云端额度或网络" in response.json()["detail"]
    assert "api_key" not in response.text.lower()


@pytest.mark.parametrize(
    ("model_list", "expected_error"),
    [
        ([{"name": "qwen3:4b-instruct"}], None),
        ([{"name": "another-model"}], "ollama pull qwen3:4b-instruct"),
        ("unexpected", "无效的模型清单"),
        (["unexpected"], "无效的模型清单"),
    ],
)
def test_startup_checks_ollama_model_list(
    monkeypatch, model_list, expected_error,
):
    class FakeOpener:
        def open(self, request, timeout):
            return io.BytesIO(json.dumps({"models": model_list}).encode())

    monkeypatch.setattr(start_local, "build_opener", lambda *_: FakeOpener())

    if expected_error:
        with pytest.raises(RuntimeError, match=expected_error):
            start_local.check_ollama("http://localhost:11434", "qwen3:4b-instruct")
    else:
        start_local.check_ollama("http://localhost:11434", "qwen3:4b-instruct")


def test_startup_reports_busy_port():
    with socket.socket() as listener:
        listener.bind(("127.0.0.1", 0))
        listener.listen()
        port = listener.getsockname()[1]
        with pytest.raises(RuntimeError, match=f"端口 {port} 已被占用"):
            start_local.check_port("127.0.0.1", port)
