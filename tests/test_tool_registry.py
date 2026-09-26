import json

import pytest

from src.tools import (
    ToolContext,
    ToolDefinition,
    ToolOutput,
    ToolRegistry,
    select_forced_tool,
    tool_registry,
)


class FakeStorage:
    def __init__(self):
        self.sleep_logs = [{"quality": 7, "iso_date": "2026-08-20"}]
        self.tests = [{"name": "GAD-7", "score": 6}]
        self.activities = [{"activity_text": "散步", "done": 0}]
        self.last_sleep_query = None

    def get_sleep_logs(self, session_id, limit=14):
        self.last_sleep_query = (session_id, limit)
        return self.sleep_logs

    def get_tests(self, session_id):
        return self.tests

    def get_activities(self, session_id, limit=30):
        return self.activities


@pytest.fixture
def tool_context():
    return ToolContext(
        session_id="registry-test",
        language="zh",
        storage=FakeStorage(),
        request_id="request-test",
        model="deepseek-chat",
    )


def test_registered_tools_can_be_found():
    assert set(tool_registry.registered_names) == {
        "get_user_sleep_history",
        "get_user_test_results",
        "get_user_activities",
        "add_user_activity",
        "start_breathing",
        "recommend_test",
    }
    assert tool_registry.has_tool("get_user_test_results")
    for name in tool_registry.registered_names:
        definition = tool_registry.get_definition(name)
        assert definition is not None
        assert callable(definition.handler)


def test_unknown_tool_definition_is_not_exposed():
    assert tool_registry.get_definition("unknown_tool_xyz") is None


def test_get_schemas_returns_linked_tool_schemas():
    schemas = tool_registry.get_schemas()
    by_name = {schema["function"]["name"]: schema for schema in schemas}

    assert len(schemas) == 6
    assert all(schema["function"]["description"] for schema in schemas)
    assert all(schema["function"]["parameters"]["type"] == "object" for schema in schemas)
    assert by_name["get_user_sleep_history"]["function"]["parameters"][
        "properties"
    ]["days"]["maximum"] == 30
    assert by_name["recommend_test"]["function"]["parameters"]["required"] == [
        "test_type"
    ]


@pytest.mark.asyncio
async def test_unknown_tool_returns_structured_error(tool_context):
    result = await tool_registry.execute("unknown_tool", "{}", tool_context)

    assert result.ok is False
    assert result.error.type == "unknown_tool"
    assert json.loads(result.content)["error"]["type"] == "unknown_tool"


@pytest.mark.asyncio
async def test_invalid_json_returns_structured_error(tool_context):
    result = await tool_registry.execute(
        "get_user_sleep_history",
        '{"days":',
        tool_context,
    )

    assert result.ok is False
    assert result.error.type == "invalid_arguments"


@pytest.mark.asyncio
async def test_missing_and_wrong_type_arguments_are_rejected(tool_context):
    missing = await tool_registry.execute("add_user_activity", "{}", tool_context)
    wrong_type = await tool_registry.execute(
        "get_user_sleep_history",
        '{"days": "7"}',
        tool_context,
    )

    assert missing.error.type == "invalid_arguments"
    assert wrong_type.error.type == "invalid_arguments"


@pytest.mark.asyncio
async def test_handler_exception_is_captured(tool_context):
    async def failing_handler(args, context):
        raise RuntimeError("private database path must not escape")

    registry = ToolRegistry(
        [
            ToolDefinition(
                name="failing_tool",
                description="Fails for testing.",
                parameters={"type": "object", "properties": {}},
                handler=failing_handler,
            )
        ]
    )

    result = await registry.execute("failing_tool", {}, tool_context)

    assert result.ok is False
    assert result.error.type == "tool_execution_error"
    assert "private database" not in result.content


@pytest.mark.asyncio
async def test_get_user_test_results_returns_storage_data(tool_context):
    result = await tool_registry.execute("get_user_test_results", "{}", tool_context)

    assert result.ok is True
    assert json.loads(result.content) == tool_context.storage.tests


@pytest.mark.asyncio
async def test_get_user_sleep_history_returns_storage_data(tool_context):
    result = await tool_registry.execute(
        "get_user_sleep_history",
        '{"days": 7}',
        tool_context,
    )

    assert result.ok is True
    assert tool_context.storage.last_sleep_query == ("registry-test", 7)
    assert json.loads(result.content.split("\n\n", 1)[1]) == tool_context.storage.sleep_logs


@pytest.mark.asyncio
async def test_get_user_activities_returns_storage_data(tool_context):
    result = await tool_registry.execute("get_user_activities", {}, tool_context)

    assert result.ok is True
    assert json.loads(result.content) == tool_context.storage.activities


@pytest.mark.asyncio
async def test_add_user_activity_returns_existing_client_event(tool_context):
    result = await tool_registry.execute(
        "add_user_activity",
        {"activity_text": "晚上散步 20 分钟"},
        tool_context,
    )

    assert result.ok is True
    assert result.client_events == (
        {"type": "add_activity", "text": "晚上散步 20 分钟"},
    )


@pytest.mark.asyncio
async def test_ui_tools_return_existing_client_events(tool_context):
    breathing = await tool_registry.execute("start_breathing", {}, tool_context)
    test = await tool_registry.execute(
        "recommend_test",
        {"test_type": "GAD-7"},
        tool_context,
    )

    assert breathing.client_events == ({"type": "start_breathing"},)
    assert test.client_events == ({"type": "open_test", "test_type": "GAD-7"},)


@pytest.mark.parametrize(
    ("message", "expected"),
    [
        ("看看我最近的睡眠", "get_user_sleep_history"),
        ("我最近睡了多久？", "get_user_sleep_history"),
        ("我最近的 GAD-7 是多少？", "get_user_test_results"),
        ("什么是 GAD-7？", None),
        ("看看我最近记录了哪些活动", "get_user_activities"),
        ("帮我添加一个活动：晚上散步 20 分钟", None),
        ("我最近很焦虑，我应该做什么心理测试？", None),
        ("今天心情不太好", None),
    ],
)
def test_forced_tool_routing_is_preserved(message, expected):
    assert select_forced_tool(message) == expected
