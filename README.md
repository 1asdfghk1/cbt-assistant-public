# CBT Assistant — Local Public Demo / 本地公开演示版（v0.1.1）

[English](#english) | [简体中文](#简体中文)

## English

This is a single-user CBT-inspired assistant that runs on your own computer. It keeps the original journaling, assessments, activity planning, sleep records, SOS flows, conversation memory, reports, and optional knowledge-base retrieval. Choose either a local Ollama chat model or your own DeepSeek API account.

This is an adaptation of [KazKozDev/cbt-assistant](https://github.com/KazKozDev/cbt-assistant), not an official release by its original author. The original MIT copyright and license are preserved in [LICENSE](LICENSE). This public variant adds explicit provider selection, safer local defaults, and offline provider tests. No original author endorsement is implied.

The assistant is a self-help demo, **not** a clinician, diagnosis, emergency service, or replacement for professional care. Model answers can be wrong. Use local emergency and professional resources in a crisis.

### What runs locally, and what does not

| Component | Default behavior |
| --- | --- |
| Chat model | Ollama on your machine (`qwen3:4b-instruct`); download it separately. |
| Alternative chat model | DeepSeek API, only if you select it and enter your own key. Relevant chat context is sent to DeepSeek. |
| Records and memory | SQLite under `data/` plus browser local storage on this app's origin. |
| Knowledge-base retrieval | Off by default; requires a separate embedding model if enabled. |
| Text-to-speech | Edge TTS is an optional online feature and sends spoken text to that service. |
| Frontend assets and links | Fonts and JavaScript libraries are loaded from public CDNs; video links open external sites. The app is therefore not completely offline. |

No API key, database, or personal conversation is included in this source release. The `.env` file and `data/` contents are ignored by Git, but **review files before publishing your own fork**.

### Quick start: Windows with Git Bash

Requirements: Python 3.12, [Ollama](https://ollama.com/download), and enough disk space/RAM for the selected model. Run these commands from the downloaded project folder:

```bash
python -m venv .venv
source .venv/Scripts/activate
python -m pip install -r requirements.txt
cp .env.example .env
ollama pull qwen3:4b-instruct
python scripts/start_local.py
```

Open <http://127.0.0.1:8001> in your browser. If Ollama is not running, start its app or run `ollama serve` in another terminal. The local model is downloaded by **you** with `ollama pull`; this repository does not redistribute model weights.

The startup script checks Python, the configured model, and the local port before serving the app. `/api/ready` reports whether the local Ollama model is available; DeepSeek mode only confirms configuration, not cloud availability.

The public demo uses port `8001` so it does not share the original development app's `8000` browser storage. Do not point both versions at the same origin: the frontend syncs records from browser local storage into its SQLite database.

### Quick start: macOS or Linux

After installing Python and Ollama:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
cp .env.example .env
ollama pull qwen3:4b-instruct
python scripts/start_local.py
```

Open <http://127.0.0.1:8001>. If the Ollama service is not already running, start it separately with `ollama serve`.

### Choose DeepSeek instead

Edit your local `.env` file, then restart the backend:

```dotenv
LLM_PROVIDER=deepseek
DEEPSEEK_API_KEY=your_own_key_here
DEEPSEEK_MODEL=deepseek-chat
```

Get your own key from the DeepSeek platform. Never paste a real key into source files, issues, screenshots, or commits. When DeepSeek is selected, prompts may include the current message, recent conversation, memory summary, relevant journal/test data, tool results, and optional retrieved knowledge. Do not use this mode for sensitive records unless you accept sending that context to the provider.

To switch back to local inference, set `LLM_PROVIDER=ollama` and restart the backend. The provider is selected at startup, not with a browser button. `/api/health` shows which provider/model is configured; it does not prove that Ollama is running or that a model is downloaded.

### Back up, restore, and clear your records

Open **Export records** in the sidebar. The JSON backup contains the current browser session's SQLite records, conversation memories, and browser records. Keep this private file safe. Restore replaces the current session's records; clear removes the current session's server and browser records. After either action, the page reloads. Restore is intended for a backup created by this app.

The chat now shows streamed text as it arrives. **Stop** cancels the browser request; a tool action may already have completed on the server, so check your records before resending a stopped request.

### Optional knowledge-base retrieval

RAG is disabled by default. It needs an embedding model in addition to the chat model. To enable local retrieval:

```bash
ollama pull qwen3-embedding:4b
```

Then set `RAG_ENABLED=true` in `.env` and restart. The Markdown knowledge files live in `knowledge_base/`; the generated index remains under ignored `data/`. The feature remains available with either chat provider if the embedding service is configured.

### Privacy and safety boundaries

- The server intentionally listens only on the local computer. It has no user accounts or authentication; do not expose it to a LAN, public network, tunnel, or reverse proxy.
- Runtime SQLite data is stored under `data/` by default. `.env` and `data/` are excluded from Git; deleting your own runtime data is a separate, deliberate action.
- The browser also keeps journals and settings in local storage. Use the in-app clear action to clear the current session from both stores. Old files saved elsewhere are unaffected.
- Ollama chat stays local **only when** `OLLAMA_BASE_URL` points to your own local Ollama server. Changing it to a remote address changes the privacy boundary.
- The SOS flow and model-generated guidance are not emergency care.

### Tests

```bash
python -m pytest -q
node --test tests/frontend_security.test.js tests/frontend_behavior.test.js
```

The regular suite uses temporary databases and fake model responses; it does not need a DeepSeek key or a running Ollama service. A separately marked integration test needs a real local model; see [TESTING.md](TESTING.md).

Direct Python dependencies are pinned in `requirements.txt`. CI runs on Windows and Ubuntu with Python 3.12 and Node.js 22.

### Troubleshooting

- `connection`: Ollama is not running or `OLLAMA_BASE_URL` is wrong. Check `ollama list` and the Ollama service.
- `model_not_found`: run `ollama pull qwen3:4b-instruct`, or update `OLLAMA_MODEL` to a model already installed.
- Missing `DEEPSEEK_API_KEY`: set your own key only if `LLM_PROVIDER=deepseek`.
- Port already in use: change `APP_PORT` in `.env`, and use the resulting browser URL. Avoid the original app's port if you have personal browser data there.
- Slow first reply: a local model may take time to load. The browser waits longer for local inference and tool calls.

### Main code paths

- `backend/settings.py`: provider and model configuration.
- `backend/server.py`: API, chat/tool loop, reports, and static frontend.
- `src/llm/`: DeepSeek and Ollama adapters.
- `src/utils/db.py`: SQLite records.
- `src/memory/`: conversation memory and summaries.
- `src/rag/`: optional local retrieval.
- `frontend/`: web interface.

MIT license; see [LICENSE](LICENSE). Upstream authorship remains with the original project. Contributions in this variant are separate and should be described as such.

---

## 简体中文

这是一个在个人电脑上运行、面向单用户的认知行为疗法（CBT）辅助应用。它保留了原项目的日记、测评、活动计划、睡眠记录、SOS 功能、对话记忆、报告，以及可选的知识库检索功能。聊天模型可以选择本地 Ollama，也可以使用你自己的 DeepSeek API 账户。

本项目基于 [KazKozDev/cbt-assistant](https://github.com/KazKozDev/cbt-assistant) 改编，并非原作者发布的官方版本。原项目的 MIT 版权声明和许可证保留在 [LICENSE](LICENSE) 中。这个公开版本增加了明确的模型服务选择、更安全的本地默认配置，以及无需连接模型服务的测试。这不代表原作者认可或支持本版本。

本应用只是一个自助支持演示项目，**不能**充当临床医生，不能用于诊断或提供紧急救助，也不能替代专业医疗服务。模型回答可能出错。遇到危机时，请联系当地的紧急救助或专业人员。

### 哪些功能在本地运行

| 组件 | 默认行为 |
| --- | --- |
| 聊天模型 | 在你的电脑上通过 Ollama 运行 `qwen3:4b-instruct`；模型需要另行下载。 |
| 其他聊天模型 | 只有在你主动选择 DeepSeek 并填写自己的 API Key 后，才会使用 DeepSeek API。相关聊天上下文会发送给 DeepSeek。 |
| 记录与记忆 | 保存在 `data/` 下的 SQLite 数据库，以及浏览器中本应用网址对应的本地存储。 |
| 知识库检索 | 默认关闭；启用后需要单独下载嵌入模型。 |
| 文本转语音 | Edge TTS 是可选的在线功能，会将需要朗读的文本发送给该服务。 |
| 前端资源与链接 | 字体和 JavaScript 库从公共 CDN 加载；视频链接会打开外部网站。因此，本应用并非完全离线。 |

此源码版本不包含 API Key、数据库或私人对话。Git 会忽略 `.env` 文件和 `data/` 中的内容，但**发布你自己的分支前，仍应检查将要上传的文件**。

### 快速启动：Windows 与 Git Bash

你需要 Python 3.12、[Ollama](https://ollama.com/download)，以及足够运行所选模型的磁盘空间和内存。在下载后的项目文件夹中执行：

```bash
python -m venv .venv
source .venv/Scripts/activate
python -m pip install -r requirements.txt
cp .env.example .env
ollama pull qwen3:4b-instruct
python scripts/start_local.py
```

然后在浏览器中打开 <http://127.0.0.1:8001>。如果 Ollama 尚未运行，请启动 Ollama 应用，或在另一个终端执行 `ollama serve`。本地模型由**你自己**通过 `ollama pull` 下载；本仓库不提供模型权重文件。

启动脚本会检查 Python、所选模型及本地端口。`/api/ready` 可以检查本地 Ollama 模型是否可用；DeepSeek 模式只确认配置，不验证云端可用性。

公开演示版使用 `8001` 端口，以免与使用 `8000` 端口的原开发版共享浏览器存储。请不要让两个版本使用同一个网址和端口：前端会将浏览器本地存储中的记录同步到 SQLite 数据库。

### 快速启动：macOS 或 Linux

安装 Python 和 Ollama 后，执行：

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
cp .env.example .env
ollama pull qwen3:4b-instruct
python scripts/start_local.py
```

打开 <http://127.0.0.1:8001>。如果 Ollama 服务尚未运行，请另外执行 `ollama serve`。

### 改用 DeepSeek

编辑本地的 `.env` 文件，然后重启后端：

```dotenv
LLM_PROVIDER=deepseek
DEEPSEEK_API_KEY=your_own_key_here
DEEPSEEK_MODEL=deepseek-chat
```

你需要从 DeepSeek 平台获取自己的 API Key。不要把真实密钥粘贴到源代码、问题反馈、截图或 Git 提交中。选择 DeepSeek 后，发送的提示内容可能包含当前消息、近期对话、记忆摘要、相关日记或测评数据、工具结果，以及可选的知识库检索内容。如果你不接受将这些内容发送给服务提供方，请勿在此模式下处理敏感记录。

要切回本地模型，请将 `LLM_PROVIDER` 设为 `ollama`，然后重启后端。模型服务是在启动时选择的，目前不能通过浏览器按钮切换。`/api/health` 可以显示当前配置的服务和模型，但不能证明 Ollama 正在运行，也不能证明模型已经下载。

### 备份、恢复与清除记录

点击侧栏中的“导出记录”。JSON 备份包含当前浏览器会话的 SQLite 记录、对话记忆和浏览器记录，请妥善保管。恢复会替换备份对应会话的数据；清除会移除当前会话在服务端和浏览器中的记录。操作完成后页面会重新加载。恢复功能适用于本应用导出的备份。

聊天现在会逐步显示回复。点击“停止生成”会取消浏览器请求；工具操作可能已经在服务端完成，重新发送前请先检查记录，避免重复操作。

### 可选的知识库检索

RAG（知识库检索增强）默认关闭。除了聊天模型，它还需要一个嵌入模型。要启用本地检索，先执行：

```bash
ollama pull qwen3-embedding:4b
```

然后在 `.env` 中设置 `RAG_ENABLED=true`，并重启后端。Markdown 知识文件位于 `knowledge_base/`；生成的索引保存在被 Git 忽略的 `data/` 下。只要嵌入服务已正确配置，无论聊天模型选择 Ollama 还是 DeepSeek，都可以使用此功能。

### 隐私与安全边界

- 服务仅监听本机地址。应用没有用户账户或身份验证功能，请勿将它开放到局域网、公网、网络隧道或反向代理。
- 运行时的 SQLite 数据默认保存在 `data/` 下。Git 会忽略 `.env` 和 `data/`；删除自己的运行数据需要单独、谨慎地操作。
- 浏览器也会在本地保存日记和设置。使用应用内的清除功能可同时清除当前会话的两份数据；此前另行保存的文件不会被清除。
- **只有当** `OLLAMA_BASE_URL` 指向你自己电脑上的 Ollama 服务时，Ollama 聊天才保持在本地。将它改为远程地址会改变数据的隐私边界。
- SOS 功能和模型生成的建议不能替代紧急救助。

### 测试

```bash
python -m pytest -q
node --test tests/frontend_security.test.js tests/frontend_behavior.test.js
```

常规测试使用临时数据库和模拟的模型回复，不需要 DeepSeek API Key，也不需要运行 Ollama。另有一个单独标记的集成测试，需要真实的本地模型；详见 [TESTING.md](TESTING.md)。

`requirements.txt` 固定了直接 Python 依赖的版本。自动测试在 Windows 与 Ubuntu 上使用 Python 3.12 和 Node.js 22 运行。

### 常见问题

- `connection`：Ollama 未运行，或 `OLLAMA_BASE_URL` 配置错误。请检查 `ollama list` 和 Ollama 服务。
- `model_not_found`：执行 `ollama pull qwen3:4b-instruct`，或将 `OLLAMA_MODEL` 改为已经安装的模型。
- 缺少 `DEEPSEEK_API_KEY`：只有当 `LLM_PROVIDER=deepseek` 时，才需要填写你自己的密钥。
- 端口已被占用：修改 `.env` 中的 `APP_PORT`，并使用修改后的浏览器地址。如果原版本中有个人浏览器数据，请避免使用它的端口。
- 首次回复较慢：本地模型可能需要一些时间加载。浏览器会为本地推理和工具调用等待更长时间。

### 主要代码位置

- `backend/settings.py`：模型服务和模型配置。
- `backend/server.py`：API、聊天及工具调用流程、报告和静态前端服务。
- `src/llm/`：DeepSeek 与 Ollama 的对接代码。
- `src/utils/db.py`：SQLite 数据记录。
- `src/memory/`：对话记忆和摘要。
- `src/rag/`：可选的本地知识检索。
- `frontend/`：网页界面。

项目使用 MIT 许可证，详见 [LICENSE](LICENSE)。原项目的创作归属仍属于原作者；此版本新增的改动应单独说明。
