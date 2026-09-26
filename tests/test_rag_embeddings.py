from types import SimpleNamespace
from unittest.mock import AsyncMock

import pytest

from src.rag import (
    EmbeddingConfigurationError,
    OllamaEmbeddingProvider,
    OpenAICompatibleEmbeddingProvider,
    create_embedding_provider,
)


class FakeResponse:
    def __init__(self, status_code, payload):
        self.status_code = status_code
        self.payload = payload

    def raise_for_status(self):
        if self.status_code >= 400:
            raise RuntimeError(f"HTTP {self.status_code}")

    def json(self):
        return self.payload


class FakeHTTPClient:
    def __init__(self, responses):
        self.responses = list(responses)
        self.calls = []

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, traceback):
        return False

    async def post(self, url, json):
        self.calls.append((url, json))
        return self.responses.pop(0)


@pytest.mark.asyncio
async def test_ollama_provider_uses_batch_embedding_endpoint(monkeypatch):
    fake_client = FakeHTTPClient(
        [FakeResponse(200, {"embeddings": [[1.0, 0.0], [0.0, 1.0]]})]
    )
    monkeypatch.setattr(
        "src.rag.embeddings.httpx.AsyncClient",
        lambda **kwargs: fake_client,
    )
    provider = OllamaEmbeddingProvider("http://localhost:11434", "embed-model")

    vectors = await provider.embed_texts(["one", "two"])

    assert vectors == [[1.0, 0.0], [0.0, 1.0]]
    assert fake_client.calls == [
        (
            "http://localhost:11434/api/embed",
            {"model": "embed-model", "input": ["one", "two"]},
        )
    ]


@pytest.mark.asyncio
async def test_ollama_provider_falls_back_to_legacy_single_input_endpoint(monkeypatch):
    fake_client = FakeHTTPClient(
        [
            FakeResponse(404, {}),
            FakeResponse(200, {"embedding": [1.0, 0.0]}),
            FakeResponse(200, {"embedding": [0.0, 1.0]}),
        ]
    )
    monkeypatch.setattr(
        "src.rag.embeddings.httpx.AsyncClient",
        lambda **kwargs: fake_client,
    )
    provider = OllamaEmbeddingProvider("http://localhost:11434", "legacy-model")

    vectors = await provider.embed_texts(["one", "two"])

    assert vectors == [[1.0, 0.0], [0.0, 1.0]]
    assert [call[0] for call in fake_client.calls] == [
        "http://localhost:11434/api/embed",
        "http://localhost:11434/api/embeddings",
        "http://localhost:11434/api/embeddings",
    ]


@pytest.mark.asyncio
async def test_openai_compatible_provider_preserves_input_order():
    provider = OpenAICompatibleEmbeddingProvider(
        "http://localhost:9000/v1",
        "compatible-model",
    )
    provider.client.embeddings.create = AsyncMock(
        return_value=SimpleNamespace(
            data=[
                SimpleNamespace(index=1, embedding=[0.0, 1.0]),
                SimpleNamespace(index=0, embedding=[1.0, 0.0]),
            ]
        )
    )

    vectors = await provider.embed_texts(["first", "second"])

    assert vectors == [[1.0, 0.0], [0.0, 1.0]]
    provider.client.embeddings.create.assert_awaited_once_with(
        model="compatible-model",
        input=["first", "second"],
    )


def test_provider_factory_supports_both_configured_provider_types():
    base = {
        "embedding_base_url": "http://localhost:11434",
        "embedding_model": "test-model",
        "embedding_api_key": None,
    }

    ollama = create_embedding_provider(
        SimpleNamespace(embedding_provider="ollama", **base)
    )
    compatible = create_embedding_provider(
        SimpleNamespace(embedding_provider="openai-compatible", **base)
    )

    assert isinstance(ollama, OllamaEmbeddingProvider)
    assert isinstance(compatible, OpenAICompatibleEmbeddingProvider)


def test_provider_factory_rejects_unknown_provider():
    settings = SimpleNamespace(
        embedding_provider="unknown",
        embedding_base_url="http://unused",
        embedding_model="test-model",
        embedding_api_key=None,
    )

    with pytest.raises(EmbeddingConfigurationError, match="Unsupported"):
        create_embedding_provider(settings)
