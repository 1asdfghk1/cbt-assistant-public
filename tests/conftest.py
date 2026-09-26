import ipaddress
import os
import socket
import sys
import tempfile
from pathlib import Path

import pytest
from fastapi.testclient import TestClient


PROJECT_ROOT = Path(__file__).resolve().parent.parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

# backend.server creates its SQLite manager at import time. Redirect that import-time
# initialization before pytest imports any test module that references the app.
_RUNTIME_DIR = tempfile.TemporaryDirectory(prefix="cbt-assistant-pytest-")
_PREVIOUS_DATA_DIR = os.environ.get("CBT_DATA_DIR")
_PREVIOUS_API_KEY = os.environ.get("DEEPSEEK_API_KEY")
_PREVIOUS_LLM_PROVIDER = os.environ.get("LLM_PROVIDER")
_PREVIOUS_RAG_ENABLED = os.environ.get("RAG_ENABLED")
_PREVIOUS_APP_HOST = os.environ.get("APP_HOST")
_PREVIOUS_APP_PORT = os.environ.get("APP_PORT")
_PREVIOUS_ALLOWED_ORIGINS = os.environ.get("APP_ALLOWED_ORIGINS")
os.environ["CBT_DATA_DIR"] = _RUNTIME_DIR.name
os.environ["DEEPSEEK_API_KEY"] = "pytest-not-a-real-api-key"
os.environ["LLM_PROVIDER"] = "ollama"
os.environ["RAG_ENABLED"] = "false"
os.environ["APP_HOST"] = "127.0.0.1"
os.environ["APP_PORT"] = "8001"
os.environ["APP_ALLOWED_ORIGINS"] = ""

from src.tools import ToolContext  # noqa: E402
from src.utils.db import SQLiteSessionManager  # noqa: E402
from tests.fakes import FakeEmbeddingProvider, FakeLLMClient  # noqa: E402


def pytest_unconfigure(config):
    if _PREVIOUS_DATA_DIR is None:
        os.environ.pop("CBT_DATA_DIR", None)
    else:
        os.environ["CBT_DATA_DIR"] = _PREVIOUS_DATA_DIR
    if _PREVIOUS_API_KEY is None:
        os.environ.pop("DEEPSEEK_API_KEY", None)
    else:
        os.environ["DEEPSEEK_API_KEY"] = _PREVIOUS_API_KEY
    if _PREVIOUS_LLM_PROVIDER is None:
        os.environ.pop("LLM_PROVIDER", None)
    else:
        os.environ["LLM_PROVIDER"] = _PREVIOUS_LLM_PROVIDER
    if _PREVIOUS_RAG_ENABLED is None:
        os.environ.pop("RAG_ENABLED", None)
    else:
        os.environ["RAG_ENABLED"] = _PREVIOUS_RAG_ENABLED
    if _PREVIOUS_APP_HOST is None:
        os.environ.pop("APP_HOST", None)
    else:
        os.environ["APP_HOST"] = _PREVIOUS_APP_HOST
    if _PREVIOUS_APP_PORT is None:
        os.environ.pop("APP_PORT", None)
    else:
        os.environ["APP_PORT"] = _PREVIOUS_APP_PORT
    if _PREVIOUS_ALLOWED_ORIGINS is None:
        os.environ.pop("APP_ALLOWED_ORIGINS", None)
    else:
        os.environ["APP_ALLOWED_ORIGINS"] = _PREVIOUS_ALLOWED_ORIGINS
    _RUNTIME_DIR.cleanup()


def _is_loopback(host):
    if isinstance(host, bytes):
        host = host.decode("ascii", errors="ignore")
    normalized = str(host).strip("[]").lower()
    if normalized in {"localhost", "testserver"}:
        return True
    try:
        return ipaddress.ip_address(normalized).is_loopback
    except ValueError:
        return False


@pytest.fixture(autouse=True)
def block_external_network(monkeypatch, request):
    """Fail fast if an offline test accidentally tries to open a real socket."""
    if request.node.get_closest_marker("integration"):
        return

    real_connect = socket.socket.connect
    real_getaddrinfo = socket.getaddrinfo

    def guarded_connect(sock, address):
        if not isinstance(address, tuple) or _is_loopback(address[0]):
            return real_connect(sock, address)
        raise RuntimeError(f"External network is disabled during tests: {address[0]}")

    def guarded_getaddrinfo(host, *args, **kwargs):
        if _is_loopback(host):
            return real_getaddrinfo(host, *args, **kwargs)
        raise RuntimeError(f"External DNS is disabled during tests: {host}")

    monkeypatch.setattr(socket.socket, "connect", guarded_connect)
    monkeypatch.setattr(socket, "getaddrinfo", guarded_getaddrinfo)


@pytest.fixture
def test_session_id():
    return "test-session-001"


