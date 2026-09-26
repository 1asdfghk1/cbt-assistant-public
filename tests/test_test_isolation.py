import socket
from pathlib import Path

import pytest


def test_server_import_time_database_is_redirected_away_from_real_data():
    import backend.server as server

    real_database = (Path(__file__).resolve().parent.parent / "data" / "cbt_sessions.db").resolve()

    assert server.sessions.db_path.resolve() != real_database
    assert server.DATA_DIR.resolve() != real_database.parent
    assert server.sessions.db_path.parent.resolve() == server.DATA_DIR.resolve()


def test_per_test_storage_uses_pytest_tmp_path(storage, tmp_path):
    assert storage.db_path.parent.resolve() == tmp_path.resolve()
    assert storage.db_path.name == "test_cbt.db"


def test_external_dns_is_blocked_before_any_request_is_sent():
    with pytest.raises(RuntimeError, match="External DNS is disabled"):
        socket.getaddrinfo("api.deepseek.com", 443)
