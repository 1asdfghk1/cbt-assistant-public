import json


def _sse_events(response):
    return [
        json.loads(line.removeprefix("data: "))
        for line in response.text.splitlines()
        if line.startswith("data: ")
    ]


def test_chat_stream_completes_and_persists_clean_response(
    fastapi_client,
    fake_llm_client,
    override_db,
):
    fake_llm_client.queue_text("<think>internal</think>流式回复")

    response = fastapi_client.post(
        "/api/chat/stream",
        json={"session_id": "stream-session", "message": "开始流式聊天"},
    )

    assert response.status_code == 200
    events = _sse_events(response)
    done = next(event for event in events if event.get("done"))
    assert done["full_response"] == "流式回复"
    assert done["request_id"]
    assert override_db.get_history("stream-session")[-1]["content"] == "流式回复"


def test_websocket_completes_and_persists_clean_response(
    fastapi_client,
    fake_llm_client,
    override_db,
):
    fake_llm_client.queue_text("<think>internal</think>WebSocket 回复")

    with fastapi_client.websocket_connect("/ws/chat/websocket-session") as websocket:
        websocket.send_json({"type": "message", "content": "开始 WebSocket 聊天"})
        token_event = websocket.receive_json()
        done_event = websocket.receive_json()

    assert token_event["type"] == "token"
    assert done_event["type"] == "done"
    assert done_event["content"] == "WebSocket 回复"
    assert done_event["request_id"]
    assert override_db.get_history("websocket-session")[-1]["content"] == "WebSocket 回复"