@pytest.fixture
def temporary_db(tmp_path):
    return tmp_path / "test_cbt.db"


@pytest.fixture
def storage(temporary_db):
    return SQLiteSessionManager(temporary_db)


@pytest.fixture
def db_manager(storage):
    return storage


@pytest.fixture
def sample_sleep_records():
    return [
        {
            "bed": "23:30",
            "wake": "06:30",
            "awk": 1,
            "qual": 8,
            "notes": "test sleep record",
            "durHrs": 7.0,
            "isoDate": "2026-08-22T23:30:00Z",
        },
        {
            "bed": "00:00",
            "wake": "08:00",
            "awk": 0,
            "qual": 7,
            "notes": "older test sleep record",
            "durHrs": 8.0,
            "isoDate": "2026-08-21T00:00:00Z",
        },
    ]


@pytest.fixture
def sample_test_results():
    return [
        {"name": "GAD-7", "score": 12, "level": "moderate", "date": "2026-08-22"},
        {"name": "PHQ-9", "score": 6, "level": "mild", "date": "2026-08-21"},
    ]


@pytest.fixture
def sample_activities():
    return [
        {
            "text": "walk 20 minutes",
            "done": False,
            "isoDate": "2026-08-22T18:00:00Z",
        }
    ]


@pytest.fixture
def sample_thoughts():
    return [
        {
            "situation": "A test situation",
            "thought": "This might fail",
            "emotion": "anxiety",
            "intensity": 5,
            "distortion": "fortune telling",
            "rational_response": "Tests provide evidence",
        }
    ]


@pytest.fixture
def seeded_storage(
    storage,
    test_session_id,
    sample_sleep_records,
    sample_test_results,
    sample_activities,
    sample_thoughts,
):
    storage.sync_sleep_logs(test_session_id, sample_sleep_records)
    storage.sync_test_results(test_session_id, sample_test_results)
    storage.sync_activities(test_session_id, sample_activities)
    thought = sample_thoughts[0]
    storage.add_thought_record(test_session_id, **thought)
    return storage


@pytest.fixture
def fake_llm_client():
    return FakeLLMClient()


@pytest.fixture
def fake_embedding_provider():
    return FakeEmbeddingProvider(
        {
            "自动化思维": [1.0, 0.0, 0.0, 0.0, 0.0],
            "睡眠": [0.0, 1.0, 0.0, 0.0, 0.0],
            "灾难化": [0.0, 0.0, 1.0, 0.0, 0.0],
            "gad-7": [0.0, 0.0, 0.0, 1.0, 0.0],
            "法国": [0.0, 0.0, 0.0, 0.0, 1.0],
            "今天心情": [0.0, 0.0, 0.0, 0.0, 1.0],
        },
        default_vector=[0.0, 0.0, 0.0, 0.0, 0.0],
    )


@pytest.fixture
def rag_knowledge_base(tmp_path):
    knowledge_dir = tmp_path / "knowledge_base"
    knowledge_dir.mkdir()
    (knowledge_dir / "automatic_thoughts.md").write_text(
        "# 自动化思维\n\n自动化思维是快速出现、未经审视的想法。"
        "在 CBT 中可以通过记录情境、想法、情绪和证据来识别它。",
        encoding="utf-8",
    )
    (knowledge_dir / "sleep.md").write_text(
        "# 睡眠与情绪\n\n睡眠不足会影响注意力和情绪调节，焦虑也可能反过来干扰睡眠。",
        encoding="utf-8",
    )
    (knowledge_dir / "distortions.md").write_text(
        "# 灾难化\n\n灾难化是一种认知偏差，会把不确定结果自动想象成最坏结局。",
        encoding="utf-8",
    )
    (knowledge_dir / "gad7.md").write_text(
        "# GAD-7\n\nGAD-7 是用于焦虑症状筛查和自我了解的七项量表，不构成医学诊断。",
        encoding="utf-8",
    )
    return knowledge_dir


@pytest.fixture
def override_db(storage, monkeypatch):
    import backend.server as server

    monkeypatch.setattr(server, "sessions", storage)
    monkeypatch.setattr(server.memory_service, "db", storage)
    monkeypatch.setattr(server.memory_service.store, "db", storage)
    monkeypatch.setattr(server.summarizer, "db", storage)
    return storage


@pytest.fixture
def fastapi_client(override_db, fake_llm_client, monkeypatch):
    import backend.server as server

    monkeypatch.setattr(server, "llm_client", fake_llm_client)
    monkeypatch.setattr(server.summarizer, "llm_client", fake_llm_client)
    with TestClient(server.app) as client:
        yield client


@pytest.fixture
def mock_tool_context(storage, test_session_id):
    return ToolContext(
        session_id=test_session_id,
        language="zh",
        storage=storage,
        request_id="pytest-request",
        model="fake-deepseek",
    )
