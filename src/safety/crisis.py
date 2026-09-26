"""Deterministic crisis routing for chat entry points.

This deliberately favors a small, auditable rule set over an LLM classifier. It
does not diagnose the user or store any additional safety profile.
"""

import re
import unicodedata
from dataclasses import dataclass
from typing import Literal


CrisisLevel = Literal["concern", "imminent"]


@dataclass(frozen=True)
class CrisisAssessment:
    level: CrisisLevel
    response: str

    def to_public_dict(self) -> dict[str, str | bool]:
        return {"routed": True, "level": self.level}


def _compile(*patterns: str) -> tuple[re.Pattern[str], ...]:
    return tuple(re.compile(pattern, re.IGNORECASE) for pattern in patterns)


_EXPLICIT_NEGATIONS = _compile(
    r"(?:我)?(?:没有|没|不)(?:在)?(?:想|打算|计划|准备)(?:去)?(?:自杀|自残|伤害自己)",
    r"\b(?:i\s+(?:am|'m)?\s*not\s+suicidal|i\s+(?:do\s+not|don't)\s+(?:want|plan)\s+to\s+(?:kill|hurt)\s+myself)\b",
    r"\bя\s+не\s+(?:хочу|планирую)\s+(?:покончить\s+с\s+собой|убить\s+себя|причинить\s+себе\s+вред)\b",
)

_IMMINENT_PATTERNS = _compile(
    r"(?:我|自己|本人).{0,16}(?:现在|马上|立刻|今晚|今天|想|要|准备|打算|计划|决定|会).{0,8}(?:自杀|自尽|轻生|寻死|结束(?:(?:自己|我)的?)?生命|杀(?:了)?自己|伤害自己|自残)",
    r"(?:现在|马上|立刻|今晚|今天|一会儿|待会儿).{0,12}(?:自杀|自尽|轻生|寻死|结束生命|伤害自己|自残)",
    r"(?:已经|刚刚|刚才).{0,12}(?:割腕|吞药|服药过量|吃了大量药|跳楼|上吊|伤害了自己)",
    r"(?:方法|遗书|工具|药|刀|楼顶).{0,10}(?:都)?(?:准备好|找好|买好|写好|选好)了?",
    r"\b(?:i|i'm|im|i am)\b.{0,40}\b(?:want|going|gonna|plan|planning|intend|decided|ready|about)\b.{0,24}\b(?:kill myself|end my life|die|hurt myself|self[- ]?harm)\b",
    r"\b(?:i(?:'ve| have)?|i just)\b.{0,24}\b(?:took too many pills|overdosed|cut my wrists?|attempted suicide)\b",
    r"\b(?:i have|i made|i've made)\b.{0,16}\b(?:suicide plan|plan to (?:die|kill myself))\b",
    r"\bя\b.{0,32}\b(?:хочу|собираюсь|планирую|решил(?:а)?|готов(?:а)?)\b.{0,24}\b(?:умереть|покончить с собой|убить себя|навредить себе)\b",
    r"\bя\b.{0,24}\b(?:уже|только что)\b.{0,20}\b(?:принял(?:а)? много таблеток|порезал(?:а)? вены|пытал(?:ся|ась) покончить с собой)\b",
)

_CONCERN_PATTERNS = _compile(
    r"(?:我|自己).{0,12}(?:有|出现|控制不住).{0,6}(?:自杀|自残|轻生)(?:的)?(?:想法|念头|冲动)",
    r"(?:我)?(?:不想活了?|活不下去|活着没意思|没有活下去的理由|死了算了|一死了之|希望醒不过来|消失就好了)",
    r"(?:大家|家人|他们).{0,8}(?:没有我|我死了).{0,8}(?:会|可能)?更好",
    r"\b(?:i am|i'm|im)\s+suicidal\b",
    r"\b(?:i have|i'm having|im having)\s+(?:suicidal thoughts|thoughts of (?:suicide|killing myself|self[- ]?harm))\b",
    r"\b(?:i don't want to live|i do not want to live|no reason to live|wish i were dead|wish i wouldn't wake up|better off dead|everyone would be better off without me)\b",
    r"\b(?:у меня)\b.{0,16}\b(?:суицидальные мысли|мысли о самоубийстве|желание навредить себе)\b",
    r"\b(?:я не хочу жить|мне незачем жить|лучше умереть|хочу не проснуться|без меня всем будет лучше)\b",
)


