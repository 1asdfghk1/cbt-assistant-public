import pytest


@pytest.mark.parametrize(
    ("kind", "expected_status"),
    [
        ("timeout", 504),
        ("connection", 503),
        ("authentication", 503),
        ("rate_limit", 429),
        ("upstream", 502),
    ],
)
def test_chat_returns_safe_categorized_deepseek_errors(
    kind,
    expected_status,
    fastapi_client,
    fake_llm_client,
):
    fake_llm_client.queue_error(kind)

    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": f"error-{kind}", "message": "trigger fake error"},
    )

    assert response.status_code == expected_status
    detail = response.json()["detail"]
    assert detail["code"] == kind
    assert detail["request_id"] == response.headers["x-request-id"]
    assert "traceback" not in response.text.lower()
    assert "api key" not in response.text.lower() or kind == "authentication"


def test_chat_empty_response_uses_stable_error_contract(
    fastapi_client,
    fake_llm_client,
    override_db,
):
    fake_llm_client.queue({"content": "", "tool_calls": []})

    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": "empty-response", "message": "hello"},
    )

    assert response.status_code == 502
    assert response.json()["detail"]["code"] == "empty_response"
    assert override_db.get_history("empty-response") == []


@pytest.mark.parametrize("malformed", [None, [], {"unexpected": "shape"}])
def test_chat_malformed_response_is_contained(
    malformed,
    fastapi_client,
    fake_llm_client,
):
    fake_llm_client.queue(malformed)

    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": "malformed-response", "message": "hello"},
    )

    assert response.status_code in {500, 502}
    detail = response.json()["detail"]
    assert detail["code"] in {"internal_error", "empty_response"}
    assert "unexpected" not in detail["message"].lower()


def test_chat_unexpected_exception_does_not_leak_details(
    fastapi_client,
    fake_llm_client,
):
    fake_llm_client.queue(RuntimeError("private path and secret token"))

    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": "unexpected-error", "message": "hello"},
    )

    assert response.status_code == 500
    assert response.json()["detail"]["code"] == "internal_error"
    assert "private path" not in response.text
    assert "secret token" not in response.text


def test_tool_failure_is_sent_safely_to_second_round_llm(
    fastapi_client,
    fake_llm_client,
    override_db,
    monkeypatch,
):
    fake_llm_client.queue_tool_call(
        "get_user_test_results",
        call_id="failed-tool-call",
    ).queue_text("测试工具暂时不可用，但聊天仍可继续。")
    monkeypatch.setattr(
        override_db,
        "get_tests",
        lambda session_id: (_ for _ in ()).throw(RuntimeError("private db failure")),
    )

    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": "tool-failure", "message": "我最近的 GAD-7 是多少？"},
    )

    assert response.status_code == 200
    assert fake_llm_client.call_count == 2
    tool_message = next(
        item
        for item in fake_llm_client.calls[1]["messages"]
        if item["role"] == "tool"
    )
    assert "tool_execution_error" in tool_message["content"]
    assert "private db failure" not in tool_message["content"]
    assert "private db failure" not in response.text
