import json
import logging
from dataclasses import dataclass
from pathlib import Path

import numpy as np

from .models import KnowledgeChunk


logger = logging.getLogger(__name__)


@dataclass
class VectorIndex:
    chunks: list[KnowledgeChunk]
    vectors: np.ndarray

    @classmethod
    def build(cls, chunks: list[KnowledgeChunk], vectors) -> "VectorIndex":
        matrix = np.asarray(vectors, dtype=float)
        if not chunks:
            return cls([], np.empty((0, 0), dtype=float))
        if matrix.ndim != 2 or matrix.shape[0] != len(chunks):
            raise ValueError("embedding matrix does not match chunks")
        if matrix.shape[1] == 0 or not np.isfinite(matrix).all():
            raise ValueError("embedding matrix is empty or invalid")
        norms = np.linalg.norm(matrix, axis=1, keepdims=True)
        normalized = matrix / np.where(norms == 0, 1, norms)
        return cls(list(chunks), normalized)

    @property
    def size(self) -> int:
        return len(self.chunks)


class IndexCache:
    """Small NumPy/JSON cache validated by a complete knowledge/config fingerprint."""

    def __init__(self, cache_dir: Path):
        self.cache_dir = Path(cache_dir)
        self.vectors_path = self.cache_dir / "vectors.npy"
        self.metadata_path = self.cache_dir / "index.json"

    def load(self, fingerprint: str) -> VectorIndex | None:
        if not self.vectors_path.exists() or not self.metadata_path.exists():
            return None
        try:
            metadata = json.loads(self.metadata_path.read_text(encoding="utf-8"))
            if metadata.get("fingerprint") != fingerprint:
                return None
            chunks = [KnowledgeChunk.from_dict(item) for item in metadata["chunks"]]
            vectors = np.load(self.vectors_path, allow_pickle=False)
            index = VectorIndex.build(chunks, vectors)
            logger.info("rag_index_cache_loaded chunks=%s", index.size)
            return index
        except (OSError, ValueError, KeyError, TypeError, json.JSONDecodeError) as error:
            logger.warning(
                "rag_index_cache_invalid error_type=%s",
                type(error).__name__,
            )
            return None

    def save(self, fingerprint: str, index: VectorIndex) -> None:
        self.cache_dir.mkdir(parents=True, exist_ok=True)
        vectors_tmp = self.cache_dir / "vectors.npy.tmp"
        metadata_tmp = self.cache_dir / "index.json.tmp"
        try:
            with vectors_tmp.open("wb") as handle:
                np.save(handle, index.vectors, allow_pickle=False)
            metadata_tmp.write_text(
                json.dumps(
                    {
                        "version": 1,
                        "fingerprint": fingerprint,
                        "chunks": [chunk.to_dict() for chunk in index.chunks],
                    },
                    ensure_ascii=False,
                ),
                encoding="utf-8",
            )
            vectors_tmp.replace(self.vectors_path)
            metadata_tmp.replace(self.metadata_path)
            logger.info("rag_index_cache_saved chunks=%s", index.size)
        except OSError as error:
            logger.warning(
                "rag_index_cache_write_failed error_type=%s",
                type(error).__name__,
            )
            for path in (vectors_tmp, metadata_tmp):
                try:
                    path.unlink(missing_ok=True)
                except OSError:
                    pass
