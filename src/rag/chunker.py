import re

from .models import KnowledgeChunk, KnowledgeDocument


HEADING_RE = re.compile(r"^(#{1,6})\s+(.+?)\s*$")


class TextChunker:
    """Markdown-section-aware character chunking that also works for CJK text."""

    def __init__(self, chunk_size: int = 1200, chunk_overlap: int = 150):
        if chunk_size < 100:
            raise ValueError("chunk_size must be at least 100 characters")
        if chunk_overlap < 0 or chunk_overlap >= chunk_size:
            raise ValueError("chunk_overlap must be between 0 and chunk_size - 1")
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap

    @staticmethod
    def _sections(document: KnowledgeDocument):
        if document.metadata.get("format") != "md":
            return [(document.title, document.text)]

        sections = []
        current_title = document.title
        current_lines = []
        for line in document.text.splitlines():
            heading = HEADING_RE.match(line.strip())
            if heading:
                content = "\n".join(current_lines).strip()
                if content:
                    sections.append((current_title, content))
                current_title = heading.group(2).strip()
                current_lines = []
            else:
                current_lines.append(line)
        content = "\n".join(current_lines).strip()
        if content:
            sections.append((current_title, content))
        return sections or [(document.title, document.text)]

    def chunk(self, documents: list[KnowledgeDocument]) -> list[KnowledgeChunk]:
        chunks = []
        for document in documents:
            chunk_index = 0
            for title, section_text in self._sections(document):
                start = 0
                while start < len(section_text):
                    end = min(start + self.chunk_size, len(section_text))
                    text = section_text[start:end].strip()
                    if text:
                        chunks.append(
                            KnowledgeChunk(
                                source=document.source,
                                title=title or document.title,
                                text=text,
                                chunk_index=chunk_index,
                                metadata=dict(document.metadata),
                            )
                        )
                        chunk_index += 1
                    if end >= len(section_text):
                        break
                    start = end - self.chunk_overlap
        return chunks
