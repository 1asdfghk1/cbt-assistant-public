"""Deterministic offline retrieval evaluation; never calls DeepSeek or a live embedder."""

import argparse
import asyncio
import json
import sys
import tempfile
from collections import defaultdict
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parent.parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from src.rag import EmbeddingProvider, RAGService, RAGSettings  # noqa: E402
from src.tools import select_forced_tool  # noqa: E402


CONCEPT_ALIASES = {
    "automatic_thoughts": ("什么是自动化思维", "автоматическая мысль", "автоматических мыслей"),
    "cognitive_restructuring": ("认知重构", "когнитивная реструктуризация"),
    "catastrophizing": ("灾难化", "катастрофизация", "катастрофизации"),
    "cognitive_triangle": ("认知三角", "мысли влияют на эмоции и поведение"),
    "thought_record": ("记录自动化思维", "дневник мыслей", "запись мыслей"),
    "cognitive_distortions": ("认知偏差", "когнитивные искажения", "когнитивных искажений"),
    "behavioral_experiment": ("行为实验", "поведенческие эксперименты"),
    "problem_solving": ("解决问题", "решение проблем", "решения проблем"),
    "sleep_mood": ("睡眠为什么会影响情绪", "сон и депрессия"),
    "insomnia_anxiety": ("失眠和焦虑", "бессонниц", "тревог"),
    "stimulus_control": ("刺激控制", "контроль стимулов"),
    "sleep_restriction": ("睡眠限制", "ограничение сна", "рестрикция сна"),
    "behavioral_activation": ("行为激活", "поведенческая активация"),
    "small_steps": ("从小活动开始", "маленьких, достижимых шагов"),
    "activity_mood": ("活动和情绪", "активность → настроение"),
    "mindfulness": ("正念", "осознанность", "mindfulness"),
}


class OfflineEvaluationEmbeddingProvider(EmbeddingProvider):
    """Transparent multilingual concept vectors for repeatable pipeline evaluation."""

    provider_name = "offline-evaluation"
    model = "curated-concept-v1"

    def _embed(self, text: str) -> list[float]:
        normalized = text.lower()
        return [
            1.0 if any(alias.lower() in normalized for alias in aliases) else 0.0
            for aliases in CONCEPT_ALIASES.values()
        ]

    async def embed_texts(self, texts: list[str]) -> list[list[float]]:
        return [self._embed(text) for text in texts]


def load_cases(path: Path) -> list[dict]:
    return json.loads(path.read_text(encoding="utf-8"))


