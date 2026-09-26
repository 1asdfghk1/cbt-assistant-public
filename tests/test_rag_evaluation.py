import pytest

from scripts.evaluate_rag import evaluate, load_cases


def test_evaluation_dataset_has_required_categories_and_size():
    from pathlib import Path

    project_root = Path(__file__).resolve().parent.parent
    cases = load_cases(project_root / "tests" / "fixtures" / "rag_eval_cases.json")
    categories = {case["category"] for case in cases}

    assert 15 <= len(cases) <= 30
    assert categories == {
        "cbt_core",
        "sleep",
        "behavior_activation",
        "out_of_domain",
        "personal_data",
    }
    assert all("query" in case and "should_retrieve" in case for case in cases)


@pytest.mark.asyncio
async def test_offline_evaluation_has_no_false_positive_or_personal_route_leak():
    from pathlib import Path

    project_root = Path(__file__).resolve().parent.parent
    result = await evaluate(
        cases_path=project_root / "tests" / "fixtures" / "rag_eval_cases.json",
        knowledge_base_dir=project_root / "knowledge_base",
        top_k=3,
        threshold=0.55,
    )

    assert result["total"] == 24
    assert result["false_positives"] == 0
    assert result["personal_routing_hits"] == result["personal_routing_total"]
    assert result["topk_rate"] >= 0.80
