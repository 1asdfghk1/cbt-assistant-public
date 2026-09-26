import json

import pytest

from src.safety import assess_crisis


def _sse_events(response):
    return [
        json.loads(line.removeprefix("data: "))
        for line in response.text.splitlines()
        if line.startswith("data: ")
    ]


@pytest.mark.parametrize(
    ("message", "language", "expected_level"),
    [
        ("我已经准备好药了，今晚要结束自己的生命。", "zh", "imminent"),
        ("我不想活了，觉得大家没有我会更好。", "zh-CN", "concern"),
        ("I have a plan to kill myself tonight.", "en", "imminent"),
        ("I wish I were dead.", "en-US", "concern"),
        ("Я планирую покончить с собой сегодня.", "ru", "imminent"),
        ("Я не хочу жить.", "ru-RU", "concern"),
    ],
)
def test_assess_crisis_detects_multilingual_first_person_risk(
    message,
    language,
    expected_level,
):
    result = assess_crisis(message, language)

    assert result is not None
    assert result.level == expected_level
    assert result.response


@pytest.mark.parametrize(
    "message",
    [
        "我没有想自杀，只是今天很累。",
        "如何帮助有自杀想法的朋友？",
        "I am not suicidal; I want general information about prevention.",
        "Я не планирую покончить с собой.",
        "今天心情不太好。",
    ],
)
def test_assess_crisis_does_not_hijack_explicitly_negated_or_general_text(message):
    assert assess_crisis(message, "zh") is None


def test_http_chat_crisis_route_skips_llm_and_persists_fixed_response(
    fastapi_client,
    fake_llm_client,
    override_db,
):
    response = fastapi_client.post(
        "/api/chat",
        json={
            "session_id": "crisis-http",
            "message": "我不想活了。",
            "language": "zh",
        },
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["safety"] == {"routed": True, "level": "concern"}
    assert "当地急救" in payload["response"]
    assert fake_llm_client.call_count == 0
    history = override_db.get_history("crisis-http")
    assert [item["role"] for item in history] == ["user", "assistant"]
    assert history[-1]["content"] == payload["response"]


def test_sse_crisis_route_skips_llm_and_returns_terminal_safety_event(
    fastapi_client,
    fake_llm_client,
    override_db,
):
    response = fastapi_client.post(
        "/api/chat/stream",
        json={
            "session_id": "crisis-sse",
            "message": "I have a plan to kill myself tonight.",
            "language": "en",
        },
    )

    assert response.status_code == 200
    events = _sse_events(response)
    assert len(events) == 1
    assert events[0]["done"] is True
    assert events[0]["safety"] == {"routed": True, "level": "imminent"}
    assert "emergency" in events[0]["full_response"].lower()
    assert fake_llm_client.call_count == 0
    assert override_db.get_history("crisis-sse")[-1]["role"] == "assistant"


def test_websocket_crisis_route_skips_llm_and_returns_safety_metadata(
    fastapi_client,
    fake_llm_client,
    override_db,
):
    with fastapi_client.websocket_connect("/ws/chat/crisis-websocket") as websocket:
        websocket.send_json(
            {
                "type": "message",
                "content": "Я не хочу жить.",
                "language": "ru",
            }
        )
        token_event = websocket.receive_json()
        done_event = websocket.receive_json()

    assert token_event["type"] == "token"
    assert done_event["type"] == "done"
    assert done_event["safety"] == {"routed": True, "level": "concern"}
    assert fake_llm_client.call_count == 0
    assert override_db.get_history("crisis-websocket")[-1]["role"] == "assistant"
