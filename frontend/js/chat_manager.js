// A local model may need time to load and complete two tool-call rounds.
const CHAT_REQUEST_TIMEOUT_MS = 300000;
let activeChatController = null;
let chatWasCancelled = false;

class ChatRequestError extends Error {
    constructor(message, status = 0, code = '') {
        super(message);
        this.name = 'ChatRequestError';
        this.status = status;
        this.code = code;
    }
}

function sendQuick(txt) {
    if (isProc) return;
    document.getElementById('msgInput').value = txt;
    sendMessage();
}

function currentChatLanguage() {
    return (window.getCurrentLanguage && window.getCurrentLanguage()) || 'zh';
}

function setChatProcessing(processing, inputElement) {
    isProc = processing;
    const sendButton = document.getElementById('sendBtn');
    if (inputElement) inputElement.disabled = processing;
    if (sendButton) {
        sendButton.disabled = false;
        sendButton.title = processing ? '停止生成' : '发送消息';
        sendButton.innerHTML = processing
            ? '<i data-lucide="square" style="width:18px"></i>'
            : '<i data-lucide="arrow-up" style="width:18px"></i>';
        if (window.lucide) lucide.createIcons();
    }
    document.getElementById('mainContainer')?.setAttribute('aria-busy', String(processing));
}

function handleChatAction() {
    if (isProc) {
        chatWasCancelled = true;
        activeChatController?.abort();
    } else {
        sendMessage();
    }
}

function updateStreamMessage(content) {
    const loading = document.getElementById('loading');
    if (!loading) return;
    const text = loading.querySelector('.msg-content');
    if (text) text.innerHTML = window.CBTSecurity.renderBasicMessage(content);
    const list = document.getElementById('messages');
    if (list) list.scrollTop = list.scrollHeight;
}

function completeStreamMessage(content) {
    const loading = document.getElementById('loading');
    if (!loading) return addMsg('assistant', content);
    loading.removeAttribute('id');
    const text = loading.querySelector('.msg-content');
    if (text) text.innerHTML = window.CBTSecurity.renderBasicMessage(content);
    return loading;
}

function normalizeSsePending(text) {
    const hasTrailingCR = text.endsWith('\r');
    const complete = hasTrailingCR ? text.slice(0, -1) : text;
    return complete.replace(/\r\n|\r/g, '\n') + (hasTrailingCR ? '\r' : '');
}

async function readChatStream(response, signal, onToken) {
    if (!response.ok) throw new ChatRequestError('AI 服务暂时不可用，请稍后重试。', response.status);
    if (!response.body) throw new ChatRequestError('浏览器无法读取流式回复，请稍后重试。');
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let pending = '';
    let fullText = '';
    try {
        while (true) {
            const { value, done } = await reader.read();
            if (signal.aborted) throw new DOMException('Cancelled', 'AbortError');
            pending += done ? decoder.decode() : decoder.decode(value, { stream: true });
            pending = done ? pending.replace(/\r\n|\r/g, '\n') : normalizeSsePending(pending);
            let boundary;
            while ((boundary = pending.indexOf('\n\n')) !== -1) {
                const block = pending.slice(0, boundary);
                pending = pending.slice(boundary + 2);
                const data = block.split('\n').filter(line => line.startsWith('data:'))
                    .map(line => line.slice(5).trimStart()).join('\n');
                if (!data) continue;
                if (signal.aborted) throw new DOMException('Cancelled', 'AbortError');
                let event;
                try {
                    event = JSON.parse(data);
                } catch (error) {
                    throw new ChatRequestError('服务返回了无法识别的流式数据。', 502);
                }
                if (event.error) throw new ChatRequestError(event.error, 502, event.code || '');
                if (event.tool_call) {
                    fullText = '';
                    onToken('正在读取记录…');
                }
                if (event.token) {
                    fullText += event.token;
                    // Never display an unfinished reasoning tag from a model.
                    const visible = fullText.replace(/<think>[\s\S]*?<\/think>/g, '')
                        .replace(/<think>[\s\S]*$/g, '');
                    if (visible.trim()) onToken(visible);
                }
                if (event.done) {
                    return event;
                }
            }
            if (done) break;
        }
        throw new ChatRequestError('流式回复意外中断。', 502);
    } finally {
        try { await reader.cancel(); } catch (error) { /* Connection may already be closed. */ }
        reader.releaseLock();
    }
}

