import json

import pytest

from src.tools import ToolContext, ToolDefinition, ToolOutput, ToolRegistry, tool_registry


def _sleep_payload(content):
    return json.loads(content.split("\n\n", 1)[1])


@pytest.mark.asyncio
async def test_tool_context_fields_and_defaults_are_passed_to_handler(storage):
    received = {}

    async def capture_context(arguments, context):
        received.update(
            session_id=context.session_id,
            language=context.language,
            storage=context.storage,
            arguments=arguments,
        )
        return ToolOutput(content="captured")

    registry = ToolRegistry(
        [
            ToolDefinition(
                name="capture_context",
                description="Capture context for a test.",
                parameters={"type": "object", "properties": {}},
                handler=capture_context,
            )
        ]
    )
    context = ToolContext(session_id="context-session", language="ru", storage=storage)

    result = await registry.execute("capture_context", {}, context)

    assert result.ok is True
    assert received == {
        "session_id": "context-session",
        "language": "ru",
        "storage": storage,
        "arguments": {},
    }
    assert context.request_id == "untracked"
    assert context.model == "unknown"


@pytest.mark.asyncio
async def test_assessment_tool_reads_scores_and_keeps_sessions_isolated(
    storage,
    mock_tool_context,
    sample_test_results,
):
    storage.sync_test_results(mock_tool_context.session_id, sample_test_results)
    storage.sync_test_results(
        "session-B",
        [{"name": "GAD-7", "score": 99, "level": "other", "date": "2026-08-23"}],
    )

    result = await tool_registry.execute("get_user_test_results", {}, mock_tool_context)
    payload = json.loads(result.content)

    assert result.ok is True
    assert [(item["test_name"], item["score"]) for item in payload] == [
        ("GAD-7", 12),
        ("PHQ-9", 6),
    ]
    assert all(item["score"] != 99 for item in payload)


@pytest.mark.asyncio
async def test_sleep_tool_returns_current_session_in_descending_date_order(
    storage,
    mock_tool_context,
    sample_sleep_records,
):
    storage.sync_sleep_logs(mock_tool_context.session_id, sample_sleep_records)
    storage.sync_sleep_logs(
        "session-B",
        [
            {
                "bed": "12:00",
                "wake": "13:00",
                "awk": 0,
                "qual": 1,
                "notes": "must stay isolated",
                "durHrs": 1,
                "isoDate": "2099-01-01",
            }
        ],
    )

    result = await tool_registry.execute(
        "get_user_sleep_history",
        {"days": 2},
        mock_tool_context,
    )
    payload = _sleep_payload(result.content)

    assert [item["iso_date"] for item in payload] == [
        "2026-08-22T23:30:00Z",
        "2026-08-21T00:00:00Z",
    ]
    assert all(item["notes"] != "must stay isolated" for item in payload)


@pytest.mark.asyncio
async def test_sleep_tool_returns_empty_list_when_session_has_no_records(mock_tool_context):
    result = await tool_registry.execute("get_user_sleep_history", {}, mock_tool_context)

    assert result.ok is True
    assert _sleep_payload(result.content) == []


@pytest.mark.asyncio
async def test_activity_tool_reads_only_current_session(
    storage,
    mock_tool_context,
    sample_activities,
):
    storage.sync_activities(mock_tool_context.session_id, sample_activities)
    storage.sync_activities(
        "session-B",
        [{"text": "private activity B", "done": True, "isoDate": "2026-08-23"}],
    )

    result = await tool_registry.execute("get_user_activities", {}, mock_tool_context)
    payload = json.loads(result.content)

    assert [item["activity_text"] for item in payload] == ["walk 20 minutes"]
    assert "private activity B" not in result.content


@pytest.mark.asyncio
async def test_ui_action_tools_preserve_frontend_contract(mock_tool_context):
    breathing = await tool_registry.execute("start_breathing", {}, mock_tool_context)
    assessment = await tool_registry.execute(
        "recommend_test",
        {"test_type": "GAD-7"},
        mock_tool_context,
    )

    assert breathing.ok is True
    assert breathing.client_events == ({"type": "start_breathing"},)
    assert assessment.ok is True
    assert assessment.client_events == ({"type": "open_test", "test_type": "GAD-7"},)
