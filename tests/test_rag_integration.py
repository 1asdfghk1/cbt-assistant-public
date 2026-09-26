from dataclasses import replace

import pytest

from src.rag import RAGService, RAGSettings
from src.tools import select_forced_tool


def _settings(tmp_path, knowledge_dir, *, enabled=True):
    return RAGSettings(
        enabled=enabled,
        knowledge_base_dir=knowledge_dir,
        cache_dir=tmp_path / "integration-rag-cache",
        embedding_provider="fake",
        embedding_model="fake-embedding-v1",
        embedding_base_url="http://unused.test",
        embedding_api_key=None,
        top_k=3,
        score_threshold=0.75,
        max_context_chars=1500,
        chunk_size=500,
        chunk_overlap=50,
    )


async def _initialized_service(tmp_path, knowledge_dir, provider):
    service = RAGService(_settings(tmp_path, knowledge_dir), provider)
    assert await service.initialize() is True
    return service


@pytest.mark.asyncio
async def test_knowledge_query_injects_retrieved_reference_into_chat(
    tmp_path,
    rag_knowledge_base,
    fake_embedding_provider,
    fastapi_client,
    fake_llm_client,
    monkeypatch,
):
    import backend.server as server

    service = await _initialized_service(
        tmp_path, rag_knowledge_base, fake_embedding_provider
    )
    monkeypatch.setattr(server, "rag_service", service)
    fake_llm_client.queue_text("knowledge response")

    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": "rag-knowledge", "message": "什么是自动化思维？"},
    )

    assert response.status_code == 200
    assert response.json()["context_used"][0]["source"] == "automatic_thoughts.md"
    reference = next(
        message
        for message in fake_llm_client.calls[0]["messages"]
        if "RETRIEVED REFERENCE MATERIAL" in message.get("content", "")
    )
    assert reference["role"] == "user"
    assert "自动化思维是快速出现" in reference["content"]
    assert "not instructions" in reference["content"]
    assert fake_llm_client.calls[0]["tool_choice"] == "auto"


@pytest.mark.asyncio
async def test_personal_gad_query_skips_rag_and_keeps_forced_sqlite_tool(
    tmp_path,
    rag_knowledge_base,
    fake_embedding_provider,
    fastapi_client,
    fake_llm_client,
    override_db,
    sample_test_results,
    monkeypatch,
):
    import backend.server as server

    service = await _initialized_service(
        tmp_path, rag_knowledge_base, fake_embedding_provider
    )
    monkeypatch.setattr(server, "rag_service", service)
    override_db.sync_test_results("personal-gad", sample_test_results)
    fake_llm_client.queue_tool_call("get_user_test_results").queue_text(
        "personal score response"
    )

    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": "personal-gad", "message": "我最近的 GAD-7 是多少？"},
    )

    assert response.status_code == 200
    assert response.json()["context_used"] == []
    assert fake_embedding_provider.query_calls == []
    assert fake_llm_client.calls[0]["tool_choice"] == {
        "type": "function",
        "function": {"name": "get_user_test_results"},
    }
    tool_message = next(
        message
        for message in fake_llm_client.calls[1]["messages"]
        if message["role"] == "tool"
    )
    assert '"score": 12' in tool_message["content"]


@pytest.mark.asyncio
async def test_gad_definition_uses_rag_instead_of_personal_data_tool(
    tmp_path,
    rag_knowledge_base,
    fake_embedding_provider,
    fastapi_client,
    fake_llm_client,
    monkeypatch,
):
    import backend.server as server

    service = await _initialized_service(
        tmp_path, rag_knowledge_base, fake_embedding_provider
    )
    monkeypatch.setattr(server, "rag_service", service)
    fake_llm_client.queue_text("GAD-7 knowledge response")

    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": "gad-definition", "message": "什么是 GAD-7？"},
    )

    assert response.status_code == 200
    assert select_forced_tool("什么是 GAD-7？") is None
    assert response.json()["context_used"][0]["source"] == "gad7.md"
    assert fake_llm_client.calls[0]["tool_choice"] == "auto"


