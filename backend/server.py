"""
CBT Depression AI Assistant — Backend Server
=============================================
FastAPI server integrating Modular genAI components.
"""

import os
import json
import logging
import time
import uuid
from pathlib import Path
from contextlib import asynccontextmanager
import sys
from typing import Literal

# Ensure src can be imported
PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from backend.settings import CONFIG_DIR, load_model_settings  # noqa: E402
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException  # noqa: E402
from fastapi.staticfiles import StaticFiles  # noqa: E402
from fastapi.responses import FileResponse, PlainTextResponse, Response  # noqa: E402
from fastapi.middleware.cors import CORSMiddleware  # noqa: E402
from starlette.middleware.trustedhost import TrustedHostMiddleware  # noqa: E402
from pydantic import BaseModel, Field, field_validator  # noqa: E402
from src.llm.deepseek_client import DeepSeekClient  # noqa: E402
from src.llm.errors import LLMError  # noqa: E402
from src.llm.ollama_client import ContentCleaner, OllamaClient  # noqa: E402
from src.utils.db import SQLiteSessionManager  # noqa: E402
from src.rag import RAGService, RAGSettings  # noqa: E402
from src.prompts.templates import PromptManager  # noqa: E402
from src.memory import MemoryService, MemorySettings  # noqa: E402
from src.safety import CrisisAssessment, assess_crisis  # noqa: E402
from src.tools import ToolContext, select_forced_tool, tool_registry  # noqa: E402
from src import __version__  # noqa: E402

logger = logging.getLogger("cbt_assistant.api")

# ─── Configuration ───────────────────────────────────────────────
# Configuration

model_settings = load_model_settings()

LLM_PROVIDER = model_settings.llm_provider
OLLAMA_BASE_URL = model_settings.ollama_base_url
OLLAMA_MODEL = model_settings.ollama_model
DEEPSEEK_API_KEY = model_settings.deepseek_api_key
DEEPSEEK_MODEL = model_settings.deepseek_model
ACTIVE_MODEL = OLLAMA_MODEL if LLM_PROVIDER == "ollama" else DEEPSEEK_MODEL
EMBED_MODEL = model_settings.embedding_model
LLM_OPTIONS = model_settings.llm_options



KNOWLEDGE_BASE_DIR = Path(__file__).parent.parent / "knowledge_base"
# Tests can redirect all import-time SQLite initialization away from user data.
# Production behavior is unchanged when CBT_DATA_DIR is not set.
DATA_DIR = Path(os.getenv("CBT_DATA_DIR", PROJECT_ROOT / "data"))
DATA_DIR.mkdir(parents=True, exist_ok=True)
FRONTEND_DIR = Path(__file__).parent.parent / "frontend"


def _read_app_port() -> int:
    try:
        port = int(os.getenv("APP_PORT", "8001"))
    except ValueError:
        return 8001
    return port if 1 <= port <= 65535 else 8001


APP_HOST = os.getenv("APP_HOST", "127.0.0.1").strip() or "127.0.0.1"
if APP_HOST not in {"127.0.0.1", "::1", "localhost"}:
    raise RuntimeError("此单用户发布版只允许在本机运行，请将 APP_HOST 设为 127.0.0.1。")
APP_PORT = _read_app_port()
_configured_origins = {
    origin.strip().rstrip("/")
    for origin in os.getenv("APP_ALLOWED_ORIGINS", "").split(",")
    if origin.strip()
}
APP_ALLOWED_ORIGINS = tuple(
    sorted(
        {
            f"http://127.0.0.1:{APP_PORT}",
            f"http://localhost:{APP_PORT}",
            *_configured_origins,
        }
    )
)

# ─── Component Initialization ─────────────────────────────────────
def create_llm_client(settings):
    if settings.llm_provider == "ollama":
        return OllamaClient(settings.ollama_base_url, settings.ollama_model)
    return DeepSeekClient(
        api_key=settings.deepseek_api_key,
        model=settings.deepseek_model,
    )


llm_client = create_llm_client(model_settings)
sessions = SQLiteSessionManager(DATA_DIR / "cbt_sessions.db")
prompt_manager = PromptManager(CONFIG_DIR / "prompts.yaml")
memory_settings = MemorySettings.from_env()
memory_service = MemoryService(sessions, llm_client, memory_settings)
# Compatibility alias for existing integrations/tests that reference summarizer.
summarizer = memory_service.summarizer
rag_settings = RAGSettings.from_env(
    knowledge_base_dir=KNOWLEDGE_BASE_DIR,
    default_cache_dir=DATA_DIR / "rag_index",
    default_embedding_model=EMBED_MODEL,
    default_ollama_url=OLLAMA_BASE_URL,
)
rag_service = RAGService(rag_settings)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # RAG initialization is optional and never prevents the chat API from starting.
    await rag_service.initialize()
    yield

app = FastAPI(title="CBT Depression AI Assistant", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=list(APP_ALLOWED_ORIGINS),
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "OPTIONS"],
    allow_headers=["Content-Type"],
)
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["127.0.0.1", "localhost", "[::1]", "testserver"],
)

