from .context import ToolContext, ToolOutput
from .registry import ToolDefinition


async def start_breathing(args: dict, context: ToolContext) -> ToolOutput:
    return ToolOutput(
        content="Successfully triggered the breathing exercise.",
        client_events=({"type": "start_breathing"},),
    )


async def recommend_test(args: dict, context: ToolContext) -> ToolOutput:
    test_type = args["test_type"]
    return ToolOutput(
        content=f"Successfully recommended the {test_type} test.",
        client_events=({"type": "open_test", "test_type": test_type},),
    )


UI_TOOLS = (
    ToolDefinition(
        name="start_breathing",
        description=(
            "Запустить дыхательную разминку/упражнение на клиенте, если "
            "пользователь жалуется на панику, тревогу или сильный стресс."
        ),
        parameters={"type": "object", "properties": {}},
        handler=start_breathing,
    ),
    ToolDefinition(
        name="recommend_test",
        description=(
            "Порекомендовать и открыть диалог прохождения психологического теста "
            "(PHQ-9 при признаках депрессии или GAD-7 при симптомах тревоги)."
        ),
        parameters={
            "type": "object",
            "properties": {
                "test_type": {
                    "type": "string",
                    "enum": ["PHQ-9", "GAD-7"],
                    "description": "Тип теста для прохождения.",
                }
            },
            "required": ["test_type"],
        },
        handler=recommend_test,
    ),
)
