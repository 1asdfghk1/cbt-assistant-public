"""Session backup, restore, and deletion preserve user data boundaries."""

from copy import deepcopy

import pytest

from src.memory.models import MemoryCandidate
from src.memory.store import MemoryStore
from src.utils.db import SessionClearedError, SQLiteSessionManager


def test_session_backup_can_restore_all_server_records(fastapi_client, override_db):
    session_id = "backup-session"
    other_session_id = "unrelated-session"
    first_message_id = override_db.add_message(session_id, "user", "最近睡不好")
    override_db.add_message(session_id, "assistant", "可以先记录睡眠规律")
    override_db.add_mood(session_id, 4, "有点焦虑")
    override_db.add_thought_record(
        session_id, "睡前", "会失眠", "担心", 6, "灾难化", "先尝试放松",
    )
    override_db.sync_sleep_logs(session_id, [{"bed": "23:00", "wake": "07:00"}])
    override_db.sync_test_results(session_id, [{"name": "GAD-7", "score": 4}])
    override_db.sync_activities(session_id, [{"text": "散步", "done": True}])
    override_db.save_session_summary(session_id, "讨论了睡眠", first_message_id)
    MemoryStore(override_db).add_or_update(
        session_id, MemoryCandidate("goal", "改善睡眠"),
    )
    override_db.add_message(other_session_id, "user", "另一位用户的数据")

    backup_response = fastapi_client.get(f"/api/data/{session_id}")
    assert backup_response.status_code == 200
    snapshot = backup_response.json()
    assert all(snapshot["tables"][table] for table in snapshot["tables"])
    other_before = fastapi_client.get(f"/api/data/{other_session_id}").json()

    clear_response = fastapi_client.delete(f"/api/data/{session_id}")
    assert clear_response.status_code == 200
    cleared = fastapi_client.get(f"/api/data/{session_id}").json()
    assert cleared["created_at"] is None
    assert all(not rows for rows in cleared["tables"].values())
    assert fastapi_client.get(f"/api/data/{other_session_id}").json() == other_before

    restore_response = fastapi_client.put(
        f"/api/data/{session_id}", json={"snapshot": snapshot},
    )
    assert restore_response.status_code == 200
    restored = fastapi_client.get(f"/api/data/{session_id}").json()
    assert restored["created_at"] == snapshot["created_at"]
    for table, rows in snapshot["tables"].items():
        assert len(restored["tables"][table]) == len(rows)
    assert restored["tables"]["messages"][0]["content"] == "最近睡不好"
    assert restored["tables"]["conversation_memories"][0]["content"] == "改善睡眠"
    assert restored["tables"]["session_summaries"][0]["last_summarized_msg_id"] == (
        restored["tables"]["messages"][0]["id"]
    )
    assert fastapi_client.get(f"/api/data/{other_session_id}").json() == other_before


@pytest.mark.parametrize("damage", ["wrong_session", "invalid_column", "missing_memory_fields", "bad_created_at"])
def test_invalid_backup_does_not_replace_existing_data(
    fastapi_client, override_db, damage,
):
    session_id = "existing-session"
    override_db.add_message(session_id, "user", "保留这条聊天")
    MemoryStore(override_db).add_or_update(
        session_id, MemoryCandidate("goal", "保留这条记忆"),
    )
    original = fastapi_client.get(f"/api/data/{session_id}").json()
    broken = deepcopy(original)
    if damage == "wrong_session":
        broken["tables"]["messages"][0]["session_id"] = "another-session"
    elif damage == "invalid_column":
        broken["tables"]["messages"][0]["unknown_field"] = "value"
    elif damage == "missing_memory_fields":
        broken["tables"]["conversation_memories"] = [{"session_id": session_id}]
    else:
        broken["created_at"] = {"invalid": "value"}

    response = fastapi_client.put(
        f"/api/data/{session_id}", json={"snapshot": broken},
    )
    assert response.status_code == 422
    assert fastapi_client.get(f"/api/data/{session_id}").json() == original