# ─── REST Endpoints ─────────────────────────────────────────────

class ChatRequest(BaseModel):
    message: str = Field(min_length=1)
    session_id: str = "default"
    language: Literal["zh", "en", "ru"] = "zh"

    @field_validator("message")
    @classmethod
    def validate_message(cls, value: str) -> str:
        normalized = value.strip()

        if not normalized:
            raise ValueError("message must not be blank")

        return normalized


class MoodRequest(BaseModel):
    score: int
    note: str = ""
    session_id: str = "default"


class TTSRequest(BaseModel):
    text: str
    language: str = "ru"
    voice: str | None = None


class ThoughtRecordRequest(BaseModel):
    session_id: str = "default"
    situation: str
    thought: str
    emotion: str
    intensity: int
    distortion: str
    rational_response: str


class ThoughtRecordUpdateRequest(BaseModel):
    session_id: str = "default"
    situation: str
    thought: str
    emotion: str
    intensity: int
    distortion: str
    rational_response: str


class SyncRequest(BaseModel):
    session_id: str = "default"
    items: list[dict]


def build_language_instruction(language: str) -> str:
    if language == "en":
        return (
            "IMPORTANT: Reply in English only. "
            "Even if the user writes in Russian, keep your response in English "
            "because the interface language is English."
        )
    if language == "ru":
        return (
            "ВАЖНО: Всегда отвечай пользователю только на русском языке. "
            "Ты профессиональный помощник по когнитивно-поведенческой терапии (КПТ)."
        )
    return (
        "重要: 请始终使用中文回答用户. "
        "你是一名专业的认知行为疗法(CBT)心理助手."
    )


TTS_VOICES = {
    "ru": {
        "ru-RU-SvetlanaNeural",
        "ru-RU-DmitryNeural",
    },
    "en": {
        "en-US-JennyNeural",
        "en-US-GuyNeural",
    },
    "zh": {
        "zh-CN-XiaoxiaoNeural",
        "zh-CN-YunxiNeural",
    },
}

# Default voice per language (also serves as the allowed-language fallback).
TTS_DEFAULT_VOICE = {
    "ru": "ru-RU-SvetlanaNeural",
    "en": "en-US-JennyNeural",
    "zh": "zh-CN-XiaoxiaoNeural",
}


def get_tts_voice(language: str, voice: str | None = None) -> str:
    lang = language if language in TTS_VOICES else "en"
    if voice and voice in TTS_VOICES.get(lang, set()):
        return voice
    return TTS_DEFAULT_VOICE.get(lang, TTS_DEFAULT_VOICE["en"])


def _chat_http_error(error: LLMError, request_id: str) -> HTTPException:
    return HTTPException(
        status_code=error.status_code,
        detail={
            "code": error.kind,
            "message": error.user_message,
            "request_id": request_id,
        },
        headers={"X-Request-ID": request_id},
    )


def _persist_crisis_response(
    session_id: str,
    user_message: str,
    assessment: CrisisAssessment,
    request_id: str,
    channel: str,
) -> None:
    sessions.add_message(session_id, "user", user_message)
    sessions.add_message(session_id, "assistant", assessment.response)
    logger.warning(
        "crisis_route_triggered request_id=%s channel=%s level=%s",
        request_id,
        channel,
        assessment.level,
    )


