from src.memory.models import MemoryCandidate
from src.memory.retriever import MemoryRetriever
from src.memory.store import MemoryStore
from src.utils.db import SQLiteSessionManager


def _memories(tmp_path):
    store = MemoryStore(SQLiteSessionManager(tmp_path / "retrieval.db"))
    store.add_or_update("s", MemoryCandidate("goal", "先把作息规律稳定下来"))
    store.add_or_update("s", MemoryCandidate("preference", "回答时尽量简短一点"))
    store.add_or_update("s", MemoryCandidate("ongoing_topic", "学习呼吸练习"))
    return store, store.list_active("s")


def test_goal_query_prioritizes_matching_goal(tmp_path):
    _, memories = _memories(tmp_path)
    result = MemoryRetriever().retrieve("我们之前关于作息有什么计划？", memories)

    assert result[0].type == "goal"
    assert "作息" in result[0].content


def test_reply_style_query_prioritizes_preference(tmp_path):
    _, memories = _memories(tmp_path)
    result = MemoryRetriever().retrieve("以后回复方式呢？", memories)

    assert result[0].type == "preference"


def test_unrelated_knowledge_query_returns_no_memory(tmp_path):
    _, memories = _memories(tmp_path)

    assert MemoryRetriever().retrieve("什么是灾难化？", memories) == []


def test_inactive_memory_cannot_be_retrieved(tmp_path):
    store, memories = _memories(tmp_path)
    goal = next(item for item in memories if item.type == "goal")
    store.deactivate("s", goal.id)

    result = MemoryRetriever().retrieve("我们之前的作息目标是什么？", store.list_active("s"))
    assert all(item.id != goal.id for item in result)
