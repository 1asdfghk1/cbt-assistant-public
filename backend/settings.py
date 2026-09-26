import os
from dataclasses import dataclass
from pathlib import Path

import yaml
from dotenv import load_dotenv


PROJECT_ROOT = Path(__file__).resolve().parent.parent
CONFIG_DIR = PROJECT_ROOT / "config"


@dataclass(frozen=True)
class ModelSettings:
    llm_provider: str
    deepseek_api_key: str
    deepseek_model: str
    embedding_model: str
    ollama_base_url: str
    ollama_model: str
    llm_options: dict[str, float | int]


def load_model_settings() -> ModelSettings:
    # 固定从项目根目录读取 .env，不依赖当前启动目录
    load_dotenv(PROJECT_ROOT / ".env")

    config_path = CONFIG_DIR / "model_config.yaml"

    with open(config_path, "r", encoding="utf-8") as file:
        models = yaml.safe_load(file)["models"]

    deepseek = models["deepseek"]
    embeddings = models["embeddings"]

    llm_provider = (
        os.getenv("LLM_PROVIDER", "").strip().lower()
        or str(models.get("default", "deepseek")).strip().lower()
    )
    if llm_provider not in {"deepseek", "ollama"}:
        raise RuntimeError(
            "LLM_PROVIDER 只能是 deepseek 或 ollama。"
        )

    deepseek_api_key = os.getenv("DEEPSEEK_API_KEY", "").strip()

    if llm_provider == "deepseek" and not deepseek_api_key:
        raise RuntimeError(
            "缺少 DEEPSEEK_API_KEY，请在项目根目录的 .env 中配置。"
        )

    return ModelSettings(
        llm_provider=llm_provider,
        deepseek_api_key=deepseek_api_key,
        deepseek_model=(
            os.getenv("DEEPSEEK_MODEL", "").strip()
            or deepseek["model_name"]
        ),
        embedding_model=embeddings["model_name"],
        ollama_base_url=(
            os.getenv("OLLAMA_BASE_URL", "").strip()
            or "http://localhost:11434"
        ),
        ollama_model=(
            os.getenv("OLLAMA_MODEL", "").strip()
            or "qwen3:4b-instruct"
        ),
        llm_options={
            "temperature": deepseek["temperature"],
            "top_p": deepseek["top_p"],
            "max_tokens": deepseek["max_tokens"],
        },
    )
