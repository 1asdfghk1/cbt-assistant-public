from pathlib import Path

from src.rag import KnowledgeBaseLoader


def test_loader_reads_markdown_and_text_with_source_metadata(tmp_path):
    knowledge_dir = tmp_path / "kb"
    knowledge_dir.mkdir()
    (knowledge_dir / "guide.md").write_text(
        "# CBT Guide\n\nAutomatic thoughts appear quickly.", encoding="utf-8"
    )
    (knowledge_dir / "notes.txt").write_text(
        "Sleep can affect emotional regulation.", encoding="utf-8"
    )
    (knowledge_dir / "ignored.json").write_text("{}", encoding="utf-8")

    documents = KnowledgeBaseLoader(knowledge_dir).load()

    assert [document.source for document in documents] == ["guide.md", "notes.txt"]
    assert documents[0].title == "CBT Guide"
    assert documents[0].metadata == {"format": "md"}
    assert documents[1].metadata == {"format": "txt"}


def test_loader_ignores_hidden_backup_temp_and_empty_files(tmp_path):
    knowledge_dir = tmp_path / "kb"
    knowledge_dir.mkdir()
    (knowledge_dir / "valid.md").write_text("# Valid\n\nUseful content.", encoding="utf-8")
    (knowledge_dir / ".hidden.md").write_text("hidden", encoding="utf-8")
    (knowledge_dir / "guide_backup.md").write_text("backup", encoding="utf-8")
    (knowledge_dir / "draft.tmp").write_text("temp", encoding="utf-8")
    (knowledge_dir / "empty.txt").write_text("", encoding="utf-8")

    documents = KnowledgeBaseLoader(knowledge_dir).load()

    assert [document.source for document in documents] == ["valid.md"]


def test_loader_skips_one_unreadable_file_without_losing_valid_files(
    tmp_path,
    monkeypatch,
):
    knowledge_dir = tmp_path / "kb"
    knowledge_dir.mkdir()
    bad_path = knowledge_dir / "bad.md"
    bad_path.write_text("# Bad\n\nUnreadable in test.", encoding="utf-8")
    (knowledge_dir / "good.md").write_text("# Good\n\nReadable.", encoding="utf-8")
    real_read_text = Path.read_text

    def selective_read(path, *args, **kwargs):
        if path == bad_path:
            raise OSError("synthetic read failure")
        return real_read_text(path, *args, **kwargs)

    monkeypatch.setattr(Path, "read_text", selective_read)

    documents = KnowledgeBaseLoader(knowledge_dir).load()

    assert [document.source for document in documents] == ["good.md"]


def test_loader_returns_empty_for_missing_directory(tmp_path):
    assert KnowledgeBaseLoader(tmp_path / "missing").load() == []