@app.post("/api/chat")
async def chat(req: ChatRequest):
    request_id = uuid.uuid4().hex[:12]
    request_started_at = time.monotonic()
    logger.info(
        "chat_request_started request_id=%s model=%s language=%s",
        request_id,
        ACTIVE_MODEL,
        req.language,
    )
    crisis = assess_crisis(req.message, req.language)
    if crisis:
        _persist_crisis_response(
            req.session_id, req.message, crisis, request_id, "http"
        )
        return {
            "response": crisis.response,
            "context_used": [],
            "session_id": req.session_id,
            "client_events": [],
            "request_id": request_id,
            "safety": crisis.to_public_dict(),
        }
    # Personal data intent is resolved before retrieval so knowledge search can
    # never replace the forced SQLite Tool path.
    force_tool = select_forced_tool(req.message)
    rag_results = []
    rag_context = ""
    if not force_tool:
        rag_results = await rag_service.retrieve(req.message)
        rag_context = rag_service.build_context(rag_results)

    session = sessions.get_or_create(req.session_id)
    memory_context = memory_service.build_context(req.session_id, req.message)
    system_prompt = prompt_manager.build_system_prompt(
        [], session.get("mood_log"), session.get("thought_records")
    )
    system_prompt = f"{system_prompt}\n\n{build_language_instruction(req.language)}"

    messages = [{"role": "system", "content": system_prompt}]
    for msg in memory_context.recent_messages:
        messages.append({"role": msg["role"], "content": msg["content"]})
    if memory_context.reference_message:
        messages.append({"role": "user", "content": memory_context.reference_message})
    if rag_context:
        messages.append({"role": "user", "content": rag_context})
    messages.append({"role": "user", "content": req.message})

    available_tools = tool_registry.get_schemas()
    context_used = [result.to_dict() for result in rag_results]
    tool_context = ToolContext(
        session_id=req.session_id,
        language=req.language,
        storage=sessions,
        request_id=request_id,
        model=ACTIVE_MODEL,
    )
    client_events = []

    # 如果当前问题需要查询用户真实数据，
    # 本次请求不使用旧聊天记录，避免历史中的错误数据污染工具结果
    if force_tool:
        messages = [
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": req.message
            }
        ]

    try:
        tool_round = 0

        while True:
            tool_round += 1

            if tool_round > 5:
                logger.warning(
                    "chat_request_stopped request_id=%s model=%s "
                    "error_type=tool_round_limit elapsed_ms=%s",
                    request_id,
                    ACTIVE_MODEL,
                    round((time.monotonic() - request_started_at) * 1000),
                )
                return {
                    "response": "工具调用次数过多，本次请求未能正常完成，请重新尝试。",
                    "context_used": context_used,
                    "session_id": req.session_id,
                    "client_events": [],
                    "request_id": request_id,
                }
            # 第一轮允许/强制调用工具
            if tool_round == 1:
                round_tools = available_tools

                round_tool_choice = (
                    {
                        "type": "function",
                        "function": {
                            "name": force_tool
                        }
                    }
                    if force_tool
                    else "auto"
                )

            # 工具已经执行完成后，第二轮不再提供工具
            # 让当前模型根据工具结果直接生成最终回答
            else:
                round_tools = None
                round_tool_choice = "auto"

            resp = await llm_client.chat(
                messages,
                options=LLM_OPTIONS,
                tools=round_tools,
                tool_choice=round_tool_choice,
                request_id=request_id,
            )
            tool_calls = resp.get("tool_calls", [])
            content = resp.get("content", "")

            if tool_calls:
                messages.append(
                    {"role": "assistant", "content": content, "tool_calls": tool_calls}
                )

                for tc in tool_calls:
                    fn_name = tc.get("function", {}).get("name")
                    raw_args = tc.get("function", {}).get("arguments", "{}")
                    tool_result = await tool_registry.execute(
                        fn_name,
                        raw_args,
                        tool_context,
                    )
                    client_events.extend(tool_result.client_events)
                    tool_message = {
                        "role": "tool",
                        "content": tool_result.content,
                    }
                    if tc.get("id"):
                        tool_message["tool_call_id"] = tc["id"]
                    messages.append(tool_message)
            else:
                if not isinstance(content, str) or not content.strip():
                    raise LLMError(
                        "empty_response",
                        "AI 服务没有返回有效内容，请重新尝试。",
                        status_code=502,
                    )
                sessions.add_message(req.session_id, "user", req.message)
                sessions.add_message(req.session_id, "assistant", content)
                await memory_service.after_response(req.session_id, req.message)
                logger.info(
                    "chat_request_completed request_id=%s model=%s elapsed_ms=%s",
                    request_id,
                    ACTIVE_MODEL,
                    round((time.monotonic() - request_started_at) * 1000),
                )
                return {
                    "response": content,
                    "context_used": context_used,
                    "session_id": req.session_id,
                    "client_events": client_events,
                    "request_id": request_id,
                }

    except LLMError as error:
        logger.warning(
            "chat_request_failed request_id=%s model=%s error_type=%s elapsed_ms=%s",
            request_id,
            ACTIVE_MODEL,
            error.kind,
            round((time.monotonic() - request_started_at) * 1000),
        )
        raise _chat_http_error(error, request_id) from error
    except Exception as error:
        logger.exception(
            "chat_request_failed request_id=%s model=%s error_type=%s elapsed_ms=%s",
            request_id,
            ACTIVE_MODEL,
            type(error).__name__,
            round((time.monotonic() - request_started_at) * 1000),
        )
        raise HTTPException(
            status_code=500,
            detail={
                "code": "internal_error",
                "message": "服务暂时出现异常，请稍后重试。",
                "request_id": request_id,
            },
            headers={"X-Request-ID": request_id},
        ) from error


