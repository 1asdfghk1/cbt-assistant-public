import pytest

from src.tools import tool_registry


def test_add_activity_chat_event_can_be_persisted_by_existing_sync_contract(
    fastapi_client,
    fake_llm_client,
    override_db,
    test_session_id,
):
    fake_llm_client.queue_tool_call(
        "add_user_activity",
        '{"activity_text": "晚上散步20分钟"}',
    ).queue_text("activity added")

    response = fastapi_client.post(
        "/api/chat",
        json={
            "session_id": test_session_id,
            "message": "帮我添加一个活动：晚上散步20分钟。",
        },
    )

    assert response.status_code == 200
    event = response.json()["client_events"][0]
    assert event == {"type": "add_activity", "text": "晚上散步20分钟"}

    # The current product contract persists this client event via /api/sync/activities.
    sync_response = fastapi_client.post(
        "/api/sync/activities",
        json={
            "session_id": test_session_id,
            "items": [
                {
                    "text": event["text"],
                    "done": False,
                    "isoDate": "2026-08-23T18:00:00Z",
                }
            ],
        },
    )

    assert sync_response.status_code == 200
    assert override_db.get_activities(test_session_id)[0]["activity_text"] == "晚上散步20分钟"


@pytest.mark.asyncio
async def test_add_activity_argument_validation_matches_current_schema(mock_tool_context):
    missing = await tool_registry.execute("add_user_activity", {}, mock_tool_context)
    wrong_type = await tool_registry.execute(
        "add_user_activity",
        {"activity_text": 123},
        mock_tool_context,
    )
    empty = await tool_registry.execute(
        "add_user_activity",
        {"activity_text": ""},
        mock_tool_context,
    )

    assert missing.ok is False
    assert missing.error.type == "invalid_arguments"
    assert wrong_type.ok is False
    assert wrong_type.error.type == "invalid_arguments"
    assert empty.ok is True
    assert empty.client_events == ({"type": "add_activity", "text": ""},)
