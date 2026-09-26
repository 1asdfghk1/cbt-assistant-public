from dataclasses import dataclass, field
from typing import Literal


MemoryType = Literal["goal", "preference", "ongoing_topic", "decision", "plan"]


@dataclass(frozen=True)
class MemoryCandidate:
    """An explicit, policy-checked candidate extracted from one user message."""

    type: MemoryType
    content: str
    source: str = "explicit_user"
    explicitness: float = 1.0
    supersedes: bool = False


@dataclass(frozen=True)
class MemoryItem:
    id: int
    session_id: str
    type: MemoryType
    content: str
    source: str
    explicitness: float
    active: bool
    created_at: str
    updated_at: str

    @classmethod
    def from_row(cls, row) -> "MemoryItem":
        return cls(
            id=row["id"],
            session_id=row["session_id"],
            type=row["memory_type"],
            content=row["content"],
            source=row["source"],
            explicitness=float(row["explicitness"]),
            active=bool(row["active"]),
            created_at=row["created_at"],
            updated_at=row["updated_at"],
        )


@dataclass(frozen=True)
class MemoryWriteResult:
    item: MemoryItem
    action: Literal["stored", "deduplicated", "updated"]


@dataclass
class MemoryContext:
    recent_messages: list[dict] = field(default_factory=list)
    summary: str = ""
    relevant_memories: list[MemoryItem] = field(default_factory=list)
    reference_message: str = ""