@app.post("/api/chat/stream")
async def chat_stream(req: ChatRequest):
    from fastapi.responses import StreamingResponse

    request_id = uuid.uuid4().hex[:12]
    crisis = assess_crisis(req.message, req.language)
    if crisis:
        _persist_crisis_response(
            req.session_id, req.message, crisis, request_id, "sse"
        )

        async def crisis_stream():
            payload = {
                "done": True,
                "full_response": crisis.response,
                "context_used": [],
                "request_id": request_id,
                "safety": crisis.to_public_dict(),
            }
            yield f"data: {json.dumps(payload, ensure_ascii=False)}\n\n"

        return StreamingResponse(
            crisis_stream(),
            media_type="text/event-stream",
            headers={"Cache-Control": "no-cache", "X-Request-ID": request_id},
        )

    force_tool = select_forced_tool(req.message)
    rag_results = []
    rag_context = ""
    if not force_tool:
        rag_results = await rag_service.retrieve(req.message)
        rag_context = rag_service.build_context(rag_results)

    session = sessions.get_or_create(req.session_id)
    memory_context = memory_service.build_context(req.session_id, req.message)
    system_prompt = prompt_manager.build_system_prompt(
        [], session.get("mood_log"), session.get("thought_records")
    )
    system_prompt = f"{system_prompt}\n\n{build_language_instruction(req.language)}"

    messages = [{"role": "system", "content": system_prompt}]
    for msg in memory_context.recent_messages:
        messages.append({"role": msg["role"], "content": msg["content"]})
    if memory_context.reference_message:
        messages.append({"role": "user", "content": memory_context.reference_message})
    if rag_context:
        messages.append({"role": "user", "content": rag_context})
    messages.append({"role": "user", "content": req.message})

    available_tools = tool_registry.get_schemas()
    if force_tool:
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": req.message},
        ]
    tool_context = ToolContext(
        session_id=req.session_id,
        language=req.language,
        storage=sessions,
        request_id=request_id,
        model=ACTIVE_MODEL,
    )

    async def generate():
        nonlocal messages
        tool_round = 0

        while True:
            tool_round += 1
            if tool_round > 5:
                logger.warning(
                    "chat_stream_failed request_id=%s model=%s error_type=tool_round_limit",
                    request_id,
                    ACTIVE_MODEL,
                )
                yield f"data: {json.dumps({'error': '工具调用次数过多，请重新尝试。', 'code': 'tool_round_limit', 'request_id': request_id})}\n\n"
                return

            full_response = ""
            tool_calls = []

            try:
                # 1. Ask model
                async for chunk in llm_client.chat_stream(
                        messages,
                        options=LLM_OPTIONS,
                        tools=available_tools if tool_round == 1 else None,
                        tool_choice=(
                                {
                                    "type": "function",
                                    "function": {
                                        "name": force_tool
                                    }
                                }
                                if force_tool and tool_round == 1
                                else "auto"
                        ),
                        request_id=request_id,
                ):
                    msg = chunk.get("message", {})

                    # Ollama streams tool calls too
                    if "tool_calls" in msg and msg["tool_calls"]:
                        # Merge tool calls from stream (often sent in one piece anyway, but let's be safe)
                        tool_calls = msg["tool_calls"]

                    token = msg.get("content", "")
                    if token:
                        full_response += token
                        # Only yield to frontend if it's not an empty tool trigger
                        if token.strip():
                            yield f"data: {json.dumps({'token': token})}\n\n"

                    if chunk.get("done"):
                        # If there were tool calls, we don't end the stream yet!
                        if tool_calls:
                            # 2. Add assistant's tool call intent to history
                            messages.append(
                                {
                                    "role": "assistant",
                                    "content": full_response,
                                    "tool_calls": tool_calls,
                                }
                            )

                            # 3. Execute tools
                            for tc in tool_calls:
                                fn_name = tc.get("function", {}).get("name")
                                raw_args = tc.get("function", {}).get("arguments", "{}")
                                tool_result = await tool_registry.execute(
                                    fn_name,
                                    raw_args,
                                    tool_context,
                                )
                                yield f"data: {json.dumps({'tool_call': fn_name})}\n\n"
                                tool_message = {
                                    "role": "tool",
                                    "content": tool_result.content,
                                }
                                if tc.get("id"):
                                    tool_message["tool_call_id"] = tc["id"]
                                messages.append(tool_message)

                            # Break out of loop to run llm_client.chat_stream AGAIN with tool results
                            break

                        else:
                            # Standard completion done
                            clean = ContentCleaner.strip_think_tags(full_response)
                            sessions.add_message(req.session_id, "user", req.message)
                            sessions.add_message(req.session_id, "assistant", clean)
                            await memory_service.after_response(req.session_id, req.message)
                            yield f"data: {json.dumps({'done': True, 'full_response': clean, 'context_used': [result.to_dict() for result in rag_results], 'request_id': request_id})}\n\n"
                            return  # Exit generator completely
            except LLMError as error:
                logger.warning(
                    "chat_stream_failed request_id=%s model=%s error_type=%s",
                    request_id,
                    ACTIVE_MODEL,
                    error.kind,
                )
                yield f"data: {json.dumps({'error': error.user_message, 'code': error.kind, 'request_id': request_id})}\n\n"
                return
            except Exception as error:
                logger.exception(
                    "chat_stream_failed request_id=%s model=%s error_type=%s",
                    request_id,
                    ACTIVE_MODEL,
                    type(error).__name__,
                )
                yield f"data: {json.dumps({'error': '服务暂时出现异常，请稍后重试。', 'code': 'internal_error', 'request_id': request_id})}\n\n"
                return

    return StreamingResponse(generate(), media_type="text/event-stream")


@app.post("/api/mood")
async def log_mood(req: MoodRequest):
    sessions.add_mood(req.session_id, req.score, req.note)
    return {
        "status": "ok",
        "mood_log": sessions.get_or_create(req.session_id)["mood_log"],
    }


