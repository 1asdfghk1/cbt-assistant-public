from backend.settings import load_model_settings
import pytest

def test_environment_variables_override_model_defaults(monkeypatch):
    monkeypatch.setenv("DEEPSEEK_API_KEY", "settings-test-key")
    monkeypatch.setenv("DEEPSEEK_MODEL", "settings-test-model")

    settings = load_model_settings()

    assert settings.deepseek_api_key == "settings-test-key"
    assert settings.deepseek_model == "settings-test-model"


def test_missing_api_key_raises_clear_error(monkeypatch):
    monkeypatch.setattr(
        "backend.settings.load_dotenv",
        lambda *_args, **_kwargs: None,
    )
    monkeypatch.setenv("LLM_PROVIDER", "deepseek")
    monkeypatch.delenv("DEEPSEEK_API_KEY", raising=False)

    with pytest.raises(RuntimeError, match="缺少 DEEPSEEK_API_KEY"):
        load_model_settings()

def test_yaml_defaults_build_llm_options(monkeypatch):
    monkeypatch.setattr(
        "backend.settings.load_dotenv",
        lambda *_args, **_kwargs: None,
    )
    monkeypatch.setenv("DEEPSEEK_API_KEY", "settings-test-key")
    monkeypatch.delenv("DEEPSEEK_MODEL", raising=False)

    settings = load_model_settings()

    assert settings.deepseek_model == "deepseek-chat"
    assert settings.embedding_model == "qwen3-embedding:4b"
    assert settings.llm_options == {
        "temperature": 0.7,
        "top_p": 0.9,
        "max_tokens": 1024,
    }


def test_settings_load_outside_project_directory(monkeypatch, tmp_path):
    fake_project_root = tmp_path / "fake-project"
    other_directory = tmp_path / "other-directory"

    fake_project_root.mkdir()
    other_directory.mkdir()

    (fake_project_root / ".env").write_text(
        "DEEPSEEK_API_KEY=from-test-env\n",
        encoding="utf-8",
    )

    monkeypatch.setattr(
        "backend.settings.PROJECT_ROOT",
        fake_project_root,
    )
    monkeypatch.delenv("DEEPSEEK_API_KEY", raising=False)
    monkeypatch.chdir(other_directory)

    settings = load_model_settings()

    assert settings.deepseek_api_key == "from-test-env"
    assert settings.llm_options["max_tokens"] == 1024
def test_ollama_provider_does_not_require_deepseek_key(monkeypatch):
    monkeypatch.setattr(
        "backend.settings.load_dotenv",
        lambda *_args, **_kwargs: None,
    )
    monkeypatch.setenv("LLM_PROVIDER", "ollama")
    monkeypatch.setenv("OLLAMA_MODEL", "qwen3:4b")
    monkeypatch.delenv("DEEPSEEK_API_KEY", raising=False)

    settings = load_model_settings()

    assert settings.llm_provider == "ollama"
    assert settings.ollama_model == "qwen3:4b"
    assert settings.deepseek_api_key == ""


def test_release_defaults_to_ollama_without_a_deepseek_key(monkeypatch):
    monkeypatch.setattr("backend.settings.load_dotenv", lambda *_args, **_kwargs: None)
    monkeypatch.delenv("LLM_PROVIDER", raising=False)
    monkeypatch.delenv("DEEPSEEK_API_KEY", raising=False)

    settings = load_model_settings()

    assert settings.llm_provider == "ollama"
    assert settings.ollama_model == "qwen3:4b-instruct"
    assert settings.deepseek_api_key == ""
