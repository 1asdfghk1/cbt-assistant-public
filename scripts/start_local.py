"""Check local prerequisites before launching the public demo."""

import json
import socket
import sys
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import ProxyHandler, Request, build_opener


PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from backend.settings import load_model_settings  # noqa: E402


def check_ollama(base_url: str, model: str) -> None:
    opener = build_opener(ProxyHandler({}))
    request = Request(f"{base_url.rstrip('/')}/api/tags")
    try:
        with opener.open(request, timeout=5) as response:
            payload = json.load(response)
    except (HTTPError, URLError, TimeoutError, OSError, ValueError) as error:
        raise RuntimeError("无法连接 Ollama，请启动 Ollama 并检查 OLLAMA_BASE_URL。") from error
    if not isinstance(payload, dict) or not isinstance(payload.get("models"), list):
        raise RuntimeError("Ollama 返回了无效的模型清单，请检查 OLLAMA_BASE_URL。")
    if any(not isinstance(item, dict) or not isinstance(item.get("name"), str)
           for item in payload["models"]):
        raise RuntimeError("Ollama 返回了无效的模型清单，请检查 OLLAMA_BASE_URL。")
    if not any(item["name"] == model for item in payload["models"]):
        raise RuntimeError(f"未找到聊天模型，请先运行：ollama pull {model}")


def check_port(host: str, port: int) -> None:
    addresses = socket.getaddrinfo(host, port, type=socket.SOCK_STREAM)
    for family, socktype, proto, _, address in addresses:
        with socket.socket(family, socktype, proto) as connection:
            connection.settimeout(1)
            if connection.connect_ex(address) == 0:
                raise RuntimeError(f"端口 {port} 已被占用；请修改 .env 中的 APP_PORT。")


def main() -> int:
    if sys.version_info < (3, 12):
        print("需要 Python 3.12 或更新版本。", file=sys.stderr)
        return 1
    try:
        settings = load_model_settings()
        from backend.server import APP_HOST, APP_PORT, app

        if settings.llm_provider == "ollama":
            check_ollama(settings.ollama_base_url, settings.ollama_model)
        check_port(APP_HOST, APP_PORT)
    except (RuntimeError, OSError) as error:
        print(f"启动检查失败：{error}", file=sys.stderr)
        return 1
    print(f"启动成功后打开 http://127.0.0.1:{APP_PORT}")
    import uvicorn

    uvicorn.run(app, host=APP_HOST, port=APP_PORT)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
