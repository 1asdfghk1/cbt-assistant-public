import re

from src.memory.models import MemoryCandidate
from src.memory.policy import MemoryPolicy


class ExplicitMemoryExtractor:
    """Cue-based extraction: it never infers a profile from an ordinary fact."""

    _patterns = (
        (
            "goal",
            re.compile(
                r"(?:我(?:这段时间)?(?:的)?(?:主要|当前)?目标(?:是|：|:)|我希望(?:今后|以后|长期|接下来|这段时间)?|my (?:main |current )?goal is|(?:моя|моя текущая) цель[\s:]+)(.+)",
                re.IGNORECASE,
            ),
        ),
        (
            "preference",
            re.compile(
                r"(?:以后|今后|从现在起)(?:回答我|回复我)?(?:时)?(?:请)?(?:尽量)?(.+)|(?:回答|回复)时我更喜欢(.+)|我更喜欢(.+)|(?:from now on|in future),? please (.+)|(?:впредь|в будущем) (?:пожалуйста )?(.+)",
                re.IGNORECASE,
            ),
        ),
        (
            "ongoing_topic",
            re.compile(
                r"(?:这段时间我想重点讨论|接下来想继续讨论|I want to keep discussing|I want to focus on discussing)(.+)",
                re.IGNORECASE,
            ),
        ),
        (
            "decision",
            re.compile(r"(?:我决定|我们决定|I decided to|we decided to|я решил(?:а)?|мы решили)(.+)", re.IGNORECASE),
        ),
        (
            "plan",
            re.compile(
                r"(?:接下来我(?:准备|打算)|我准备|我打算|我们先|next I plan to|I plan to|we will first|я планирую|сначала мы)(.+)",
                re.IGNORECASE,
            ),
        ),
    )

    def __init__(self, policy: MemoryPolicy):
        self.policy = policy

    def extract(self, user_message: str) -> list[MemoryCandidate]:
        text = (user_message or "").strip()
        if not text or len(text) > 2000:
            return []

        candidates: list[MemoryCandidate] = []
        seen: set[tuple[str, str]] = set()
        for memory_type, pattern in self._patterns:
            for match in pattern.finditer(text):
                content = next((group for group in match.groups() if group), "")
                # Stop at the next sentence so one explicit cue creates one compact item.
                content = re.split(r"[\n\r。！？!?]", content, maxsplit=1)[0]
                supersedes = memory_type in {"goal", "plan"} or bool(
                    re.search(r"(?:改为|不再|换成|from now on instead)", text, re.IGNORECASE)
                )
                candidate = self.policy.clean(
                    MemoryCandidate(
                        type=memory_type,
                        content=content,
                        supersedes=supersedes,
                    )
                )
                key = (candidate.type, candidate.content.casefold())
                if key not in seen and self.policy.allow(candidate, text):
                    candidates.append(candidate)
                    seen.add(key)
        return candidates