@app.post("/api/tts")
async def synthesize_tts(req: TTSRequest):
    text = (req.text or "").strip()
    if not text:
        raise HTTPException(400, "Text is required")

    safe_text = " ".join(text.split())[:1500]

    try:
        import edge_tts
    except ImportError as exc:
        raise HTTPException(500, "Microsoft TTS backend is not installed") from exc

    audio_chunks = []
    try:
        communicate = edge_tts.Communicate(
            text=safe_text,
            voice=get_tts_voice(req.language, req.voice),
        )
        async for chunk in communicate.stream():
            if chunk.get("type") == "audio":
                audio_chunks.append(chunk.get("data", b""))
    except Exception as exc:
        raise HTTPException(500, f"TTS synthesis failed: {str(exc)}") from exc

    audio_data = b"".join(audio_chunks)
    if not audio_data:
        raise HTTPException(500, "TTS synthesis returned no audio")

    return Response(
        content=audio_data,
        media_type="audio/mpeg",
        headers={"Cache-Control": "no-store"},
    )


@app.get("/api/mood/{session_id}")
async def get_mood(session_id: str):
    session = sessions.get_or_create(session_id)
    return {"mood_log": session["mood_log"]}


@app.post("/api/thoughts")
async def add_thought_record(req: ThoughtRecordRequest):
    sessions.add_thought_record(
        req.session_id,
        req.situation,
        req.thought,
        req.emotion,
        req.intensity,
        req.distortion,
        req.rational_response,
    )
    return {
        "status": "ok",
        "thought_records": sessions.get_or_create(req.session_id)["thought_records"],
    }


@app.get("/api/thoughts/{session_id}")
async def get_thought_records(session_id: str):
    session = sessions.get_or_create(session_id)
    return {"thought_records": session.get("thought_records", [])}


@app.put("/api/thoughts/{thought_id}")
async def update_thought_record(thought_id: int, req: ThoughtRecordUpdateRequest):
    updated = sessions.update_thought_record(
        thought_id,
        req.session_id,
        req.situation,
        req.thought,
        req.emotion,
        req.intensity,
        req.distortion,
        req.rational_response,
    )
    if not updated:
        raise HTTPException(status_code=404, detail="Thought record not found")

    return {
        "status": "ok",
        "thought_records": sessions.get_or_create(req.session_id)["thought_records"],
    }


@app.get("/api/session/{session_id}")
async def get_session(session_id: str):
    return sessions.get_or_create(session_id)


@app.post("/api/session/{session_id}/save")
async def save_session(session_id: str):
    sessions.save_session(session_id)
    return {"status": "saved"}


# DATA SYNC ENDPOINTS


@app.post("/api/sync/sleep")
async def sync_sleep(req: SyncRequest):
    sessions.sync_sleep_logs(req.session_id, req.items)
    return {"status": "ok"}


@app.post("/api/sync/tests")
async def sync_tests(req: SyncRequest):
    sessions.sync_test_results(req.session_id, req.items)
    return {"status": "ok"}


@app.post("/api/sync/activities")
async def sync_activities(req: SyncRequest):
    sessions.sync_activities(req.session_id, req.items)
    return {"status": "ok"}


# ─── INSIGHTS ENDPOINT ───────────────────────────────────────────


class InsightsRequest(BaseModel):
    session_id: str = "default"
    lang: str = "ru"
    mood_log: list[dict] = []
    sleep_log: list[dict] = []
    activities: list[dict] = []
    phq_history: list[dict] = []
    gad_history: list[dict] = []
    thought_records: list[dict] = []


