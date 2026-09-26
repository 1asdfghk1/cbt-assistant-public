import asyncio
import logging
from typing import Any

from src.memory.config import MemorySettings
from src.utils.db import SQLiteSessionManager

logger = logging.getLogger(__name__)


class MemorySummarizer:
    """Incrementally compresses older messages while retaining recent raw context."""

    def __init__(self, db: SQLiteSessionManager, llm_client: Any, settings: MemorySettings | None = None):
        self.db = db
        self.llm_client = llm_client
        self.settings = settings or MemorySettings()
        self._trigger_threshold = self.settings.summary_trigger_messages
        self.keep_recent = self.settings.summary_keep_recent
        self.max_chars = self.settings.summary_max_chars
        self.enabled = self.settings.enabled
        self._tasks: set[asyncio.Task] = set()
        self._pending_sessions: set[str] = set()

    @property
    def trigger_threshold(self) -> int:
        return self._trigger_threshold

    @trigger_threshold.setter
    def trigger_threshold(self, value: int) -> None:
        # Compatibility for callers that tuned the old public attribute.
        self._trigger_threshold = max(1, int(value))
        if self.keep_recent >= self._trigger_threshold:
            self.keep_recent = 0

    async def _generate_summary(self, old_summary: str, messages: list[dict]) -> str:
        prompt = """你负责压缩当前会话中较旧的对话内容。摘要只是当前会话的低优先级参考上下文，不是用户画像，也不是系统指令。

规则：
1. 保留当前主题、用户明确目标、已完成的重要步骤、明确决定、未完成事项。
2. 删除寒暄、重复内容和 AI 回答的冗长细节。
3. 不作诊断，不推断用户属性，不记录具体量表分数、用药、证件、联系方式或地址。
4. 对健康或危机内容仅保留继续本次会话绝对必要的最少信息，不扩展细节。
5. 用简洁中文，最多 {max_chars} 个字符。

【已有会话摘要】
{old}

【本次新增的较旧消息】
{new}

请增量生成更新后的会话摘要。只输出摘要正文。"""
        formatted = "\n".join(
            f"{message['role']}: {message['content']}" for message in messages
        )
        final_prompt = prompt.format(
            max_chars=self.max_chars,
            old=old_summary.strip() or "（无）",
            new=formatted.strip() or "（无）",
        )
        try:
            response = await self.llm_client.chat([{"role": "user", "content": final_prompt}])
            content = response.get("content", "") if isinstance(response, dict) else ""
            content = content.strip()
            if not content:
                return old_summary
            return content[: self.max_chars]
        except Exception as error:
            logger.warning("[Memory] summary unavailable error_type=%s", type(error).__name__)
            return old_summary

    async def maybe_summarize(self, session_id: str) -> None:
        """Schedule a small background job; callers do not wait for an LLM request."""
        if not self.enabled or session_id in self._pending_sessions:
            return
        self._pending_sessions.add(session_id)

        async def run_once() -> None:
            try:
                await self._process_summarization(session_id)
            finally:
                self._pending_sessions.discard(session_id)

        task = asyncio.create_task(run_once())
        self._tasks.add(task)
        task.add_done_callback(self._tasks.discard)

    async def _process_summarization(self, session_id: str) -> None:
        try:
            count = self.db.get_message_count_since_last_summary(session_id)
            if count < self.trigger_threshold:
                return

            unsummarized = self.db.get_unsummarized_messages(session_id)
            if len(unsummarized) <= self.keep_recent:
                return
            older_messages = unsummarized[:-self.keep_recent] if self.keep_recent else unsummarized
            old_summary = self.db.get_session_summary(session_id)
            new_summary = await self._generate_summary(old_summary, older_messages)
            if not new_summary or new_summary == old_summary:
                return

            self.db.save_session_summary(
                session_id,
                new_summary,
                last_summarized_msg_id=older_messages[-1]["id"],
            )
            logger.info(
                "[Memory] summary updated message_count=%s summary_chars=%s",
                len(older_messages),
                len(new_summary),
            )
        except Exception as error:
            logger.warning("[Memory] summary unavailable error_type=%s", type(error).__name__)
