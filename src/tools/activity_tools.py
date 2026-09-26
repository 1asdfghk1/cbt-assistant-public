import json

from .context import ToolContext, ToolOutput
from .registry import ToolDefinition


async def get_user_activities(args: dict, context: ToolContext) -> ToolOutput:
    activities = context.storage.get_activities(context.session_id, limit=30)
    return ToolOutput(content=json.dumps(activities, ensure_ascii=False))


async def add_user_activity(args: dict, context: ToolContext) -> ToolOutput:
    activity_text = args["activity_text"]
    return ToolOutput(
        content=f"Successfully added activity: {activity_text}",
        client_events=({"type": "add_activity", "text": activity_text},),
    )


ACTIVITY_TOOLS = (
    ToolDefinition(
        name="get_user_activities",
        description=(
            "Получить данные о планировании активности пользователя "
            "(что сделано, а что нет)."
        ),
        parameters={"type": "object", "properties": {}},
        handler=get_user_activities,
    ),
    ToolDefinition(
        name="add_user_activity",
        description=(
            "Добавить новую активность или задачу в планировщик пользователя "
            "(например, после рекомендации)."
        ),
        parameters={
            "type": "object",
            "properties": {
                "activity_text": {
                    "type": "string",
                    "description": (
                        "Текст активности, которую нужно добавить. Максимум 50 символов."
                    ),
                }
            },
            "required": ["activity_text"],
        },
        handler=add_user_activity,
    ),
)