def test_cleared_session_rejects_stale_tab_writes_until_restored(
    fastapi_client, override_db,
):
    old_session_id = "session-from-old-tab"
    new_session_id = "session-from-new-tab"
    override_db.add_message(old_session_id, "user", "需要清除的记录")
    snapshot = fastapi_client.get(f"/api/data/{old_session_id}").json()

    assert fastapi_client.delete(f"/api/data/{old_session_id}").status_code == 200
    stale_requests = [
        ("/api/sync/sleep", {"session_id": old_session_id, "items": [{"bed": "23:00"}]}),
        ("/api/sync/tests", {"session_id": old_session_id, "items": [{"name": "GAD-7"}]}),
        ("/api/sync/activities", {"session_id": old_session_id, "items": [{"text": "散步"}]}),
        ("/api/sync/sleep", {"session_id": old_session_id, "items": []}),
        ("/api/mood", {"session_id": old_session_id, "score": 5}),
        ("/api/chat", {"session_id": old_session_id, "message": "你好"}),
    ]
    for route, payload in stale_requests:
        response = fastapi_client.post(route, json=payload)
        assert response.status_code == 409, (route, response.text)
    assert fastapi_client.get(f"/api/session/{old_session_id}").status_code == 409
    with pytest.raises(SessionClearedError):
        MemoryStore(override_db).add_or_update(
            old_session_id, MemoryCandidate("goal", "旧标签页不应重建记忆"),
        )

    cleared = fastapi_client.get(f"/api/data/{old_session_id}").json()
    assert cleared["created_at"] is None
    assert all(not rows for rows in cleared["tables"].values())

    response = fastapi_client.post(
        "/api/sync/activities",
        json={"session_id": new_session_id, "items": [{"text": "新会话正常工作"}]},
    )
    assert response.status_code == 200
    new_snapshot = fastapi_client.get(f"/api/data/{new_session_id}").json()
    assert new_snapshot["created_at"] is not None
    assert new_snapshot["tables"]["activities"][0]["activity_text"] == "新会话正常工作"

    response = fastapi_client.put(
        f"/api/data/{old_session_id}", json={"snapshot": snapshot},
    )
    assert response.status_code == 200
    assert fastapi_client.post(
        "/api/sync/activities",
        json={"session_id": old_session_id, "items": [{"text": "恢复后可同步"}]},
    ).status_code == 200
    restored = fastapi_client.get(f"/api/data/{old_session_id}").json()
    assert restored["tables"]["messages"][0]["content"] == "需要清除的记录"
    assert restored["tables"]["activities"][0]["activity_text"] == "恢复后可同步"


def test_failed_restore_keeps_cleared_session_blocked(fastapi_client, override_db):
    session_id = "deleted-and-invalid-restore"
    override_db.add_message(session_id, "user", "原记录")
    snapshot = fastapi_client.get(f"/api/data/{session_id}").json()
    assert fastapi_client.delete(f"/api/data/{session_id}").status_code == 200

    snapshot["tables"]["messages"][0]["session_id"] = "wrong-session"
    response = fastapi_client.put(
        f"/api/data/{session_id}", json={"snapshot": snapshot},
    )

    assert response.status_code == 422
    assert fastapi_client.post(
        "/api/sync/sleep", json={"session_id": session_id, "items": []},
    ).status_code == 409


def test_cleared_session_marker_survives_database_reopen(tmp_path):
    db_path = tmp_path / "session-data.db"
    original = SQLiteSessionManager(db_path)
    original.add_message("old-id", "user", "删除这条记录")
    original.clear_session_data("old-id")

    reopened = SQLiteSessionManager(db_path)
    with pytest.raises(SessionClearedError):
        reopened.sync_activities("old-id", [{"text": "旧标签页重试"}])
    assert reopened.export_session_data("old-id")["tables"]["activities"] == []
