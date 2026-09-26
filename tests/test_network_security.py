import pytest
from starlette.websockets import WebSocketDisconnect


def test_server_defaults_to_loopback_only():
    import backend.server as server

    assert server.APP_HOST == "127.0.0.1"
    assert server.APP_PORT == 8001
    assert "*" not in server.APP_ALLOWED_ORIGINS


def test_cors_allows_local_app_origin(fastapi_client):
    import backend.server as server

    origin = f"http://localhost:{server.APP_PORT}"
    response = fastapi_client.options(
        "/api/health",
        headers={
            "Origin": origin,
            "Access-Control-Request-Method": "GET",
        },
    )

    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == origin


def test_cors_rejects_untrusted_origin(fastapi_client):
    response = fastapi_client.options(
        "/api/health",
        headers={
            "Origin": "https://untrusted.example",
            "Access-Control-Request-Method": "GET",
        },
    )

    assert response.status_code == 400
    assert "access-control-allow-origin" not in response.headers


def test_http_rejects_untrusted_host(fastapi_client):
    response = fastapi_client.get(
        "/api/health", headers={"Host": "attacker.example"}
    )

    assert response.status_code == 400


def test_websocket_rejects_untrusted_origin(fastapi_client):
    with pytest.raises(WebSocketDisconnect) as exc_info:
        with fastapi_client.websocket_connect(
            "/ws/chat/security-session",
            headers={"Origin": "https://untrusted.example"},
        ):
            pass

    assert exc_info.value.code == 1008
