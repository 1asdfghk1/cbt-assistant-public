import yaml
from pathlib import Path


class PromptManager:
    """Manages system prompts and context injection."""

    def __init__(self, config_path: Path):
        self.config_path = config_path
        self._load_config()

    def _load_config(self):
        with open(self.config_path, "r", encoding="utf-8") as f:
            self.config = yaml.safe_load(f)

    def build_system_prompt(
        self,
        context_chunks: list[dict],
        mood_history: list = None,
        thought_records: list = None,
        summary: str = None,
    ) -> str:

        system_prompts = self.config.get("system_prompts", {})

        if isinstance(system_prompts, dict):
            base_prompt = system_prompts.get(
                "default",
                "你是一名专业的CBT心理助手，请使用中文回答。",
            )
        else:
            base_prompt = "你是一名专业的CBT心理助手，请使用中文回答。"


        # 长期记忆
        if summary:
            base_prompt += "\n---长期记忆---\n"
            base_prompt += summary
            base_prompt += "\n---结束---\n"


        # RAG知识
        if context_chunks:
            base_prompt += "\n---相关知识---\n"

            for item in context_chunks:
                chunk = item["chunk"]

                base_prompt += (
                    f"\n[{chunk['title']}]\n"
                    f"{chunk['content'][:1500]}\n"
                )

            base_prompt += "\n---结束知识---\n"


        # 用户情绪记录
        if mood_history:
            base_prompt += "\n---情绪历史---\n"

            for entry in mood_history[-5:]:
                base_prompt += (
                    f"{entry['timestamp']} "
                    f"情绪:{entry['score']}/10\n"
                )


        # 认知行为记录（想法记录）
        if thought_records:
            base_prompt += "\n---想法记录---\n"

            for tr in thought_records[-5:]:
                base_prompt += (
                    f"情境:{tr.get('situation', '')} | "
                    f"想法:{tr.get('thought', '')} | "
                    f"情绪:{tr.get('emotion', '')} "
                    f"({tr.get('intensity', '?')}/10) | "
                    f"替代想法:{tr.get('rational_response', '')}\n"
                )


        base_prompt += """

请始终使用中文回答。

你的角色：
- 温暖的CBT心理助手
- 帮助用户分析想法和情绪
- 不进行医学诊断
- 如果存在严重风险，建议寻求专业帮助

"""

        return base_prompt
