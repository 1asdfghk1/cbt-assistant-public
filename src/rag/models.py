from dataclasses import asdict, dataclass, field


@dataclass(frozen=True)
class KnowledgeDocument:
    source: str
    text: str
    title: str = ""
    metadata: dict = field(default_factory=dict)


@dataclass(frozen=True)
class KnowledgeChunk:
    source: str
    title: str
    text: str
    chunk_index: int
    metadata: dict = field(default_factory=dict)

    def to_dict(self) -> dict:
        return asdict(self)

    @classmethod
    def from_dict(cls, value: dict):
        return cls(
            source=value["source"],
            title=value.get("title", ""),
            text=value["text"],
            chunk_index=int(value["chunk_index"]),
            metadata=dict(value.get("metadata", {})),
        )

    def embedding_text(self) -> str:
        return f"{self.title}\n{self.text}" if self.title else self.text


@dataclass(frozen=True)
class RetrievalResult:
    chunk: KnowledgeChunk
    score: float

    def to_dict(self) -> dict:
        return {
            "text": self.chunk.text,
            "source": self.chunk.source,
            "title": self.chunk.title,
            "chunk_index": self.chunk.chunk_index,
            "score": self.score,
            "metadata": dict(self.chunk.metadata),
        }

    def to_legacy_dict(self) -> dict:
        return {
            "chunk": {
                "title": self.chunk.title,
                "content": self.chunk.text,
                "source": self.chunk.source,
                "chunk_index": self.chunk.chunk_index,
            },
            "score": self.score,
        }
