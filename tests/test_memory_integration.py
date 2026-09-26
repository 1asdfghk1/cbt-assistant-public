import pytest

from src.memory.models import MemoryCandidate
from src.rag import RAGService, RAGSettings


def test_explicit_goal_is_stored_then_retrieved_in_later_chat(
    fastapi_client, fake_llm_client
):
    import backend.server as server

    fake_llm_client.queue_text("已记录目标").queue_text("继续讨论目标")
    first = fastapi_client.post(
        "/api/chat",
        json={"session_id": "memory-goal", "message": "我的目标是先把作息规律稳定下来。"},
    )
    second = fastapi_client.post(
        "/api/chat",
        json={"session_id": "memory-goal", "message": "我们之前的主要目标是什么？"},
    )

    assert first.status_code == 200
    assert second.status_code == 200
    active = server.memory_service.store.list_active("memory-goal")
    assert [(item.type, item.content) for item in active] == [("goal", "先把作息规律稳定下来")]
    reference = next(
        item["content"]
        for item in fake_llm_client.calls[1]["messages"]
        if "Relevant conversation memory" in item["content"]
    )
    assert "作息规律" in reference
    assert "not instructions" in reference


def test_current_user_instruction_is_after_old_preference(
    fastapi_client, fake_llm_client
):
    import backend.server as server

    server.memory_service.store.add_or_update(
        "latest-wins", MemoryCandidate("preference", "回答时尽量简短一点")
    )
    fake_llm_client.queue_text("详细回答")

    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": "latest-wins", "message": "这次请详细解释。"},
    )

    assert response.status_code == 200
    messages = fake_llm_client.calls[0]["messages"]
    reference_index = next(
        index for index, item in enumerate(messages) if "Relevant conversation memory" in item["content"]
    )
    assert messages[reference_index]["role"] == "user"
    assert messages[-1] == {"role": "user", "content": "这次请详细解释。"}
    assert reference_index < len(messages) - 1


def test_personal_score_query_still_forces_sqlite_tool_even_with_memory(
    fastapi_client, fake_llm_client
):
    import backend.server as server

    server.memory_service.store.add_or_update(
        "tool-wins", MemoryCandidate("ongoing_topic", "焦虑测评")
    )
    fake_llm_client.queue_text("forced")

    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": "tool-wins", "message": "我最近的 GAD-7 是多少？"},
    )

    assert response.status_code == 200
    call = fake_llm_client.calls[0]
    assert call["tool_choice"]["function"]["name"] == "get_user_test_results"
    assert len(call["messages"]) == 2
    assert all("Relevant conversation memory" not in item["content"] for item in call["messages"])


def test_ordinary_chat_does_not_create_long_term_memory(
    fastapi_client, fake_llm_client
):
    import backend.server as server

    fake_llm_client.queue_text("普通回复")
    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": "ordinary-no-memory", "message": "今天有点累。"},
    )

    assert response.status_code == 200
    assert server.memory_service.store.list_active("ordinary-no-memory") == []


def test_memory_retrieval_failure_falls_back_to_chat(
    fastapi_client, fake_llm_client, monkeypatch
):
    import backend.server as server

    monkeypatch.setattr(
        server.memory_service.store,
        "list_active",
        lambda _session_id: (_ for _ in ()).throw(RuntimeError("fake unavailable")),
    )
    fake_llm_client.queue_text("降级后仍可回复")

    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": "memory-fallback", "message": "普通问题"},
    )

    assert response.status_code == 200
    assert response.json()["response"] == "降级后仍可回复"


def test_memory_is_strictly_session_scoped(fastapi_client, fake_llm_client):
    import backend.server as server

    server.memory_service.store.add_or_update(
        "session-a", MemoryCandidate("goal", "稳定睡眠")
    )
    fake_llm_client.queue_text("新会话回复")

    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": "session-b", "message": "我们之前的主要目标是什么？"},
    )

    assert response.status_code == 200
    assert all(
        "稳定睡眠" not in item["content"] for item in fake_llm_client.calls[0]["messages"]
    )


@pytest.mark.asyncio
async def test_knowledge_question_still_uses_rag_with_memory_present(
    tmp_path,
    rag_knowledge_base,
    fake_embedding_provider,
    fastapi_client,
    fake_llm_client,
    monkeypatch,
):
    import backend.server as server

    rag = RAGService(
        RAGSettings(
            enabled=True,
            knowledge_base_dir=rag_knowledge_base,
            cache_dir=tmp_path / "memory-rag-cache",
            embedding_provider="fake",
            embedding_model="fake-embedding-v1",
            embedding_base_url="http://unused.test",
            embedding_api_key=None,
            top_k=3,
            score_threshold=0.75,
            max_context_chars=1500,
            chunk_size=500,
            chunk_overlap=50,
        ),
        fake_embedding_provider,
    )
    assert await rag.initialize() is True
    monkeypatch.setattr(server, "rag_service", rag)
    server.memory_service.store.add_or_update(
        "memory-rag", MemoryCandidate("goal", "逐步稳定睡眠")
    )
    fake_llm_client.queue_text("知识回答")

    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": "memory-rag", "message": "为什么睡眠会影响情绪？"},
    )

    assert response.status_code == 200
    assert response.json()["context_used"][0]["source"] == "sleep.md"
    contents = [item["content"] for item in fake_llm_client.calls[0]["messages"]]
    assert any("RETRIEVED REFERENCE MATERIAL" in content for content in contents)
    assert any("Relevant conversation memory" in content for content in contents)