function getChatErrorMessage(error, timedOut) {
    if (timedOut) return 'AI 服务响应超时，请稍后重试。';
    if (error?.name === 'AbortError') return '本次请求已取消。';
    if (error instanceof ChatRequestError) return error.message;
    if (!navigator.onLine || error instanceof TypeError) {
        return '网络连接失败，请检查网络后重试。';
    }
    return '请求失败，请稍后重试。';
}

function applyChatClientEvents(events) {
    if (!Array.isArray(events)) return;
    events.forEach(ev => {
        try {
            if (ev.type === 'add_activity' && window.addActivityFromAI) {
                window.addActivityFromAI(ev.text);
            } else if (ev.type === 'start_breathing' && window.startBreathingFromAI) {
                window.startBreathingFromAI();
            } else if (ev.type === 'open_test' && window.openTestFromAI) {
                window.openTestFromAI(ev.test_type);
            }
        } catch (eventError) {
            console.warn('Chat client event failed.', ev.type, eventError);
        }
    });
}

async function sendMessage() {
    let inEl = document.getElementById('msgInput');
    let txt = inEl.value.trim();
    if (!txt || isProc) return;

    const controller = new AbortController();
    activeChatController = controller;
    chatWasCancelled = false;
    let timedOut = false;
    const timeoutId = window.setTimeout(() => {
        timedOut = true;
        controller.abort();
    }, CHAT_REQUEST_TIMEOUT_MS);

    setChatProcessing(true, inEl);
    try {
        inEl.value = ''; inEl.style.height = 'auto';

        document.getElementById('welcome')?.remove();
        document.getElementById('mainContainer')?.classList.remove('empty-state');

        addMsg('user', txt);
        addMsg('assistant', '', 'loading');

        let res = await fetch(API + '/api/chat/stream', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: txt, session_id: SESSION_ID, language: currentChatLanguage() }),
            signal: controller.signal
        });
        const data = await readChatStream(res, controller.signal, updateStreamMessage);
        if (controller.signal.aborted) throw new DOMException('Cancelled', 'AbortError');
        if (typeof data.full_response !== 'string' || !data.full_response.trim()) {
            throw new ChatRequestError('AI 服务没有返回有效内容，请重新尝试。', 502, 'empty_response');
        }

        completeStreamMessage(data.full_response);
        applyChatClientEvents(data.client_events);

        if (
            window.isTTSEnabled
            && window.isTTSEnabled()
            && window.playAssistantSpeech
        ) {
            try {
                Promise.resolve(window.playAssistantSpeech(data.full_response, currentChatLanguage()))
                    .catch(ttsError => console.warn('TTS failed after a successful text response.', ttsError));
            } catch (ttsError) {
                console.warn('TTS failed after a successful text response.', ttsError);
            }
        }
    } catch (e) {
        if (e?.name !== 'AbortError') console.error('CHAT ERROR:', e);
        if (!inEl.value) inEl.value = txt;
        document.getElementById('loading')?.remove();
        const message = chatWasCancelled ? '本次生成已停止。' : getChatErrorMessage(e, timedOut);
        addMsg('assistant', '⚠️ ' + message + ' 请求可能已被处理，请先检查记录，再决定是否手动发送。');
    } finally {
        window.clearTimeout(timeoutId);
        document.getElementById('loading')?.remove();
        if (activeChatController === controller) activeChatController = null;
        setChatProcessing(false, inEl);
        if (document.visibilityState !== 'hidden') inEl.focus();
    }
}

window.addEventListener('pagehide', () => {
    activeChatController?.abort();
    activeChatController = null;
});

function addMsg(role, content, id = '') {
    let list = document.getElementById('messages');
    let div = document.createElement('div');
    div.className = 'msg ' + role;
    if (id) div.id = id;

    let avatarIcon = role === 'user' ? 'user' : 'sparkles';
    const parsed = id === 'loading'
        ? '<i data-lucide="loader-2" style="width:20px; animation: spin 1.5s linear infinite; color: var(--gray);"></i>'
        : window.CBTSecurity.renderBasicMessage(content);

    div.innerHTML = `
            <div class="msg-avatar"><i data-lucide="${avatarIcon}" style="width:18px;"></i></div>
            <div class="msg-content">${parsed}</div>
        `;
    list.appendChild(div);
    lucide.createIcons();
    list.scrollTop = list.scrollHeight;
    return div;
}
