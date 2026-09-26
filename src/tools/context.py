from dataclasses import dataclass, field
from typing import Any


@dataclass(frozen=True)
class ToolContext:
    session_id: str
    language: str
    storage: Any
    request_id: str = "untracked"
    model: str = "unknown"


@dataclass(frozen=True)
class ToolOutput:
    content: str
    client_events: tuple[dict, ...] = field(default_factory=tuple)
