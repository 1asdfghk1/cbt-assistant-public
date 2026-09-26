import pytest

from src.rag import KnowledgeChunk, VectorIndex, VectorRetriever


def _chunk(source, text, index):
    return KnowledgeChunk(
        source=source,
        title=source,
        text=text,
        chunk_index=index,
    )


def test_retriever_returns_deterministic_score_order_and_top_k():
    chunks = [
        _chunk("automatic.md", "automatic thought", 0),
        _chunk("sleep.md", "sleep regulation", 0),
        _chunk("mixed.md", "related concept", 0),
    ]
    index = VectorIndex.build(
        chunks,
        [[1.0, 0.0], [0.0, 1.0], [0.8, 0.2]],
    )

    results = VectorRetriever(index).search(
        [1.0, 0.0],
        top_k=2,
        score_threshold=0.5,
    )

    assert [result.chunk.source for result in results] == ["automatic.md", "mixed.md"]
    assert results[0].score >= results[1].score


def test_threshold_filters_low_similarity_and_zero_query():
    index = VectorIndex.build(
        [_chunk("sleep.md", "sleep", 0)],
        [[0.0, 1.0]],
    )
    retriever = VectorRetriever(index)

    assert retriever.search([1.0, 0.0], top_k=3, score_threshold=0.2) == []
    assert retriever.search([0.0, 0.0], top_k=3, score_threshold=0.0) == []


def test_retriever_deduplicates_identical_chunk_text():
    index = VectorIndex.build(
        [
            _chunk("a.md", "same normalized text", 0),
            _chunk("b.md", "same   normalized  text", 0),
            _chunk("c.md", "different text", 0),
        ],
        [[1.0, 0.0], [0.99, 0.01], [0.8, 0.2]],
    )

    results = VectorRetriever(index).search(
        [1.0, 0.0],
        top_k=3,
        score_threshold=0.5,
    )

    assert [result.chunk.source for result in results] == ["a.md", "c.md"]


def test_retriever_rejects_wrong_query_dimension():
    index = VectorIndex.build([_chunk("a.md", "a", 0)], [[1.0, 0.0]])

    with pytest.raises(ValueError, match="dimension"):
        VectorRetriever(index).search([1.0], top_k=1, score_threshold=0.0)
