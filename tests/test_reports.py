import re

import pytest


@pytest.mark.parametrize(
    ("language", "expected_title", "expected_section"),
    [
        ("zh", "CBT 心理记录报告", "心理测试结果"),
        ("en", "CBT Psychological Record", "Psychological Assessment Results"),
        ("ru", "Отчёт КПТ", "Психологические тесты"),
    ],
)
def test_txt_report_is_generated_in_each_supported_language(
    language,
    expected_title,
    expected_section,
    fastapi_client,
    seeded_storage,
    test_session_id,
):
    response = fastapi_client.get(
        f"/api/report/{test_session_id}",
        params={"lang": language},
    )

    assert response.status_code == 200
    assert response.headers["content-type"].startswith("text/plain")
    assert response.headers["content-disposition"].endswith(
        f"cbt_report_{test_session_id}.txt"
    )
    assert expected_title in response.text
    assert expected_section in response.text
    assert "GAD-7" in response.text
    assert "12" in response.text


def test_chinese_report_has_no_cyrillic_fallback(
    fastapi_client,
    seeded_storage,
    test_session_id,
):
    response = fastapi_client.get(
        f"/api/report/{test_session_id}",
        params={"lang": "zh"},
    )

    assert response.status_code == 200
    assert re.search(r"[А-Яа-яЁё]", response.text) is None


def test_invalid_report_language_falls_back_to_chinese(
    fastapi_client,
    test_session_id,
):
    response = fastapi_client.get(
        f"/api/report/{test_session_id}",
        params={"lang": "invalid"},
    )

    assert response.status_code == 200
    assert response.text.startswith("CBT 心理记录报告")
