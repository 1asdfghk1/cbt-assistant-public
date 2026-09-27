import re
import unicodedata
from datetime import datetime
from difflib import SequenceMatcher

from src.memory.models import MemoryCandidate, MemoryItem, MemoryWriteResult
from src.utils.db import SQLiteSessionManager


def normalize_memory_text(text: str) -> str:
    normalized = unicodedata.normalize("NFKC", text).casefold()
    return re.sub(r"[^\w\u4e00-\u9fffЀ-ӿ]+", "", normalized)


class MemoryStore:
    def __init__(self, db: SQLiteSessionManager):
        self.db = db

    def add_or_update(self, session_id: str, candidate: MemoryCandidate) -> MemoryWriteResult:
        now = datetime.now().isoformat()
        normalized = normalize_memory_text(candidate.content)
        with self.db._get_writable_conn(session_id) as conn:
            conn.execute(
                "INSERT OR IGNORE INTO sessions (id, created_at) VALUES (?, ?)",
                (session_id, now),
            )
            rows = conn.execute(
                """
                SELECT * FROM conversation_memories
                WHERE session_id = ? AND memory_type = ? AND active = 1
                ORDER BY updated_at DESC
                """,
                (session_id, candidate.type),
            ).fetchall()

            for row in rows:
                existing = row["normalized_content"]
                similarity = SequenceMatcher(None, existing, normalized).ratio()
                is_near_duplicate = (
                    existing == normalized
                    or (min(len(existing), len(normalized)) >= 4 and similarity >= 0.78)
                )
                if is_near_duplicate:
                    conn.execute(
                        """
                        UPDATE conversation_memories
                        SET content = ?, normalized_content = ?, updated_at = ?
                        WHERE id = ?
                        """,
                        (candidate.content, normalized, now, row["id"]),
                    )
                    updated = conn.execute(
                        "SELECT * FROM conversation_memories WHERE id = ?", (row["id"],)
                    ).fetchone()
                    conn.commit()
                    return MemoryWriteResult(MemoryItem.from_row(updated), "deduplicated")

            if candidate.supersedes:
                conn.execute(
                    """
                    UPDATE conversation_memories
                    SET active = 0, updated_at = ?
                    WHERE session_id = ? AND memory_type = ? AND active = 1
                    """,
                    (now, session_id, candidate.type),
                )

            cursor = conn.execute(
                """
                INSERT INTO conversation_memories (
                    session_id, memory_type, content, normalized_content,
                    source, explicitness, active, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)
                """,
                (
                    session_id,
                    candidate.type,
                    candidate.content,
                    normalized,
                    candidate.source,
                    candidate.explicitness,
                    now,
                    now,
                ),
            )
            row = conn.execute(
                "SELECT * FROM conversation_memories WHERE id = ?", (cursor.lastrowid,)
            ).fetchone()
            conn.commit()
            return MemoryWriteResult(MemoryItem.from_row(row), "stored")

    def list_active(self, session_id: str, memory_type: str | None = None) -> list[MemoryItem]:
        query = "SELECT * FROM conversation_memories WHERE session_id = ? AND active = 1"
        params: list[object] = [session_id]
        if memory_type:
            query += " AND memory_type = ?"
            params.append(memory_type)
        query += " ORDER BY updated_at DESC, id DESC"
        with self.db._get_conn() as conn:
            return [MemoryItem.from_row(row) for row in conn.execute(query, params).fetchall()]

    def update(self, session_id: str, memory_id: int, content: str) -> MemoryItem | None:
        normalized = normalize_memory_text(content)
        if not normalized:
            return None
        now = datetime.now().isoformat()
        with self.db._get_writable_conn(session_id) as conn:
            cursor = conn.execute(
                """
                UPDATE conversation_memories
                SET content = ?, normalized_content = ?, updated_at = ?
                WHERE id = ? AND session_id = ?
                """,
                (content.strip(), normalized, now, memory_id, session_id),
            )
            if cursor.rowcount == 0:
                return None
            row = conn.execute(
                "SELECT * FROM conversation_memories WHERE id = ?", (memory_id,)
            ).fetchone()
            conn.commit()
            return MemoryItem.from_row(row)

    def delete(self, session_id: str, memory_id: int) -> bool:
        with self.db._get_writable_conn(session_id) as conn:
            cursor = conn.execute(
                "DELETE FROM conversation_memories WHERE id = ? AND session_id = ?",
                (memory_id, session_id),
            )
            conn.commit()
            return cursor.rowcount > 0

    def clear_session(self, session_id: str) -> int:
        with self.db._get_writable_conn(session_id) as conn:
            cursor = conn.execute(
                "DELETE FROM conversation_memories WHERE session_id = ?", (session_id,)
            )
            conn.commit()
            return cursor.rowcount

    def deactivate(self, session_id: str, memory_id: int) -> bool:
        with self.db._get_writable_conn(session_id) as conn:
            cursor = conn.execute(
                "UPDATE conversation_memories SET active = 0 WHERE id = ? AND session_id = ?",
                (memory_id, session_id),
            )
            conn.commit()
            return cursor.rowcount > 0
