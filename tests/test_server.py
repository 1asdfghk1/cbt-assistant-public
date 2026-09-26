import pytest
from unittest.mock import patch, AsyncMock
from fastapi.testclient import TestClient

import sys
from pathlib import Path

# Add project root to sys.path so we can import from backend and src
sys.path.insert(0, str(Path(__file__).parent.parent))

from backend.server import app
from src.llm.deepseek_client import DeepSeekError

# We use the FastAPI TestClient
client = TestClient(app)

def test_sync_endpoints(override_db):
    session_id = "test_sync_endpoint"
    
    # Sync Sleeps
    sleep_payload = {
        "session_id": session_id,
        "items": [
            {"bed": "23:00", "wake": "07:00", "awk": 1, "qual": 8, "notes": "good", "durHrs": "8.0", "isoDate": "2026-03-03T20:00:00.000Z"}
        ]
    }
    response = client.post("/api/sync/sleep", json=sleep_payload)
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    
    # Sync Tests
    test_payload = {
        "session_id": session_id,
        "items": [
            {"name": "PHQ-9", "score": 10, "level": "Умеренная", "date": "2026"}
        ]
    }
    response = client.post("/api/sync/tests", json=test_payload)
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    
    # Sync Activities
    act_payload = {
        "session_id": session_id,
        "items": [
            {"text": "Walk the dog", "done": True, "isoDate": "2026"}
        ]
    }
    response = client.post("/api/sync/activities", json=act_payload)
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    
    # Verify in DB
    activities = override_db.get_activities(session_id)
    assert len(activities) == 1
    assert activities[0]["activity_text"] == "Walk the dog"

def test_mood_endpoint(override_db):
    session_id = "test_mood_endpoint"
    mood_payload = {
        "session_id": session_id,
        "score": 9,
        "note": "Happy test"
    }
    response = client.post("/api/mood", json=mood_payload)
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    
    # Get mood
    response = client.get(f"/api/mood/{session_id}")
    assert response.status_code == 200
    moods = response.json()["mood_log"]
    assert len(moods) == 1
    assert moods[0]["score"] == 9
    assert moods[0]["note"] == "Happy test"

def test_thought_record_endpoint(override_db):
    session_id = "test_thought_endpoint"
    tr_payload = {
        "session_id": session_id,
        "situation": "Testing API",
        "thought": "It will fail",
        "emotion": "Anxiety",
        "intensity": 6,
        "distortion": "Fortune Telling",
        "rational_response": "It's just code"
    }
    response = client.post("/api/thoughts", json=tr_payload)
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    
    # Get thoughts
    session_data = client.get(f"/api/session/{session_id}").json()
    trs = session_data["thought_records"]
    assert len(trs) == 1
    assert trs[0]["situation"] == "Testing API"

def test_update_thought_record_endpoint(override_db):
    session_id = "test_thought_update_endpoint"
    thought_id = override_db.add_thought_record(
        session_id,
        "Before",
        "Old thought",
        "Anxiety",
        6,
        "Fortune Telling",
        "It's just code",
    )

    tr_payload = {
        "session_id": session_id,
        "situation": "After",
        "thought": "New thought",
        "emotion": "Calm",
        "intensity": 3,
        "distortion": "Не знаю",
        "rational_response": "Updated response",
    }
    response = client.put(f"/api/thoughts/{thought_id}", json=tr_payload)
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

    session_data = client.get(f"/api/session/{session_id}").json()
    trs = session_data["thought_records"]
    assert len(trs) == 1
    assert trs[0]["id"] == thought_id
    assert trs[0]["situation"] == "After"
    assert trs[0]["thought"] == "New thought"

@patch("backend.server.llm_client.chat", new_callable=AsyncMock)
def test_chat_endpoint(mock_chat, override_db):
    session_id = "test_chat_endpoint"
    mock_chat.return_value = {"content": "Mocked response", "tool_calls": []}
    
    chat_payload = {
        "session_id": session_id,
        "message": "Hello there"
    }
    response = client.post("/api/chat", json=chat_payload)
    assert response.status_code == 200
    data = response.json()
    assert data["response"] == "Mocked response"
    assert data["session_id"] == session_id
    
    # Check history is saved
    history = override_db.get_history(session_id)
    assert len(history) == 2  # user and assistant
    assert history[0]["role"] == "user"
    assert history[0]["content"] == "Hello there"
    assert history[1]["role"] == "assistant"
    assert history[1]["content"] == "Mocked response"

@patch("backend.server.llm_client.chat", new_callable=AsyncMock)
def test_chat_add_activity_tool(mock_chat, override_db):
    session_id = "test_chat_add_activity"
    
    # We mock the first call to return a tool call
    mock_chat.side_effect = [
        {
            "content": "",
            "tool_calls": [
                {
                    "function": {
                        "name": "add_user_activity",
                        "arguments": {"activity_text": "Выпить стакан воды"}
                    }
                }
            ]
        },
        {
            "content": "Я добавил активность в ваш список.",
            "tool_calls": []
        }
    ]
    
    chat_payload = {
        "session_id": session_id,
        "message": "帮我添加一个活动：Выпить стакан воды"
    }
    
    response = client.post("/api/chat", json=chat_payload)
    assert response.status_code == 200
    data = response.json()
    assert data["response"] == "Я добавил активность в ваш список."
    assert "client_events" in data
    
    events = data["client_events"]
    assert len(events) == 1
    assert events[0]["type"] == "add_activity"
    assert events[0]["text"] == "Выпить стакан воды"
    assert mock_chat.await_args_list[0].kwargs["tools"] is not None
    assert mock_chat.await_args_list[0].kwargs["tool_choice"] == "auto"
    assert mock_chat.await_args_list[1].kwargs["tools"] is None


