import json

from .context import ToolContext, ToolOutput
from .registry import ToolDefinition


async def get_user_test_results(args: dict, context: ToolContext) -> ToolOutput:
    return ToolOutput(
        content=json.dumps(
            context.storage.get_tests(context.session_id),
            ensure_ascii=False,
        )
    )


TEST_TOOLS = (
    ToolDefinition(
        name="get_user_test_results",
        description=(
            "Получить последние результаты психологических тестов "
            "(PHQ-9 депрессия, GAD-7 тревога)."
        ),
        parameters={"type": "object", "properties": {}},
        handler=get_user_test_results,
    ),
)