_RESPONSES: dict[str, dict[CrisisLevel, str]] = {
    "zh": {
        "concern": (
            "听起来你正在承受很强烈的痛苦，我很在意你此刻的安全。你现在是否正打算伤害自己，"
            "或已经有具体计划和可用的工具？如果有立即危险或你已经采取了行动，请立刻联系当地急救服务，"
            "或前往最近的急诊。请不要独处，马上联系一位你信任的人陪着你，并在安全的前提下远离可能用来"
            "伤害自己的物品。也请尽快联系当地危机热线或心理健康专业人员。请先告诉我：你现在安全吗，"
            "身边有没有可以马上联系的人？"
        ),
        "imminent": (
            "这听起来可能是紧急情况。请现在就联系当地急救服务或前往最近的急诊；如果你已经受伤、服药"
            "过量或采取了其他行动，请立即说明情况并请求医疗救助。不要独处，请马上让一位可信任的人来到"
            "你身边；在确保安全的前提下，远离药物、刀具、高处或其他可能造成伤害的物品。你也可以联系当地"
            "危机热线。请只先回复：你是否已经采取行动，以及现在是否有人陪着你？"
        ),
    },
    "en": {
        "concern": (
            "It sounds like you are carrying intense pain, and your immediate safety matters. Are you thinking of "
            "hurting yourself right now, or do you have a specific plan and access to the means? If you are in immediate "
            "danger or have already acted, contact your local emergency services or go to the nearest emergency department "
            "now. Do not stay alone: contact someone you trust and ask them to stay with you, and move away from anything "
            "you could use to hurt yourself if you can do so safely. You can also contact a local crisis line or mental health "
            "professional. Please tell me first: are you safe right now, and is there someone you can contact immediately?"
        ),
        "imminent": (
            "This may be an emergency. Contact your local emergency services or go to the nearest emergency department now. "
            "If you have already injured yourself, taken an overdose, or acted in another way, tell them exactly what happened "
            "and request urgent medical help. Do not stay alone: ask a trusted person to come and stay with you, and move away "
            "from medicines, weapons, heights, or anything else you could use to hurt yourself if it is safe to do so. You can "
            "also contact a local crisis line. Please reply first with whether you have already acted and whether someone is "
            "with you now."
        ),
    },
    "ru": {
        "concern": (
            "Похоже, вам сейчас очень тяжело, и ваша безопасность важнее всего. Думаете ли вы причинить себе вред прямо "
            "сейчас, есть ли у вас конкретный план и доступ к средствам? Если опасность непосредственная или вы уже что-то "
            "сделали, немедленно свяжитесь с местной экстренной службой или обратитесь в ближайшее отделение неотложной "
            "помощи. Не оставайтесь в одиночестве: позовите человека, которому доверяете, и по возможности безопасно "
            "отойдите от всего, чем можно причинить себе вред. Также можно обратиться на местную кризисную линию или к "
            "специалисту по психическому здоровью. Сначала ответьте: вы сейчас в безопасности и есть ли кому быть рядом?"
        ),
        "imminent": (
            "Это может быть экстренная ситуация. Немедленно свяжитесь с местной экстренной службой или обратитесь в "
            "ближайшее отделение неотложной помощи. Если вы уже получили травму, приняли слишком много лекарств или "
            "предприняли другое действие, точно сообщите об этом и попросите срочную медицинскую помощь. Не оставайтесь в "
            "одиночестве: попросите близкого человека прийти к вам и по возможности безопасно отойдите от лекарств, оружия, "
            "высоты и других опасных предметов. Можно также обратиться на местную кризисную линию. Сначала ответьте, уже ли "
            "вы что-то сделали и находится ли кто-нибудь рядом с вами."
        ),
    },
}


def _normalize(text: str) -> str:
    normalized = unicodedata.normalize("NFKC", str(text or "")).lower()
    return " ".join(normalized.split())


def _without_explicit_negations(text: str) -> str:
    for pattern in _EXPLICIT_NEGATIONS:
        text = pattern.sub(" ", text)
    return text


def assess_crisis(message: str, language: str = "zh") -> CrisisAssessment | None:
    """Return a fixed safety response when first-person crisis language is found."""
    text = _without_explicit_negations(_normalize(message))
    if not text.strip():
        return None

    level: CrisisLevel | None = None
    if any(pattern.search(text) for pattern in _IMMINENT_PATTERNS):
        level = "imminent"
    elif any(pattern.search(text) for pattern in _CONCERN_PATTERNS):
        level = "concern"

    if level is None:
        return None

    lang = str(language or "zh").lower().split("-", 1)[0]
    if lang not in _RESPONSES:
        lang = "zh"
    return CrisisAssessment(level=level, response=_RESPONSES[lang][level])
