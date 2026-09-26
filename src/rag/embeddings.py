from abc import ABC, abstractmethod
from hashlib import sha256

import httpx
from openai import AsyncOpenAI


class EmbeddingConfigurationError(ValueError):
    pass


class EmbeddingProvider(ABC):
    provider_name: str
    model: str

    @property
    def cache_identity(self) -> str:
        return f"{self.provider_name}:{self.model}"

    @abstractmethod
    async def embed_texts(self, texts: list[str]) -> list[list[float]]:
        raise NotImplementedError

    async def embed_query(self, text: str) -> list[float]:
        vectors = await self.embed_texts([text])
        if not vectors:
            raise RuntimeError("embedding provider returned no query vector")
        return vectors[0]


class OllamaEmbeddingProvider(EmbeddingProvider):
    provider_name = "ollama"

    def __init__(self, base_url: str, model: str, timeout_seconds: float = 60.0):
        self.base_url = base_url.rstrip("/")
        self.model = model
        self.timeout_seconds = timeout_seconds

    @property
    def cache_identity(self) -> str:
        endpoint_hash = sha256(self.base_url.encode("utf-8")).hexdigest()[:12]
        return f"{self.provider_name}:{self.model}:{endpoint_hash}"

    async def embed_texts(self, texts: list[str]) -> list[list[float]]:
        if not texts:
            return []
        async with httpx.AsyncClient(timeout=self.timeout_seconds) as client:
            response = await client.post(
                f"{self.base_url}/api/embed",
                json={"model": self.model, "input": texts},
            )
            if response.status_code != 404:
                response.raise_for_status()
                vectors = response.json().get("embeddings") or []
                if len(vectors) != len(texts):
                    raise RuntimeError("Ollama returned an unexpected embedding count")
                return vectors

            # Older Ollama versions expose only the single-input endpoint.
            vectors = []
            for text in texts:
                legacy = await client.post(
                    f"{self.base_url}/api/embeddings",
                    json={"model": self.model, "prompt": text},
                )
                legacy.raise_for_status()
                vector = legacy.json().get("embedding")
                if not vector:
                    raise RuntimeError("Ollama returned an empty embedding")
                vectors.append(vector)
            return vectors


class OpenAICompatibleEmbeddingProvider(EmbeddingProvider):
    provider_name = "openai-compatible"

    def __init__(self, base_url: str, model: str, api_key: str | None = None):
        if not base_url:
            raise EmbeddingConfigurationError(
                "EMBEDDING_BASE_URL is required for openai-compatible embeddings"
            )
        self.base_url = base_url.rstrip("/")
        self.model = model
        self.client = AsyncOpenAI(
            base_url=self.base_url,
            api_key=api_key or "local-endpoint-no-key",
            max_retries=0,
            timeout=60.0,
        )

    @property
    def cache_identity(self) -> str:
        endpoint_hash = sha256(self.base_url.encode("utf-8")).hexdigest()[:12]
        return f"{self.provider_name}:{self.model}:{endpoint_hash}"

    async def embed_texts(self, texts: list[str]) -> list[list[float]]:
        if not texts:
            return []
        response = await self.client.embeddings.create(model=self.model, input=texts)
        ordered = sorted(response.data, key=lambda item: item.index)
        vectors = [item.embedding for item in ordered]
        if len(vectors) != len(texts):
            raise RuntimeError("embedding endpoint returned an unexpected vector count")
        return vectors


def create_embedding_provider(settings) -> EmbeddingProvider:
    provider = settings.embedding_provider.lower().strip()
    if provider == "ollama":
        return OllamaEmbeddingProvider(
            base_url=settings.embedding_base_url,
            model=settings.embedding_model,
        )
    if provider in {"openai", "openai-compatible"}:
        return OpenAICompatibleEmbeddingProvider(
            base_url=settings.embedding_base_url,
            model=settings.embedding_model,
            api_key=settings.embedding_api_key,
        )
    raise EmbeddingConfigurationError(
        f"Unsupported EMBEDDING_PROVIDER: {settings.embedding_provider}"
    )
