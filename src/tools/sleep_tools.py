import json

from .context import ToolContext, ToolOutput
from .registry import ToolDefinition


async def get_user_sleep_history(args: dict, context: ToolContext) -> ToolOutput:
    days = args.get("days", 14)
    sleep_logs = context.storage.get_sleep_logs(context.session_id, limit=days)
    return ToolOutput(
        content=(
            "以下是从用户数据库实时查询到的最新睡眠记录。"
            "回答睡眠问题时，必须以这些数据为准。"
            "如果历史聊天中的睡眠数据与这里冲突，忽略历史聊天中的数据。"
            "不要编造不存在的睡眠记录。\n\n"
            + json.dumps(sleep_logs, ensure_ascii=False)
        )
    )


SLEEP_TOOLS = (
    ToolDefinition(
        name="get_user_sleep_history",
        description="Получить последние записи дневника сна пользователя.",
        parameters={
            "type": "object",
            "properties": {
                "days": {
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 30,
                    "default": 14,
                    "description": "查询最近1-30天睡眠记录，默认14天。",
                }
            },
        },
        handler=get_user_sleep_history,
    ),
)