def _build_insights_prompt(req: InsightsRequest) -> str:
    """Build a data summary for the LLM, only including sections that have real data."""
    en = req.lang == "en"
    sections = []

    # IMPORTANT: we only include a section if data actually exists.
    # Absence of data = not tracked, NOT a negative signal.

    if req.mood_log:
        recent = sorted(req.mood_log, key=lambda x: x.get("date", ""), reverse=True)[:14]
        scores = [e.get("score") for e in recent if e.get("score") is not None]
        if scores:
            avg = round(sum(scores) / len(scores), 1)
            if en:
                sections.append(
                    f"MOOD (from mood journal — {len(scores)} entries over recent days):\n"
                    f"  Average score: {avg}/10. Scores: {scores[:10]}"
                )
            else:
                sections.append(
                    f"НАСТРОЕНИЕ (из записей дневника настроения — {len(scores)} оценок за последние дни):\n"
                    f"  Средняя оценка: {avg}/10. Оценки: {scores[:10]}"
                )

    if req.sleep_log:
        recent_sleep = sorted(req.sleep_log, key=lambda x: x.get("isoDate", ""), reverse=True)[:7]
        sleep_info = []
        for s in recent_sleep:
            hours = s.get("hours") or s.get("duration")
            quality = s.get("quality")
            if hours or quality:
                if en:
                    sleep_info.append(f"hours slept: {hours}, quality: {quality}")
                else:
                    sleep_info.append(f"часов сна: {hours}, качество: {quality}")
        if sleep_info:
            if en:
                sections.append(
                    f"SLEEP (sleep journal — {len(sleep_info)} days):\n  " +
                    "\n  ".join(sleep_info)
                )
            else:
                sections.append(
                    f"СОН (записи дневника сна — {len(sleep_info)} дней):\n  " +
                    "\n  ".join(sleep_info)
                )

    if req.activities:
        done = [a for a in req.activities if a.get("done")]
        pending = [a for a in req.activities if not a.get("done")]
        if en:
            sections.append(
                f"ACTIVITIES (planner): completed {len(done)}, pending/planned {len(pending)}"
            )
        else:
            sections.append(
                f"АКТИВНОСТИ (планировщик): выполнено {len(done)}, не выполнено/в плане {len(pending)}"
            )

    if req.phq_history:
        recent_phq = sorted(req.phq_history, key=lambda x: x.get("date", ""), reverse=True)[:3]
        phq_info = [f"PHQ-9: {e.get('score')} ({e.get('date', '')[:10]})" for e in recent_phq]
        if en:
            sections.append("PHQ-9 TESTS (depression):\n  " + "\n  ".join(phq_info))
        else:
            sections.append("ТЕСТЫ PHQ-9 (депрессия):\n  " + "\n  ".join(phq_info))

    if req.gad_history:
        recent_gad = sorted(req.gad_history, key=lambda x: x.get("date", ""), reverse=True)[:3]
        gad_info = [f"GAD-7: {e.get('score')} ({e.get('date', '')[:10]})" for e in recent_gad]
        if en:
            sections.append("GAD-7 TESTS (anxiety):\n  " + "\n  ".join(gad_info))
        else:
            sections.append("ТЕСТЫ GAD-7 (тревога):\n  " + "\n  ".join(gad_info))

    if req.thought_records:
        emotions = [t.get("emotion", "") for t in req.thought_records if t.get("emotion")]
        distortions = [t.get("distortion", "") for t in req.thought_records if t.get("distortion")]
        if en:
            sections.append(
                f"CBT THOUGHT JOURNAL ({len(req.thought_records)} entries):\n"
                f"  Emotions mentioned: {', '.join(emotions[:8])}\n"
                f"  Cognitive distortions: {', '.join(set(distortions[:6]))}"
            )
        else:
            sections.append(
                f"КПТ-ДНЕВНИК МЫСЛЕЙ ({len(req.thought_records)} записей):\n"
                f"  Упомянутые эмоции: {', '.join(emotions[:8])}\n"
                f"  Когнитивные искажения: {', '.join(set(distortions[:6]))}"
            )

    if not sections:
        return None  # No data at all

    data_block = "\n\n".join(sections)

    if en:
        return f"""You are a caring assistant helping a person better understand themselves.
Below is data from their personal journal over recent days. This is only what they have filled in themselves.

CRITICAL RULE: The absence of data in any section means only that the person did not fill in that section — it does NOT mean they slept poorly, were inactive, or were in a bad mood. Never draw conclusions from missing data.

Data:
{data_block}

Task: Write 2–3 gentle observations in English, based ONLY on what is present in the data above.
Rules:
- Use phrases like: "it seems", "possibly", "it looks like", "interestingly", "noticeably", "based on the entries"
- Do NOT make diagnoses or definitive conclusions
- You may end an observation with a gentle question
- Each observation is a separate paragraph, 1–2 sentences
- Tone: warm, like an attentive friend, not a doctor
- Reply only in English, no headings, no bullet lists — just paragraphs

If there is too little data for meaningful observations, write one gentle sentence about that."""
    else:
        return f"""你是一名温暖、专业的心理助手，帮助用户更好地理解自己。

下面是用户个人记录的数据。

重要规则：
- 只能根据提供的数据进行观察。
- 不要根据缺失数据做推断。
- 不进行医学诊断。
- 使用温和、支持性的中文表达。

数据：
{data_block}

任务：
根据已有数据写出2-3条温和的观察。
每条观察1-2句话。
语气像一位细心的朋友，而不是医生。
"""


@app.post("/api/insights")
async def generate_insights(req: InsightsRequest):
    """Generate soft AI observations based only on available user data."""
    en = req.lang == "en"
    prompt = _build_insights_prompt(req)

    if prompt is None:
        if en:
            no_data_msg = (
                "Not enough data for observations yet — "
                "the more you fill in your journal, the better I can notice patterns."
            )
        else:
            no_data_msg = (
                "Пока данных для наблюдений немного — чем больше ты заполняешь дневник, "
                "тем точнее я смогу замечать паттерны."
            )
        return {"insights": no_data_msg, "has_data": False}

    user_prompt = "Write the observations." if en else "Напиши наблюдения."
    messages = [
        {"role": "system", "content": prompt},
        {"role": "user", "content": user_prompt},
    ]

    try:
        resp = await llm_client.chat(
            messages,
            options=LLM_OPTIONS,
        )
        text = resp.get("content", "").strip()
        if not text:
            text = (
                "Nothing definitive to notice yet — keep filling in your journal."
                if en else
                "Пока сложно заметить что-то определённое — продолжай вести записи."
            )
        return {"insights": text, "has_data": True}
    except Exception as e:
        err_msg = (
            "Could not fetch insights right now."
            if en else
            "Не удалось получить наблюдения прямо сейчас."
        )
        return {"insights": err_msg, "has_data": False, "error": str(e)}

