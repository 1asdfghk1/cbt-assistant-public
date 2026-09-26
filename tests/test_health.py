def test_health_contract_does_not_expose_secrets(fastapi_client):
    response = fastapi_client.get("/api/health")

    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "ok"
    assert payload["version"]
    assert payload["provider"] == "Ollama"
    assert payload["model"] == "qwen3:4b-instruct"
    assert payload["rag_enabled"] is False

    serialized = response.text.lower()
    for forbidden in ("api_key", "authorization", "secret", "pytest-not-a-real-api-key"):
        assert forbidden not in serialized