@patch("backend.server.llm_client.chat", new_callable=AsyncMock)
def test_chat_returns_safe_categorized_llm_error(mock_chat, override_db):
    mock_chat.side_effect = DeepSeekError(
        "timeout",
        "AI 服务响应超时，请稍后重试。",
        status_code=504,
    )

    response = client.post(
        "/api/chat",
        json={"session_id": "timeout-test", "message": "Hello"},
    )

    assert response.status_code == 504
    detail = response.json()["detail"]
    assert detail["code"] == "timeout"
    assert detail["message"] == "AI 服务响应超时，请稍后重试。"
    assert detail["request_id"] == response.headers["x-request-id"]


@patch("backend.server.llm_client.chat", new_callable=AsyncMock)
def test_chat_rejects_empty_content(mock_chat, override_db):
    mock_chat.return_value = {"content": "", "tool_calls": []}

    response = client.post(
        "/api/chat",
        json={"session_id": "empty-test", "message": "Hello"},
    )

    assert response.status_code == 502
    assert response.json()["detail"]["code"] == "empty_response"
    assert override_db.get_history("empty-test") == []


@patch("backend.server.llm_client.chat", new_callable=AsyncMock)
def test_chat_isolates_tool_failure(mock_chat, override_db):
    mock_chat.side_effect = [
        {
            "content": "",
            "tool_calls": [
                {
                    "id": "call-1",
                    "function": {
                        "name": "get_user_sleep_history",
                        "arguments": '{"days": 7}',
                    },
                }
            ],
        },
        {"content": "暂时无法读取睡眠记录，但我们仍可以讨论睡眠改善方法。"},
    ]

    with patch.object(
        override_db,
        "get_sleep_logs",
        side_effect=RuntimeError("database unavailable"),
    ):
        response = client.post(
            "/api/chat",
            json={"session_id": "tool-failure-test", "message": "看看我的睡眠"},
        )

    assert response.status_code == 200
    assert "暂时无法读取" in response.json()["response"]
    assert mock_chat.await_count == 2
    second_round_messages = mock_chat.await_args_list[1].args[0]
    tool_message = next(msg for msg in second_round_messages if msg["role"] == "tool")
    assert "temporarily unavailable" in tool_message["content"]


@patch("backend.server.llm_client.chat", new_callable=AsyncMock)
def test_chat_preserves_forced_test_tool(mock_chat, override_db):
    mock_chat.side_effect = [
        {
            "content": "",
            "tool_calls": [
                {
                    "id": "call-test-results",
                    "function": {
                        "name": "get_user_test_results",
                        "arguments": "{}",
                    },
                }
            ],
        },
        {"content": "你的最近一次 GAD-7 结果来自数据库。", "tool_calls": []},
    ]

    response = client.post(
        "/api/chat",
        json={"session_id": "forced-test", "message": "我最近的 GAD-7 是多少？"},
    )

    assert response.status_code == 200
    first_call = mock_chat.await_args_list[0]
    second_call = mock_chat.await_args_list[1]
    assert first_call.kwargs["tool_choice"] == {
        "type": "function",
        "function": {"name": "get_user_test_results"},
    }
    assert first_call.kwargs["tools"] is not None
    assert second_call.kwargs["tools"] is None


@patch("backend.server.llm_client.chat", new_callable=AsyncMock)
def test_chat_does_not_force_tool_for_ordinary_message(mock_chat, override_db):
    mock_chat.return_value = {
        "content": "听起来你今天有些难受。",
        "tool_calls": [],
    }

    response = client.post(
        "/api/chat",
        json={"session_id": "ordinary-chat", "message": "今天心情不太好。"},
    )

    assert response.status_code == 200
    assert mock_chat.await_count == 1
    assert mock_chat.await_args.kwargs["tool_choice"] == "auto"
    assert mock_chat.await_args.kwargs["tools"] is not None


@patch("backend.server.llm_client.chat", new_callable=AsyncMock)
def test_chat_allows_recommend_test_action_tool(mock_chat, override_db):
    mock_chat.side_effect = [
        {
            "content": "",
            "tool_calls": [
                {
                    "id": "call-recommend-test",
                    "function": {
                        "name": "recommend_test",
                        "arguments": '{"test_type": "GAD-7"}',
                    },
                }
            ],
        },
        {"content": "可以先完成 GAD-7 测评。", "tool_calls": []},
    ]

    response = client.post(
        "/api/chat",
        json={
            "session_id": "recommend-test",
            "message": "我最近很焦虑，我应该做什么心理测试？",
        },
    )

    assert response.status_code == 200
    assert mock_chat.await_args_list[0].kwargs["tool_choice"] == "auto"
    assert response.json()["client_events"] == [
        {"type": "open_test", "test_type": "GAD-7"}
    ]


@patch("backend.server.llm_client.chat", new_callable=AsyncMock)
def test_insights_does_not_receive_chat_tool_state(mock_chat):
    mock_chat.return_value = {"content": "A gentle observation."}

    response = client.post(
        "/api/insights",
        json={
            "session_id": "insights-tool-state",
            "lang": "en",
            "mood_log": [{"date": "2026-08-20", "score": 6}],
        },
    )

    assert response.status_code == 200
    assert response.json()["insights"] == "A gentle observation."
    assert "tools" not in mock_chat.await_args.kwargs
    assert "tool_choice" not in mock_chat.await_args.kwargs
