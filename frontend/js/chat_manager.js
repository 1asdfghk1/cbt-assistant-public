// A local model may need time to load and complete two tool-call rounds.
const CHAT_REQUEST_TIMEOUT_MS = 300000;
let activeChatController = null;

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
    if (sendButton) sendButton.disabled = processing;
    document.getElementById('mainContainer')?.setAttribute('aria-busy', String(processing));
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

        let res = await fetch(API + '/api/chat', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: txt, session_id: SESSION_ID, language: currentChatLanguage() }),
            signal: controller.signal
        });
        let data = {};
        try {
            data = await res.json();
        } catch (parseError) {
            throw new ChatRequestError('服务返回了无法识别的响应，请稍后重试。', res.status);
        }

        if (!res.ok) {
            const detail = data?.detail;
            const message = typeof detail?.message === 'string'
                ? detail.message
                : (res.status === 429
                    ? 'AI 服务当前请求较多，请稍后再试。'
                    : 'AI 服务暂时不可用，请稍后重试。');
            throw new ChatRequestError(message, res.status, detail?.code || '');
        }

        if (typeof data.response !== 'string' || !data.response.trim()) {
            throw new ChatRequestError('AI 服务没有返回有效内容，请重新尝试。', 502, 'empty_response');
        }

        addMsg('assistant', data.response);
        applyChatClientEvents(data.client_events);

        if (
            window.isTTSEnabled
            && window.isTTSEnabled()
            && window.playAssistantSpeech
        ) {
            try {
                await window.playAssistantSpeech(data.response, currentChatLanguage());
            } catch (ttsError) {
                console.warn('TTS failed after a successful text response.', ttsError);
            }
        }
    } catch (e) {
        if (e?.name !== 'AbortError') console.error('CHAT ERROR:', e);
        if (!inEl.value) inEl.value = txt;
        addMsg('assistant', '⚠️ ' + getChatErrorMessage(e, timedOut));
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
}