@app.get("/api/knowledge/search")
async def search_knowledge(q: str, top_k: int = 3):
    if not rag_service.enabled or not rag_service.available:
        raise HTTPException(
            status_code=503,
            detail={
                "code": "rag_unavailable",
                "message": "知识库检索当前不可用，普通聊天仍可继续。",
            },
        )
    results = await rag_service.retrieve(q, top_k=max(1, min(top_k, 10)))
    return {
        "query": q,
        "results": [
            {
                "title": result.chunk.title,
                "source": result.chunk.source,
                "score": round(result.score, 4),
                "preview": result.chunk.text[:300],
            }
            for result in results
        ],
    }


@app.get("/api/health")
async def health():
    return {
        "status": "ok",
        "version": __version__,
        "provider": "Ollama" if LLM_PROVIDER == "ollama" else "DeepSeek",
        "model": ACTIVE_MODEL,
        **rag_service.status(),
    }

@app.get("/api/report/{session_id}")
async def get_session_report(session_id: str, lang: str = "zh"):
    import datetime

    if lang not in {"zh", "en", "ru"}:
        lang = "zh"

    report_i18n = {
        "zh": {
            "report_title": "CBT 心理记录报告",
            "report_date": "生成时间",
            "session_id": "会话标识",
            "summary_section": "治疗摘要（长期记忆）",
            "summary_empty": "暂未生成摘要。",
            "mood_section": "最近情绪评分",
            "thought_section": "思维日记（最近记录）",
            "tests_section": "心理测试结果",
            "no_data": "暂无数据。",
            "situation": "情境",
            "thought": "自动化想法",
            "emotion": "情绪",
            "distortion": "认知偏差",
            "rational_response": "平衡想法",
            "points": "分",
            "footer": "本报告由 CBT 心理助手自动生成，不构成医学诊断。",
        },

        "en": {
            "report_title": "CBT Psychological Record",
            "report_date": "Generated at",
            "session_id": "Session ID",
            "summary_section": "Therapy Summary (Long-Term Memory)",
            "summary_empty": "No summary has been generated yet.",
            "mood_section": "Recent Mood Ratings",
            "thought_section": "Thought Diary (Recent Entries)",
            "tests_section": "Psychological Assessment Results",
            "no_data": "No data.",
            "situation": "Situation",
            "thought": "Automatic thought",
            "emotion": "Emotion",
            "distortion": "Cognitive distortion",
            "rational_response": "Balanced response",
            "points": "points",
            "footer": "Generated by CBT Assistant. This report is not a medical diagnosis.",
        },

        "ru": {
            "report_title": "Отчёт КПТ",
            "report_date": "Дата формирования",
            "session_id": "Идентификатор сессии",
            "summary_section": "Резюме терапии (долгосрочная память)",
            "summary_empty": "Резюме еще не сформировано.",
            "mood_section": "Последние оценки настроения",
            "thought_section": "Дневник мыслей (последние записи)",
            "tests_section": "Психологические тесты",
            "no_data": "Нет данных.",
            "situation": "Ситуация",
            "thought": "Мысль",
            "emotion": "Эмоция",
            "distortion": "Искажения",
            "rational_response": "Рациональный ответ",
            "points": "баллов",
            "footer": "Отчёт сформирован КПТ-ассистентом и не является медицинским заключением.",
        },
    }

    t = report_i18n[lang]

    session = sessions.get_or_create(session_id)

    summary = session.get("summary") or t["summary_empty"]
    mood_log = session.get("mood_log", [])
    thought_records = session.get("thought_records", [])

    report_lines = []

    report_lines.append(t["report_title"])
    report_lines.append("=" * 40)
    report_lines.append(
        f"{t['report_date']}: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M')}"
    )
    report_lines.append(f"{t['session_id']}: {session_id}")
    report_lines.append("")

    report_lines.append(f"--- {t['summary_section']} ---")
    report_lines.append(summary)
    report_lines.append("")

    report_lines.append(f"--- {t['mood_section']} ---")

    if not mood_log:
        report_lines.append(t["no_data"])

    for m in mood_log[-10:]:
        timestamp = str(m.get("timestamp") or "")[:19]
        score = m.get("score", "—")
        note = m.get("note", "")

        report_lines.append(
            f"{timestamp}: {score}/10"
            + (f" - {note}" if note else "")
        )

    report_lines.append("")
    report_lines.append(f"--- {t['thought_section']} ---")

    if not thought_records:
        report_lines.append(t["no_data"])

    for tr in thought_records[-5:]:
        timestamp = str(tr.get("timestamp") or "")[:19]

        report_lines.append(f"[{timestamp}]")
        report_lines.append(
            f"{t['situation']}: {tr.get('situation', '')}"
        )
        report_lines.append(
            f"{t['thought']}: {tr.get('thought', '')}"
        )
        report_lines.append(
            f"{t['emotion']}: {tr.get('emotion', '')} "
            f"({tr.get('intensity', '')}/10)"
        )
        report_lines.append(
            f"{t['distortion']}: {tr.get('distortion', '')}"
        )
        report_lines.append(
            f"{t['rational_response']}: "
            f"{tr.get('rational_response', '')}"
        )

        report_lines.append("-" * 20)

    tests = sessions.get_tests(session_id)

    report_lines.append("")
    report_lines.append(f"--- {t['tests_section']} ---")

    if not tests:
        report_lines.append(t["no_data"])

    for test in tests[:5]:
        iso_date = str(test.get("iso_date") or "")[:10]
        test_name = test.get("test_name", "—")
        score = test.get("score", "—")
        level = test.get("level") or "—"

        report_lines.append(
            f"[{iso_date}] "
            f"{test_name}: "
            f"{score} {t['points']} "
            f"({level})"
        )

    report_lines.append("")
    report_lines.append("-" * 40)
    report_lines.append(t["footer"])

    report_content = "\n".join(report_lines)

    return PlainTextResponse(
        report_content,
        media_type="text/plain; charset=utf-8",
        headers={
            "Content-Disposition":
                f"attachment; filename=cbt_report_{session_id}.txt"
        }
    )


