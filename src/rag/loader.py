import logging
from pathlib import Path

from .models import KnowledgeDocument


logger = logging.getLogger(__name__)


class KnowledgeBaseLoader:
    """Load small local text knowledge bases without one bad file stopping the rest."""

    SUPPORTED_SUFFIXES = {".md", ".txt"}
    IGNORED_NAME_PARTS = ("backup", ".bak", ".tmp", "~")

    def __init__(self, knowledge_base_dir: Path):
        self.knowledge_base_dir = Path(knowledge_base_dir)

    @classmethod
    def _is_supported(cls, path: Path) -> bool:
        if path.suffix.lower() not in cls.SUPPORTED_SUFFIXES:
            return False
        if any(part.startswith(".") for part in path.parts):
            return False
        lowered = path.name.lower()
        return not any(part in lowered for part in cls.IGNORED_NAME_PARTS)

    @staticmethod
    def _title_from_text(path: Path, text: str) -> str:
        if path.suffix.lower() == ".md":
            for line in text.splitlines():
                stripped = line.strip()
                if stripped.startswith("#"):
                    return stripped.lstrip("#").strip()
        return path.stem.replace("_", " ")

    def load(self) -> list[KnowledgeDocument]:
        if not self.knowledge_base_dir.exists():
            logger.warning(
                "rag_knowledge_base_missing directory=%s",
                self.knowledge_base_dir,
            )
            return []

        documents = []
        for path in sorted(self.knowledge_base_dir.rglob("*")):
            if not path.is_file():
                continue
            try:
                relative = path.relative_to(self.knowledge_base_dir)
            except ValueError:
                continue
            if not self._is_supported(relative):
                continue

            try:
                text = path.read_text(encoding="utf-8").strip()
            except (OSError, UnicodeError) as error:
                logger.warning(
                    "rag_document_skipped source=%s error_type=%s",
                    relative.as_posix(),
                    type(error).__name__,
                )
                continue
            if not text:
                logger.info("rag_document_empty source=%s", relative.as_posix())
                continue

            documents.append(
                KnowledgeDocument(
                    source=relative.as_posix(),
                    text=text,
                    title=self._title_from_text(path, text),
                    metadata={"format": path.suffix.lower().lstrip(".")},
                )
            )

        logger.info("rag_documents_loaded count=%s", len(documents))
        return documents