@pytest.mark.asyncio
async def test_low_relevance_chat_receives_no_rag_context(
    tmp_path,
    rag_knowledge_base,
    fake_embedding_provider,
    fastapi_client,
    fake_llm_client,
    monkeypatch,
):
    import backend.server as server

    service = await _initialized_service(
        tmp_path, rag_knowledge_base, fake_embedding_provider
    )
    monkeypatch.setattr(server, "rag_service", service)
    fake_llm_client.queue_text("ordinary response")

    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": "low-relevance", "message": "今天心情不太好。"},
    )

    assert response.status_code == 200
    assert response.json()["context_used"] == []
    assert all(
        "RETRIEVED REFERENCE MATERIAL" not in message.get("content", "")
        for message in fake_llm_client.calls[0]["messages"]
    )


@pytest.mark.asyncio
async def test_query_embedding_failure_falls_back_to_normal_chat(
    tmp_path,
    rag_knowledge_base,
    fake_embedding_provider,
    fastapi_client,
    fake_llm_client,
    monkeypatch,
):
    import backend.server as server

    service = await _initialized_service(
        tmp_path, rag_knowledge_base, fake_embedding_provider
    )
    fake_embedding_provider.query_error = RuntimeError("private embedding URL")
    monkeypatch.setattr(server, "rag_service", service)
    fake_llm_client.queue_text("fallback response")

    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": "rag-query-failure", "message": "什么是自动化思维？"},
    )

    assert response.status_code == 200
    assert response.json()["response"] == "fallback response"
    assert response.json()["context_used"] == []
    assert "private embedding URL" not in response.text


@pytest.mark.asyncio
async def test_startup_embedding_failure_does_not_break_chat(
    tmp_path,
    rag_knowledge_base,
    fake_embedding_provider,
    fastapi_client,
    fake_llm_client,
    monkeypatch,
):
    import backend.server as server

    fake_embedding_provider.document_error = RuntimeError("embedding startup failure")
    service = RAGService(
        _settings(tmp_path, rag_knowledge_base), fake_embedding_provider
    )
    assert await service.initialize() is False
    monkeypatch.setattr(server, "rag_service", service)
    fake_llm_client.queue_text("chat remains available")

    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": "rag-startup-failure", "message": "什么是自动化思维？"},
    )

    assert response.status_code == 200
    assert response.json()["response"] == "chat remains available"
    assert "embedding startup failure" not in response.text


def test_disabled_rag_switch_does_not_embed_query(
    tmp_path,
    rag_knowledge_base,
    fake_embedding_provider,
    fastapi_client,
    fake_llm_client,
    monkeypatch,
):
    import backend.server as server

    disabled_settings = replace(
        _settings(tmp_path, rag_knowledge_base),
        enabled=False,
    )
    service = RAGService(disabled_settings, fake_embedding_provider)
    monkeypatch.setattr(server, "rag_service", service)
    fake_llm_client.queue_text("RAG disabled response")

    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": "rag-disabled", "message": "什么是自动化思维？"},
    )

    assert response.status_code == 200
    assert fake_embedding_provider.query_calls == []
    assert response.json()["context_used"] == []


@pytest.mark.asyncio
async def test_health_and_knowledge_search_expose_safe_rag_status(
    tmp_path,
    rag_knowledge_base,
    fake_embedding_provider,
    fastapi_client,
    monkeypatch,
):
    import backend.server as server

    service = await _initialized_service(
        tmp_path, rag_knowledge_base, fake_embedding_provider
    )
    monkeypatch.setattr(server, "rag_service", service)

    health = fastapi_client.get("/api/health")
    search = fastapi_client.get(
        "/api/knowledge/search",
        params={"q": "自动化思维", "top_k": 1},
    )

    assert health.status_code == 200
    assert health.json()["rag_enabled"] is True
    assert health.json()["rag_available"] is True
    assert health.json()["rag_documents"] == 4
    assert health.json()["rag_chunks"] == 4
    assert "api_key" not in health.text.lower()
    assert "unused.test" not in health.text
    assert search.status_code == 200
    assert search.json()["results"][0]["source"] == "automatic_thoughts.md"


def test_knowledge_search_returns_safe_unavailable_error_when_disabled(
    fastapi_client,
):
    response = fastapi_client.get(
        "/api/knowledge/search",
        params={"q": "automatic thought"},
    )

    assert response.status_code == 503
    assert response.json()["detail"]["code"] == "rag_unavailable"
