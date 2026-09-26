from hashlib import sha256

import numpy as np

from .index import VectorIndex
from .models import RetrievalResult


class VectorRetriever:
    def __init__(self, index: VectorIndex):
        self.index = index

    def search(
        self,
        query_vector,
        *,
        top_k: int,
        score_threshold: float,
    ) -> list[RetrievalResult]:
        if self.index.size == 0 or top_k <= 0:
            return []
        vector = np.asarray(query_vector, dtype=float)
        if vector.ndim != 1 or vector.shape[0] != self.index.vectors.shape[1]:
            raise ValueError("query embedding dimension does not match index")
        norm = np.linalg.norm(vector)
        if norm == 0 or not np.isfinite(vector).all():
            return []
        similarities = np.dot(self.index.vectors, vector / norm)
        ordered_indices = np.argsort(similarities)[::-1]

        results = []
        seen_content = set()
        for index in ordered_indices:
            score = float(similarities[index])
            if score < score_threshold:
                break
            chunk = self.index.chunks[int(index)]
            content_key = sha256(" ".join(chunk.text.split()).encode("utf-8")).digest()
            if content_key in seen_content:
                continue
            seen_content.add(content_key)
            results.append(RetrievalResult(chunk=chunk, score=score))
            if len(results) >= top_k:
                break
        return results
