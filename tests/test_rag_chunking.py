from src.rag import KnowledgeDocument, TextChunker


def test_markdown_chunking_preserves_source_title_and_index():
    document = KnowledgeDocument(
        source="guide.md",
        title="CBT Guide",
        text=(
            "# CBT Guide\n\n"
            "## 自动化思维\n"
            + "自动化思维会快速出现。" * 15
            + "\n## 睡眠\n"
            + "睡眠会影响情绪调节。" * 8
        ),
        metadata={"format": "md"},
    )

    chunks = TextChunker(chunk_size=120, chunk_overlap=20).chunk([document])

    assert len(chunks) >= 3
    assert all(chunk.source == "guide.md" for chunk in chunks)
    assert [chunk.chunk_index for chunk in chunks] == list(range(len(chunks)))
    assert chunks[0].title == "自动化思维"
    assert chunks[-1].title == "睡眠"
    assert chunks[0].metadata["format"] == "md"


def test_character_overlap_works_without_english_word_boundaries():
    text = "甲" * 90 + "乙" * 90
    document = KnowledgeDocument(
        source="zh.txt",
        title="中文",
        text=text,
        metadata={"format": "txt"},
    )

    chunks = TextChunker(chunk_size=100, chunk_overlap=20).chunk([document])

    assert len(chunks) == 2
    assert chunks[0].text[-20:] == chunks[1].text[:20]


def test_empty_document_content_produces_no_chunks():
    document = KnowledgeDocument(source="empty.txt", title="Empty", text="")

    assert TextChunker().chunk([document]) == []
