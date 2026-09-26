# Testing Guide

## Running Tests

Run commands from the project root with the project virtual environment activated.

Complete offline test suite:

```bash
pytest
```

One test file:

```bash
pytest tests/test_tool_registry.py
```

Verbose output:

```bash
pytest -v
```

Core backend coverage:

```bash
pytest --cov=backend.server --cov=src.rag --cov=src.tools --cov=src.llm.deepseek_client --cov=src.llm.ollama_client --cov=src.utils.db --cov-report=term-missing
```

RAG-only tests and deterministic offline retrieval evaluation:

```bash
pytest tests/test_rag_*.py
python scripts/evaluate_rag.py
```

The `integration` marker is excluded from normal runs. It is reserved for tests that
explicitly require a real local or external service. Only run one intentionally, after
starting the required service, with:

```bash
pytest -m integration tests/test_real_memory.py
```

## Test Isolation

- `tests/conftest.py` sets `CBT_DATA_DIR` before `backend.server` is imported. This
  redirects import-time SQLite initialization to a temporary runtime directory.
- Each storage/API test receives a fresh database at `tmp_path / "test_cbt.db"`.
  Pytest removes it after the test.
- `FakeLLMClient` replaces the server's selected chat client. Its responses and errors come
  from a deterministic in-memory queue, so no API key or live model is used.
- An automatic socket guard blocks non-loopback DNS and connections. A missing mock
  fails quickly instead of reaching DeepSeek, Ollama, TTS, or the public internet.
- Default tests never write to `data/cbt_sessions.db` and never perform real TTS.

## Test Fixtures

The reusable fixtures in `tests/conftest.py` include:

- `test_session_id`: stable ID `test-session-001`.
- `temporary_db`: per-test SQLite path.
- `storage` / `db_manager`: initialized `SQLiteSessionManager` using that path.
- `sample_sleep_records`: two synthetic sleep records.
- `sample_test_results`: GAD-7 score 12 and PHQ-9 score 6.
- `sample_activities`: a synthetic 20-minute walk.
- `sample_thoughts`: one synthetic CBT thought entry.
- `seeded_storage`: storage preloaded with the sample records.
- `fake_llm_client`: queue-based chat-model replacement.
- `override_db`: connects server storage and summarizer storage to the test database.
- `fastapi_client`: FastAPI `TestClient` using both temporary SQLite and Fake LLM.
- `mock_tool_context`: isolated `ToolContext` for direct handler/registry tests.

`FakeLLMClient` supports queued text, tool calls, categorized model errors, empty or
malformed responses, and multi-round conversations. It also records every call so tests
can inspect messages, tool schemas, and `tool_choice`.

## Adding New Tool Tests

When adding a Tool:

1. Assert its name, description, parameters, and handler registration.
2. Test valid execution through `tool_registry.execute()` with `mock_tool_context`.
3. Test missing, malformed, and wrong-type arguments according to its existing schema.
4. Verify its storage access uses `context.session_id`; add a session-isolation case for
   user data.
5. Verify any `client_events` contract without launching a browser.
6. If chat routing can force the Tool, add both a direct routing assertion and an API
   assertion for first-round `tool_choice`.
7. For a two-round Tool, verify the Tool result appears in second-round messages and
   that tools are no longer offered.
8. Run the complete suite and coverage command above.

Do not use real user records or assert exact free-form model prose.

## Troubleshooting

### Async tests

Use `@pytest.mark.asyncio`, `AsyncMock`, or async fixtures. `pytest.ini` uses
`asyncio_mode = auto` with function-scoped event loops.

### Database failures

Use `storage`, `db_manager`, or `fastapi_client`. Do not construct a manager with
`data/cbt_sessions.db`. If a test imports `backend.server`, keep the shared
`tests/conftest.py` in discovery so `CBT_DATA_DIR` is set first.

### Unexpected network error

This normally means a client was not replaced by the Fake/Mock. Patch the narrow method
used by the test or use `fake_llm_client`; do not disable the global network guard.

### Fake LLM has no queued response

Queue one response for ordinary chat and two for Tool Calling. A five-round guard test
must queue exactly five Tool responses because the server stops before a sixth LLM call.

### Import errors

Run pytest from the repository root with the project virtual environment activated.
Dependencies for tests (`pytest`, `pytest-asyncio`, and `pytest-cov`) are declared in
`requirements.txt`.
