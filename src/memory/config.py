import os
from dataclasses import dataclass


def _bool_env(name: str, default: bool) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


def _int_env(name: str, default: int, minimum: int, maximum: int) -> int:
    try:
        value = int(os.getenv(name, str(default)))
    except (TypeError, ValueError):
        value = default
    return max(minimum, min(value, maximum))


@dataclass(frozen=True)
class MemorySettings:
    enabled: bool = True
    recent_messages: int = 12
    summary_trigger_messages: int = 16
    summary_keep_recent: int = 8
    summary_max_chars: int = 2000
    max_retrieved: int = 4
    extraction_enabled: bool = True

    @classmethod
    def from_env(cls) -> "MemorySettings":
        trigger = _int_env("MEMORY_SUMMARY_TRIGGER_MESSAGES", 16, 4, 200)
        keep_recent = _int_env("MEMORY_SUMMARY_KEEP_RECENT", 8, 2, 100)
        # A trigger must always leave at least one older message to compress.
        keep_recent = min(keep_recent, trigger - 1)
        return cls(
            enabled=_bool_env("MEMORY_ENABLED", True),
            recent_messages=_int_env("MEMORY_RECENT_MESSAGES", 12, 2, 100),
            summary_trigger_messages=trigger,
            summary_keep_recent=keep_recent,
            summary_max_chars=_int_env("MEMORY_SUMMARY_MAX_CHARS", 2000, 200, 12000),
            max_retrieved=_int_env("MEMORY_MAX_RETRIEVED", 4, 1, 10),
            extraction_enabled=_bool_env("MEMORY_EXTRACTION_ENABLED", True),
        )