# ─── WebSocket ───────────────────────────────────────────────────


@app.websocket("/ws/chat/{session_id}")
async def websocket_chat(websocket: WebSocket, session_id: str):
    origin = websocket.headers.get("origin")
    if origin and origin.rstrip("/") not in APP_ALLOWED_ORIGINS:
        logger.warning("websocket_rejected reason=origin_not_allowed")
        await websocket.close(code=1008)
        return
    await websocket.accept()

    try:
        while True:
            data = await websocket.receive_json()

            if data.get("type") == "message":
                request_id = uuid.uuid4().hex[:12]
                user_msg = data["content"]

                crisis = assess_crisis(user_msg, data.get("language", "zh"))
                if crisis:
                    _persist_crisis_response(
                        session_id, user_msg, crisis, request_id, "websocket"
                    )
                    await websocket.send_json(
                        {"type": "token", "content": crisis.response}
                    )
                    await websocket.send_json(
                        {
                            "type": "done",
                            "content": crisis.response,
                            "request_id": request_id,
                            "safety": crisis.to_public_dict(),
                        }
                    )
                    continue

                session = sessions.get_or_create(session_id)
                memory_context = memory_service.build_context(session_id, user_msg)
                system_prompt = prompt_manager.build_system_prompt(
                    [], session.get("mood_log"), session.get("thought_records")
                )

                sessions.add_message(session_id, "user", user_msg)

                messages = [{"role": "system", "content": system_prompt}]
                for msg in memory_context.recent_messages:
                    messages.append({"role": msg["role"], "content": msg["content"]})
                if memory_context.reference_message:
                    messages.append({"role": "user", "content": memory_context.reference_message})
                messages.append({"role": "user", "content": user_msg})

                full_response = ""
                assistant_reply = ""
                try:
                    async for chunk in llm_client.chat_stream(
                        messages,
                        options=LLM_OPTIONS,
                        request_id=request_id,
                    ):
                        token = chunk.get("message", {}).get("content", "")
                        if token:
                            full_response += token
                            assistant_reply += token # Accumulate for saving
                            await websocket.send_json(
                                {"type": "token", "content": token}
                            )
                        if chunk.get("done"):
                            clean = ContentCleaner.strip_think_tags(full_response)
                            # Save assistant response
                            sessions.add_message(session_id, "assistant", clean)
                            
                            await memory_service.after_response(session_id, user_msg)
                            await websocket.send_json(
                                {
                                    "type": "done",
                                    "content": clean,
                                    "request_id": request_id,
                                }
                            )
                except LLMError as error:
                    logger.warning(
                        "websocket_chat_failed request_id=%s model=%s error_type=%s",
                        request_id,
                        ACTIVE_MODEL,
                        error.kind,
                    )
                    await websocket.send_json(
                        {
                            "type": "error",
                            "content": error.user_message,
                            "code": error.kind,
                            "request_id": request_id,
                        }
                    )
                except Exception as error:
                    logger.exception(
                        "websocket_chat_failed request_id=%s model=%s error_type=%s",
                        request_id,
                        ACTIVE_MODEL,
                        type(error).__name__,
                    )
                    await websocket.send_json(
                        {
                            "type": "error",
                            "content": "服务暂时出现异常，请稍后重试。",
                            "code": "internal_error",
                            "request_id": request_id,
                        }
                    )

            elif data.get("type") == "mood":
                sessions.add_mood(session_id, data["score"], data.get("note", ""))
                await websocket.send_json(
                    {
                        "type": "mood_logged",
                        "mood_log": sessions.get_or_create(session_id)["mood_log"],
                    }
                )
    except WebSocketDisconnect:
        sessions.save_session(session_id)


# Serve static frontend at the very end to catch all non-API paths
if FRONTEND_DIR.exists():
    app.mount("/", StaticFiles(directory=str(FRONTEND_DIR), html=True), name="frontend")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host=APP_HOST, port=APP_PORT)