async def evaluate(
    *,
    cases_path: Path,
    knowledge_base_dir: Path,
    top_k: int = 3,
    threshold: float = 0.55,
) -> dict:
    cases = load_cases(cases_path)
    with tempfile.TemporaryDirectory(prefix="cbt-rag-evaluation-") as cache_dir:
        settings = RAGSettings(
            enabled=True,
            knowledge_base_dir=knowledge_base_dir,
            cache_dir=Path(cache_dir),
            embedding_provider="offline-evaluation",
            embedding_model=OfflineEvaluationEmbeddingProvider.model,
            embedding_base_url="offline",
            embedding_api_key=None,
            top_k=top_k,
            score_threshold=threshold,
            max_context_chars=4000,
            chunk_size=1200,
            chunk_overlap=150,
        )
        service = RAGService(settings, OfflineEvaluationEmbeddingProvider())
        if not await service.initialize():
            raise RuntimeError(f"RAG evaluation index unavailable: {service.last_error}")

        relevant = 0
        top1_hits = 0
        topk_hits = 0
        false_positives = 0
        false_negatives = 0
        non_retrieval_cases = 0
        personal_total = 0
        personal_routing_hits = 0
        failures = []
        categories = defaultdict(lambda: {"total": 0, "passed": 0})

        for case in cases:
            category = case["category"]
            categories[category]["total"] += 1
            passed = False

            if case.get("should_use_tool"):
                personal_total += 1
                actual_tool = select_forced_tool(case["query"])
                passed = actual_tool == case["expected_tool"]
                if passed:
                    personal_routing_hits += 1
                else:
                    failures.append(
                        {
                            "id": case["id"],
                            "reason": "personal_route",
                            "expected": case["expected_tool"],
                            "actual": actual_tool,
                        }
                    )
            else:
                results = await service.retrieve(case["query"], top_k=top_k)
                sources = [result.chunk.source for result in results]
                if case.get("should_retrieve"):
                    relevant += 1
                    expected = set(case["expected_sources"])
                    top1 = bool(sources and sources[0] in expected)
                    topk = bool(expected.intersection(sources))
                    top1_hits += int(top1)
                    topk_hits += int(topk)
                    if not results:
                        false_negatives += 1
                    passed = topk
                    if not passed:
                        failures.append(
                            {
                                "id": case["id"],
                                "reason": "retrieval_miss",
                                "expected": sorted(expected),
                                "actual": sources,
                            }
                        )
                else:
                    non_retrieval_cases += 1
                    passed = not results
                    if results:
                        false_positives += 1
                        failures.append(
                            {
                                "id": case["id"],
                                "reason": "false_positive",
                                "actual": sources,
                            }
                        )

            categories[category]["passed"] += int(passed)

        return {
            "total": len(cases),
            "relevant": relevant,
            "top1_hits": top1_hits,
            "top1_rate": top1_hits / relevant if relevant else 0.0,
            "topk_hits": topk_hits,
            "topk_rate": topk_hits / relevant if relevant else 0.0,
            "false_positives": false_positives,
            "false_positive_total": non_retrieval_cases,
            "false_negatives": false_negatives,
            "personal_routing_hits": personal_routing_hits,
            "personal_routing_total": personal_total,
            "categories": dict(categories),
            "failures": failures,
            "configuration": {
                "provider": OfflineEvaluationEmbeddingProvider.provider_name,
                "model": OfflineEvaluationEmbeddingProvider.model,
                "top_k": top_k,
                "threshold": threshold,
                "chunk_size": 1200,
                "chunk_overlap": 150,
                "max_context_chars": 4000,
            },
        }


def print_report(result: dict) -> None:
    print(f"Total cases: {result['total']}")
    print(
        f"Top-1 hit: {result['top1_hits']}/{result['relevant']} "
        f"({result['top1_rate']:.1%})"
    )
    print(
        f"Top-{result['configuration']['top_k']} hit: "
        f"{result['topk_hits']}/{result['relevant']} ({result['topk_rate']:.1%})"
    )
    print(
        f"False positives: {result['false_positives']}/"
        f"{result['false_positive_total']}"
    )
    print(f"False negatives: {result['false_negatives']}/{result['relevant']}")
    print(
        f"Personal-data routes: {result['personal_routing_hits']}/"
        f"{result['personal_routing_total']}"
    )
    print("By category:")
    for name, metrics in sorted(result["categories"].items()):
        print(f"  {name}: {metrics['passed']}/{metrics['total']}")
    if result["failures"]:
        print("Failures:")
        for failure in result["failures"]:
            print(f"  {failure['id']}: {failure['reason']} -> {failure.get('actual')}")
    else:
        print("Failures: none")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--cases",
        type=Path,
        default=PROJECT_ROOT / "tests" / "fixtures" / "rag_eval_cases.json",
    )
    parser.add_argument(
        "--knowledge-base",
        type=Path,
        default=PROJECT_ROOT / "knowledge_base",
    )
    parser.add_argument("--top-k", type=int, default=3)
    parser.add_argument("--threshold", type=float, default=0.55)
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    result = asyncio.run(
        evaluate(
            cases_path=args.cases,
            knowledge_base_dir=args.knowledge_base,
            top_k=max(1, min(args.top_k, 10)),
            threshold=max(-1.0, min(args.threshold, 1.0)),
        )
    )
    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        print_report(result)
    return 0 if not result["failures"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
