import re
from dataclasses import replace

from src.memory.models import MemoryCandidate


class MemoryPolicy:
    """Allows only explicit, non-sensitive conversation background."""

    _sensitive_patterns = tuple(
        re.compile(pattern, re.IGNORECASE)
        for pattern in (
            r"\b(?:phq[- ]?9?|gad[- ]?7?|rosenberg)\b.{0,24}\d+",
            r"(?:量表|测评|测试).{0,12}(?:得分|分数|结果).{0,12}\d+",
            r"(?:诊断|确诊|医生说|病历|医疗记录|精神疾病|抑郁症|焦虑症|双相|精神分裂)",
            r"(?:自伤|自残|自杀|伤害自己|结束生命|不想活)",
            r"(?:创伤|性侵|虐待经历|创伤经历)",
            r"(?:药物|用药|处方|剂量|吃药|服药)",
            r"(?:性生活|性行为|性经历)",
            r"(?:身份证|护照|银行卡|信用卡|社保号)",
            r"(?:密码|口令|api[ _-]?key|secret|access[ _-]?token|private[ _-]?key)",
            r"(?:手机号|电话号码|联系电话|电子邮箱|email|e-mail|微信号|qq号)",
            r"(?:详细地址|精确地址|家庭住址|门牌号)",
            r"(?:昨晚|昨天).{0,20}(?:睡了?|入睡|醒来).{0,12}\d+(?:\.\d+)?(?:小时|点)",
            r"(?:忽略|绕过).{0,16}(?:系统|规则|指令|提示词)|jailbreak|system prompt",
        )
    )
    _allowed_types = {"goal", "preference", "ongoing_topic", "decision", "plan"}

    def allow(self, candidate: MemoryCandidate, source_text: str) -> bool:
        content = " ".join(candidate.content.split()).strip(" \t\r\n。！？;；,，:：")
        if candidate.type not in self._allowed_types:
            return False
        if candidate.source != "explicit_user" or candidate.explicitness < 1.0:
            return False
        if len(content) < 2 or len(content) > 240:
            return False
        combined = f"{source_text}\n{content}"
        return not any(pattern.search(combined) for pattern in self._sensitive_patterns)

    def clean(self, candidate: MemoryCandidate) -> MemoryCandidate:
        content = " ".join(candidate.content.split()).strip(" \t\r\n。！？;；,，:：")
        return replace(candidate, content=content)
