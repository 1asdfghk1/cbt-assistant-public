from unittest.mock import AsyncMock

import pytest

from src.memory.config import MemorySettings
from src.memory.service import MemoryService
from src.memory.summarizer import MemorySummarizer
from src.utils.db import SQLiteSessionManager


def _settings(**changes):
    values = {
        "enabled": True,
        "recent_messages": 4,
        "summary_trigger_messages": 6,
        "summary_keep_recent": 2,
        "summary_max_chars": 20,
        "max_retrieved": 4,
        "extraction_enabled": True,
    }
    values.update(changes)
    return MemorySettings(**values)


@pytest.mark.asyncio
async def test_summary_triggers_only_at_threshold_and_keeps_recent_messages(tmp_path):
    db = SQLiteSessionManager(tmp_path / "summary.db")
    llm = AsyncMock()
    llm.chat.return_value = {"content": "更新后的会话摘要"}
    summarizer = MemorySummarizer(db, llm, _settings())
    for index in range(5):
        db.add_message("s", "user", f"message-{index}")

    await summarizer._process_summarization("s")
    assert llm.chat.await_count == 0

    db.add_message("s", "assistant", "message-5")
    await summarizer._process_summarization("s")

    assert llm.chat.await_count == 1
    assert db.get_session_summary("s") == "更新后的会话摘要"
    assert [item["content"] for item in db.get_recent_history_after_summary("s", 10)] == [
        "message-4",
        "message-5",
    ]
    assert db.get_message_count_since_last_summary("s") == 2


@pytest.mark.asyncio
async def test_summary_is_incremental_and_bounded(tmp_path):
    db = SQLiteSessionManager(tmp_path / "incremental.db")
    llm = AsyncMock()
    llm.chat.return_value = {"content": "新" * 100}
    summarizer = MemorySummarizer(db, llm, _settings(summary_max_chars=12))
    db.save_session_summary("s", "已有摘要")
    for index in range(6):
        db.add_message("s", "user", f"new-{index}")

    await summarizer._process_summarization("s")

    prompt = llm.chat.await_args.args[0][0]["content"]
    assert "已有摘要" in prompt
    assert "new-0" in prompt
    assert "new-5" not in prompt
    assert len(db.get_session_summary("s")) == 12


@pytest.mark.asyncio
async def test_summary_failure_preserves_chat_context_and_other_session(tmp_path):
    db = SQLiteSessionManager(tmp_path / "summary-failure.db")
    llm = AsyncMock()
    llm.chat.side_effect = RuntimeError("fake summary failure")
    summarizer = MemorySummarizer(db, llm, _settings())
    db.save_session_summary("session-a", "A summary")
    db.save_session_summary("session-b", "B summary")
    for index in range(6):
        db.add_message("session-a", "user", f"a-{index}")

    await summarizer._process_summarization("session-a")

    assert db.get_session_summary("session-a") == "A summary"
    assert db.get_session_summary("session-b") == "B summary"
    assert len(db.get_recent_history_after_summary("session-a", 10)) == 6


def test_context_does_not_reinject_summarized_raw_messages(tmp_path):
    db = SQLiteSessionManager(tmp_path / "context.db")
    for index in range(6):
        db.add_message("s", "user", f"old-{index}")
    db.save_session_summary("s", "旧消息已压缩", last_summarized_msg_id=4)
    service = MemoryService(db, AsyncMock(), _settings())

    context = service.build_context("s", "继续")

    assert [item["content"] for item in context.recent_messages] == ["old-4", "old-5"]
    assert "old-0" not in context.reference_message
    assert "旧消息已压缩" in context.reference_message


def test_disabled_memory_keeps_recent_chat_but_omits_summary_and_long_term(tmp_path):
    db = SQLiteSessionManager(tmp_path / "disabled.db")
    db.add_message("s", "user", "recent")
    db.save_session_summary("s", "hidden", last_summarized_msg_id=0)
    service = MemoryService(db, AsyncMock(), _settings(enabled=False))

    context = service.build_context("s", "目标是什么")

    assert [item["content"] for item in context.recent_messages] == ["recent"]
    assert context.summary == ""
    assert context.relevant_memories == []
    assert context.reference_message == ""
