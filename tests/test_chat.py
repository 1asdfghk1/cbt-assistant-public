import pytest

from tests.fakes import tool_message_from


def test_ordinary_chat_uses_fake_llm_without_forcing_a_tool(
    fastapi_client,
    fake_llm_client,
    override_db,
):
    fake_llm_client.queue_text("测试普通回复")

    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": "ordinary-session", "message": "今天心情不太好。"},
    )

    assert response.status_code == 200
    assert response.json()["response"] == "测试普通回复"
    assert fake_llm_client.call_count == 1
    assert fake_llm_client.calls[0]["tool_choice"] == "auto"
    assert fake_llm_client.calls[0]["tools"]
    assert [item["role"] for item in override_db.get_history("ordinary-session")] == [
        "user",
        "assistant",
    ]


@pytest.mark.parametrize(
    ("message", "expected_tool"),
    [
        ("我最近的 GAD-7 是多少？", "get_user_test_results"),
        ("看看我最近的睡眠。", "get_user_sleep_history"),
        ("我最近记录了哪些活动？", "get_user_activities"),
    ],
)
def test_chat_preserves_forced_tool_choice(
    message,
    expected_tool,
    fastapi_client,
    fake_llm_client,
):
    fake_llm_client.queue_text("forced route recorded")

    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": "forced-route", "message": message},
    )

    assert response.status_code == 200
    assert fake_llm_client.calls[0]["tool_choice"] == {
        "type": "function",
        "function": {"name": expected_tool},
    }


def test_two_round_tool_result_is_passed_back_and_tools_are_disabled(
    fastapi_client,
    fake_llm_client,
    override_db,
    test_session_id,
    sample_test_results,
):
    override_db.sync_test_results(test_session_id, sample_test_results)
    fake_llm_client.queue_tool_call("get_user_test_results").queue_text(
        "你最近的 GAD-7 得分是12分。"
    )

    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": test_session_id, "message": "我最近的 GAD-7 是多少？"},
    )

    assert response.status_code == 200
    assert response.json()["response"].endswith("12分。")
    assert fake_llm_client.call_count == 2
    assert fake_llm_client.calls[0]["tools"]
    assert fake_llm_client.calls[1]["tools"] is None
    assert "tool_choice" in fake_llm_client.calls[1]

    tool_message = tool_message_from(fake_llm_client.calls[1])
    assert tool_message["tool_call_id"] == "fake-tool-call-1"
    assert "GAD-7" in tool_message["content"]
    assert '"score": 12' in tool_message["content"]


@pytest.mark.parametrize(
    ("language", "instruction_fragment"),
    [
        ("zh", "始终使用中文"),
        ("en", "Reply in English only"),
        ("ru", "только на русском языке"),
    ],
)
def test_chat_language_is_injected_into_system_prompt(
    language,
    instruction_fragment,
    fastapi_client,
    fake_llm_client,
):
    fake_llm_client.queue_text(f"{language} test response")

    response = fastapi_client.post(
        "/api/chat",
        json={
            "session_id": f"language-{language}",
            "message": "language contract",
            "language": language,
        },
    )

    assert response.status_code == 200
    system_message = fake_llm_client.calls[0]["messages"][0]
    assert system_message["role"] == "system"
    assert instruction_fragment in system_message["content"]


def test_chat_uses_default_session_when_session_id_is_omitted(
    fastapi_client,
    fake_llm_client,
    override_db,
):
    fake_llm_client.queue_text("default session response")

    response = fastapi_client.post("/api/chat", json={"message": "hello"})

    assert response.status_code == 200
    assert response.json()["session_id"] == "default"
    assert len(override_db.get_history("default")) == 2


def test_chat_rejects_a_missing_message(fastapi_client):
    response = fastapi_client.post("/api/chat", json={"session_id": "missing-message"})

    assert response.status_code == 422


def test_chat_rejects_an_empty_message(
    fastapi_client,
    fake_llm_client,
    override_db,
):
    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": "empty-message", "message": ""},
    )

    assert response.status_code == 422
    assert fake_llm_client.calls == []
    assert override_db.get_history("empty-message") == []

def test_chat_rejects_a_whitespace_only_message(
    fastapi_client,
    fake_llm_client,
    override_db,
):


    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": "whitespace-message", "message": "   "},
    )

    assert response.status_code == 422
    assert fake_llm_client.calls == []
    assert override_db.get_history("whitespace-message") == []

def test_chat_trims_surrounding_whitespace_before_processing(
    fastapi_client,
    fake_llm_client,
    override_db,
):
    fake_llm_client.queue_text("测试正常回复")

    response = fastapi_client.post(
        "/api/chat",
        json={
            "session_id": "trimmed-message",
            "message": "  今天心情不太好。 \n",
        },
    )

    assert response.status_code == 200
    assert fake_llm_client.calls[0]["messages"][-1] == {
        "role": "user",
        "content": "今天心情不太好。",
    }
    assert override_db.get_history("trimmed-message")[0]["content"] == (
        "今天心情不太好。"
    )

def test_chat_tool_round_guard_prevents_an_infinite_loop(
    fastapi_client,
    fake_llm_client,
    override_db,
):
    for index in range(5):
        fake_llm_client.queue_tool_call(
            "unknown_tool_xyz",
            call_id=f"loop-call-{index}",
        )

    response = fastapi_client.post(
        "/api/chat",
        json={"session_id": "tool-loop", "message": "loop guard"},
    )

    assert response.status_code == 200
    assert response.json()["client_events"] == []
    assert "工具调用次数过多" in response.json()["response"]
    assert fake_llm_client.call_count == 5
    assert fake_llm_client.calls[0]["tools"]
    assert all(call["tools"] is None for call in fake_llm_client.calls[1:])
    assert override_db.get_history("tool-loop") == []

def test_chat_rejects_an_unsupported_language(
    fastapi_client,
    fake_llm_client,
    override_db,
):


    response = fastapi_client.post(
        "/api/chat",
        json={
            "session_id": "unsupported-language",
            "message": "Hello",
            "language": "de",
        },
    )

    assert response.status_code == 422
    assert fake_llm_client.calls == []
    assert override_db.get_history("unsupported-language") == []