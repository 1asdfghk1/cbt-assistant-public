from types import SimpleNamespace
from unittest.mock import AsyncMock

import httpx
import pytest
from openai import (
    APIConnectionError,
    APIStatusError,
    APITimeoutError,
    AuthenticationError,
    RateLimitError,
)

from src.llm.deepseek_client import DeepSeekClient, DeepSeekError


def _completion(content="ok"):
    message = SimpleNamespace(content=content, tool_calls=None)
    return SimpleNamespace(choices=[SimpleNamespace(message=message)])


@pytest.mark.asyncio
async def test_chat_retries_one_transient_connection_error():
    client = DeepSeekClient(
        "test-key",
        max_attempts=2,
        retry_delay_seconds=0,
    )
    request = httpx.Request("POST", "https://api.deepseek.com/chat/completions")
    create = AsyncMock(
        side_effect=[APIConnectionError(request=request), _completion("recovered")]
    )
    client.client.chat.completions.create = create

    result = await client.chat([{"role": "user", "content": "hello"}])

    assert result["content"] == "recovered"
    assert create.await_count == 2


@pytest.mark.asyncio
async def test_chat_retries_one_transient_503():
    client = DeepSeekClient(
        "test-key",
        max_attempts=2,
        retry_delay_seconds=0,
    )
    request = httpx.Request("POST", "https://api.deepseek.com/chat/completions")
    response = httpx.Response(503, request=request)
    create = AsyncMock(
        side_effect=[
            APIStatusError("service unavailable", response=response, body=None),
            _completion("recovered"),
        ]
    )
    client.client.chat.completions.create = create

    result = await client.chat([{"role": "user", "content": "hello"}])

    assert result["content"] == "recovered"
    assert create.await_count == 2


@pytest.mark.asyncio
async def test_chat_does_not_retry_authentication_errors():
    client = DeepSeekClient(
        "test-key",
        max_attempts=2,
        retry_delay_seconds=0,
    )
    request = httpx.Request("POST", "https://api.deepseek.com/chat/completions")
    response = httpx.Response(401, request=request)
    create = AsyncMock(
        side_effect=AuthenticationError("invalid key", response=response, body=None)
    )
    client.client.chat.completions.create = create

    with pytest.raises(DeepSeekError) as exc_info:
        await client.chat([{"role": "user", "content": "hello"}])

    assert exc_info.value.kind == "authentication"
    assert exc_info.value.status_code == 503
    assert create.await_count == 1


@pytest.mark.asyncio
async def test_chat_rejects_empty_responses():
    client = DeepSeekClient("test-key", retry_delay_seconds=0)
    client.client.chat.completions.create = AsyncMock(return_value=_completion(""))

    with pytest.raises(DeepSeekError) as exc_info:
        await client.chat([{"role": "user", "content": "hello"}])

    assert exc_info.value.kind == "empty_response"
    assert exc_info.value.status_code == 502


@pytest.mark.asyncio
async def test_chat_does_not_retry_timeout():
    client = DeepSeekClient("test-key", max_attempts=2, retry_delay_seconds=0)
    request = httpx.Request("POST", "https://api.deepseek.com/chat/completions")
    create = AsyncMock(side_effect=APITimeoutError(request=request))
    client.client.chat.completions.create = create

    with pytest.raises(DeepSeekError) as exc_info:
        await client.chat([{"role": "user", "content": "hello"}])

    assert exc_info.value.kind == "timeout"
    assert exc_info.value.status_code == 504
    assert create.await_count == 1


@pytest.mark.asyncio
async def test_chat_does_not_retry_rate_limit():
    client = DeepSeekClient("test-key", max_attempts=2, retry_delay_seconds=0)
    request = httpx.Request("POST", "https://api.deepseek.com/chat/completions")
    response = httpx.Response(429, request=request)
    create = AsyncMock(
        side_effect=RateLimitError("rate limited", response=response, body=None)
    )
    client.client.chat.completions.create = create

    with pytest.raises(DeepSeekError) as exc_info:
        await client.chat([{"role": "user", "content": "hello"}])

    assert exc_info.value.kind == "rate_limit"
    assert exc_info.value.status_code == 429
    assert create.await_count == 1


@pytest.mark.parametrize("status_code", [500, 501])
@pytest.mark.asyncio
async def test_chat_does_not_retry_non_transient_5xx(status_code):
    client = DeepSeekClient("test-key", max_attempts=2, retry_delay_seconds=0)
    request = httpx.Request("POST", "https://api.deepseek.com/chat/completions")
    response = httpx.Response(status_code, request=request)
    create = AsyncMock(
        side_effect=APIStatusError("upstream error", response=response, body=None)
    )
    client.client.chat.completions.create = create

    with pytest.raises(DeepSeekError) as exc_info:
        await client.chat([{"role": "user", "content": "hello"}])

    assert exc_info.value.kind == "upstream"
    assert create.await_count == 1


@pytest.mark.parametrize("status_code", [502, 503, 504])
@pytest.mark.asyncio
async def test_chat_stops_after_max_retries_for_transient_5xx(
    status_code,
    monkeypatch,
):
    client = DeepSeekClient("test-key", max_attempts=2, retry_delay_seconds=10)
    request = httpx.Request("POST", "https://api.deepseek.com/chat/completions")
    response = httpx.Response(status_code, request=request)
    create = AsyncMock(
        side_effect=APIStatusError("upstream error", response=response, body=None)
    )
    client.client.chat.completions.create = create
    fake_sleep = AsyncMock()
    monkeypatch.setattr("src.llm.deepseek_client.asyncio.sleep", fake_sleep)

    with pytest.raises(DeepSeekError) as exc_info:
        await client.chat([{"role": "user", "content": "hello"}])

    assert exc_info.value.kind == "upstream"
    assert create.await_count == 2
    fake_sleep.assert_awaited_once_with(10)


@pytest.mark.asyncio
async def test_chat_rejects_completion_without_choices():
    client = DeepSeekClient("test-key", retry_delay_seconds=0)
    client.client.chat.completions.create = AsyncMock(
        return_value=SimpleNamespace(choices=[])
    )

    with pytest.raises(DeepSeekError) as exc_info:
        await client.chat([{"role": "user", "content": "hello"}])

    assert exc_info.value.kind == "empty_response"
    assert exc_info.value.status_code == 502
