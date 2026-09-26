import pytest

from src.memory.models import MemoryCandidate
from src.memory.store import MemoryStore
from src.utils.db import SQLiteSessionManager


@pytest.fixture
def memory_store(tmp_path):
    return MemoryStore(SQLiteSessionManager(tmp_path / "memory-store.db"))


def test_schema_and_basic_memory_types(memory_store):
    goal = memory_store.add_or_update("session-a", MemoryCandidate("goal", "稳定作息"))
    preference = memory_store.add_or_update(
        "session-a", MemoryCandidate("preference", "回答尽量简短")
    )

    assert goal.action == "stored"
    assert preference.action == "stored"
    assert {item.type for item in memory_store.list_active("session-a")} == {
        "goal",
        "preference",
    }
    with memory_store.db._get_conn() as conn:
        assert conn.execute(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='conversation_memories'"
        ).fetchone()


def test_duplicate_updates_timestamp_instead_of_creating_a_row(memory_store):
    first = memory_store.add_or_update("dedup", MemoryCandidate("goal", "改善睡眠"))
    second = memory_store.add_or_update("dedup", MemoryCandidate("goal", "改善我的睡眠"))

    assert second.action == "deduplicated"
    assert second.item.id == first.item.id
    assert len(memory_store.list_active("dedup")) == 1


def test_new_current_goal_supersedes_old_goal(memory_store):
    old = memory_store.add_or_update(
        "supersede", MemoryCandidate("goal", "先稳定作息", supersedes=True)
    )
    new = memory_store.add_or_update(
        "supersede", MemoryCandidate("goal", "把运动作为主要目标", supersedes=True)
    )

    active = memory_store.list_active("supersede", "goal")
    assert [item.id for item in active] == [new.item.id]
    assert old.item.id != new.item.id


def test_update_delete_and_clear(memory_store):
    first = memory_store.add_or_update("manage", MemoryCandidate("decision", "先练习呼吸"))
    second = memory_store.add_or_update("manage", MemoryCandidate("plan", "明天复盘"))

    updated = memory_store.update("manage", first.item.id, "先做呼吸练习")
    assert updated.content == "先做呼吸练习"
    assert memory_store.delete("manage", first.item.id) is True
    assert memory_store.delete("manage", first.item.id) is False
    assert memory_store.clear_session("manage") == 1
    assert memory_store.list_active("manage") == []
    assert second.item.id > 0


def test_inactive_memory_is_not_returned(memory_store):
    item = memory_store.add_or_update("inactive", MemoryCandidate("goal", "稳定作息")).item

    assert memory_store.deactivate("inactive", item.id) is True
    assert memory_store.list_active("inactive") == []


def test_session_isolation(memory_store):
    memory_store.add_or_update("session-a", MemoryCandidate("goal", "稳定作息"))

    assert len(memory_store.list_active("session-a")) == 1
    assert memory_store.list_active("session-b") == []
    assert memory_store.clear_session("session-b") == 0
