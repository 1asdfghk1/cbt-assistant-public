import re
from datetime import datetime, timezone

from src.memory.models import MemoryItem


class MemoryRetriever:
    _type_cues = {
        "goal": ("目标", "主要目标", "goal", "цель"),
        "preference": (
            "回复", "回答", "方式", "偏好", "详细", "简短", "简洁", "解释", "说明",
            "preference", "style", "detail", "brief", "explain", "предпочит",
        ),
        "ongoing_topic": ("话题", "讨论", "topic", "тема"),
        "decision": ("决定", "定的", "decision", "решил"),
        "plan": ("计划", "接下来", "之前", "plan", "план"),
    }
    _type_weight = {
        "goal": 0.10,
        "preference": 0.09,
        "plan": 0.08,
        "decision": 0.07,
        "ongoing_topic": 0.05,
    }

    @staticmethod
    def _tokens(text: str) -> set[str]:
        folded = text.casefold()
        tokens = set(re.findall(r"[a-z0-9Ѐ-ӿ]{2,}", folded))
        for block in re.findall(r"[\u4e00-\u9fff]+", folded):
            for size in (2, 3, 4):
                tokens.update(block[index : index + size] for index in range(len(block) - size + 1))
        return tokens

    @staticmethod
    def _recency(updated_at: str) -> float:
        try:
            updated = datetime.fromisoformat(updated_at)
            if updated.tzinfo is None:
                updated = updated.replace(tzinfo=timezone.utc)
            age_days = max(0.0, (datetime.now(timezone.utc) - updated).total_seconds() / 86400)
            return 0.05 / (1.0 + age_days / 30.0)
        except (TypeError, ValueError):
            return 0.0

    def retrieve(self, query: str, memories: list[MemoryItem], limit: int = 4) -> list[MemoryItem]:
        query_tokens = self._tokens(query)
        query_folded = query.casefold()
        ranked: list[tuple[float, MemoryItem]] = []
        for item in memories:
            if not item.active:
                continue
            item_tokens = self._tokens(item.content)
            overlap = len(query_tokens & item_tokens) / max(1, min(len(query_tokens), len(item_tokens)))
            type_cue = any(cue in query_folded for cue in self._type_cues.get(item.type, ()))
            if overlap == 0 and not type_cue:
                continue
            score = overlap + (0.45 if type_cue else 0.0)
            score += self._type_weight.get(item.type, 0.0) + self._recency(item.updated_at)
            ranked.append((score, item))

        ranked.sort(key=lambda pair: (pair[0], pair[1].updated_at), reverse=True)
        return [item for _, item in ranked[: max(1, limit)]]
