const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const frontend = path.join(__dirname, '..', 'frontend', 'js');
const browserKeys = [
    'moodLog', 'sleepLog', 'activities', 'phqHistory', 'gadHistory',
    'esteemHistory', 'sosCrisisPlan', 'notifSettings', 'ttsSettings', 'APP_LANG'
];

function makeBrowser(initial = {}, fetchImpl = async () => ({ ok: true })) {
    const values = new Map(Object.entries(initial));
    const elements = new Map();
    const alerts = [];
    let reloads = 0;
    const localStorage = {
        getItem: key => values.has(key) ? values.get(key) : null,
        setItem: (key, value) => values.set(key, String(value)),
        removeItem: key => values.delete(key),
    };
    const document = {
        getElementById: id => elements.get(id) || null,
        createElement: tag => ({ tagName: tag, style: {}, addEventListener() {}, remove() {} }),
        body: { appendChild(element) { if (element.id) elements.set(element.id, element); } },
    };
    const location = { origin: 'http://127.0.0.1:8001', reload() { reloads += 1; } };
    const context = vm.createContext({
        window: { location, addEventListener() {}, setTimeout, clearTimeout,
            CBTSecurity: { renderBasicMessage: value => value } },
        location, document, localStorage, navigator: { onLine: true },
        fetch: fetchImpl, alert: message => alerts.push(message), confirm: () => true,
        console: { error() {}, warn() {} }, TextDecoder, DOMException,
        AbortController, setTimeout, clearTimeout,
    });
    function load(file) {
        vm.runInContext(fs.readFileSync(path.join(frontend, file), 'utf8'), context, { filename: file });
    }
    return { context, values, elements, alerts, load, reloads: () => reloads };
}

function streamFromWire(wire, width = 3) {
    const bytes = new TextEncoder().encode(wire);
    return {
        ok: true,
        body: new ReadableStream({
            start(controller) {
                for (let index = 0; index < bytes.length; index += width) {
                    controller.enqueue(bytes.slice(index, index + width));
                }
                controller.close();
            }
        })
    };
}

test('stream parser handles UTF-8 and CRLF split across chunks', async () => {
    const browser = makeBrowser();
    browser.load('chat_manager.js');
    const read = vm.runInContext('readChatStream', browser.context);
    const tokens = [];
    const wire = 'data: {"token":"你好"}\r\n\r\ndata: {"done":true,"full_response":"你好","client_events":[]}\r\n\r\n';
    const result = await read(streamFromWire(wire), new AbortController().signal,
        token => tokens.push(token));
    assert.equal(result.full_response, '你好');
    assert.deepEqual(tokens, ['你好']);
});

test('cancelling after a tool event cannot consume the final client event', async () => {
    const browser = makeBrowser();
    browser.load('chat_manager.js');
    const read = vm.runInContext('readChatStream', browser.context);
    const controller = new AbortController();
    const wire = 'data: {"tool_call":"add_activity"}\n\n'
        + 'data: {"done":true,"full_response":"已添加","client_events":[{"type":"add_activity"}]}\n\n';
    await assert.rejects(read(streamFromWire(wire, 999), controller.signal,
        token => { if (token.includes('正在读取')) controller.abort(); }),
    error => error.name === 'AbortError');
});

test('completed stream keeps the assistant message in the chat', () => {
    const browser = makeBrowser();
    browser.load('chat_manager.js');
    const content = { innerHTML: '' };
    const loading = {
        id: 'loading', querySelector() { return content; },
        removeAttribute(name) {
            if (name === 'id') {
                this.id = '';
                browser.elements.delete('loading');
            }
        }
    };
    browser.elements.set('loading', loading);
    const complete = vm.runInContext('completeStreamMessage', browser.context);
    complete('最终回复');
    assert.equal(content.innerHTML, '最终回复');
    assert.equal(loading.id, '');
});

test('sync failure is visible and retry sends the latest local data', async () => {
    let attempts = 0;
    const bodies = [];
    const browser = makeBrowser({ SESSION_ID: 'current', sleepLog: '[{"id":"first"}]' },
        async (_url, options) => {
            bodies.push(JSON.parse(options.body));
            attempts += 1;
            return { ok: attempts > 1, status: 503 };
        });
    browser.load('api.js');
    const sync = vm.runInContext('syncData', browser.context);
    const retry = vm.runInContext('retryFailedSyncs', browser.context);
    assert.equal(await sync('/api/sync/sleep', 'sleepLog'), false);
    assert.equal(browser.elements.get('syncStatus').hidden, false);
    browser.values.set('sleepLog', '[{"id":"second"}]');
    await retry();
    assert.equal(bodies[1].items[0].id, 'second');
    assert.equal(browser.elements.get('syncStatus').hidden, true);
});

test('sync skips absent keys and serializes updates to the same list', async () => {
    let completeFirst;
    const calls = [];
    const browser = makeBrowser({ SESSION_ID: 'current', sleepLog: '[{"id":"first"}]' },
        async (_url, options) => {
            calls.push(JSON.parse(options.body));
            if (calls.length === 1) await new Promise(resolve => { completeFirst = resolve; });
            return { ok: true };
        });
    browser.load('api.js');
    const sync = vm.runInContext('syncData', browser.context);
    const first = sync('/api/sync/sleep', 'sleepLog');
    await new Promise(resolve => setImmediate(resolve));
    browser.values.set('sleepLog', '[{"id":"second"}]');
    const second = sync('/api/sync/sleep', 'sleepLog');
    assert.equal(calls.length, 1);
    completeFirst();
    await Promise.all([first, second]);
    assert.deepEqual(calls.map(call => call.items[0].id), ['first', 'second']);
    browser.values.delete('sleepLog');
    assert.equal(await sync('/api/sync/sleep', 'sleepLog'), false);
    assert.equal(calls.length, 2);
});

function backupFile(browserOverrides = {}, tables = {}) {
    const browser = Object.fromEntries(browserKeys.map(key => [key, null]));
    Object.assign(browser, browserOverrides);
    const backup = {
        format: 'cbt-assistant-backup-v1', session_id: 'old-session', browser,
        server: {
            session_id: 'old-session', created_at: '2026-09-01',
            tables: { messages: [], mood_logs: [], thought_records: [], sleep_logs: [],
                tests: [], activities: [], session_summaries: [], conversation_memories: [],
                ...tables }
        }
    };
    return { size: 100, text: async () => JSON.stringify(backup) };
}

test('restore targets the current session and fills absent browser records', async () => {
    let target;
    let body;
    const browser = makeBrowser({ SESSION_ID: 'current' }, async (url, options) => {
        target = url;
        body = JSON.parse(options.body);
        return { ok: true };
    });
    browser.load('api.js');
    browser.load('data_backup.js');
    const restore = vm.runInContext('restoreDataBackup', browser.context);
    await restore(backupFile({}, {
        messages: [{ session_id: 'old-session', role: 'user', content: 'hi' }],
        sleep_logs: [{ session_id: 'old-session', bed: '22:00', iso_date: '2026-09-01' }]
    }));
    assert.match(target, /\/api\/data\/current$/);
    assert.equal(body.snapshot.session_id, 'current');
    assert.equal(body.snapshot.tables.messages[0].session_id, 'current');
    assert.equal(body.snapshot.tables.sleep_logs[0].session_id, 'current');
    assert.equal(browser.values.get('SESSION_ID'), 'current');
    assert.equal(JSON.parse(browser.values.get('sleepLog'))[0].bed, '22:00');
    assert.equal(browser.values.get('CBT_RESTORED_SESSION'), 'current');
    assert.equal(browser.values.has('CBT_SYNC_SUSPENDED'), false);
    assert.equal(browser.reloads(), 1);
});

test('failed restore rolls back browser state and resumes sync', async () => {
    const browser = makeBrowser({ SESSION_ID: 'current', sleepLog: '[{"id":"keep"}]' },
        async () => ({ ok: false, status: 503 }));
    browser.load('api.js');
    browser.load('data_backup.js');
    const restore = vm.runInContext('restoreDataBackup', browser.context);
    await restore(backupFile({ sleepLog: '[{"id":"replace"}]' }));
    assert.equal(browser.values.get('sleepLog'), '[{"id":"keep"}]');
    assert.equal(browser.values.has('CBT_SYNC_SUSPENDED'), false);
    assert.equal(browser.values.has('CBT_RESTORED_SESSION'), false);
    assert.equal(browser.reloads(), 0);
    assert.equal(browser.alerts.length, 1);
});

test('clear removes browser records and creates a new session on reload', async () => {
    const methods = [];
    const browser = makeBrowser({ SESSION_ID: 'current', sleepLog: '[{"id":"old"}]' },
        async (_url, options) => { methods.push(options.method); return { ok: true }; });
    browser.load('api.js');
    browser.load('data_backup.js');
    const clear = vm.runInContext('clearAllMyData', browser.context);
    await clear();
    assert.deepEqual(methods, ['DELETE']);
    assert.equal(browser.values.has('SESSION_ID'), false);
    assert.equal(browser.values.has('sleepLog'), false);
    assert.equal(browser.values.has('CBT_SYNC_SUSPENDED'), false);
    assert.equal(browser.reloads(), 1);
});

test('clear waits for an in-flight sync before deleting the session', async () => {
    let finishPost;
    const methods = [];
    const browser = makeBrowser({ SESSION_ID: 'current', sleepLog: '[{"id":"old"}]' },
        async (_url, options) => {
            methods.push(options.method);
            if (options.method === 'POST') {
                await new Promise(resolve => { finishPost = resolve; });
            }
            return { ok: true };
        });
    browser.load('api.js');
    browser.load('data_backup.js');
    const sync = vm.runInContext('syncData', browser.context);
    const clear = vm.runInContext('clearAllMyData', browser.context);
    const posting = sync('/api/sync/sleep', 'sleepLog');
    await new Promise(resolve => setImmediate(resolve));
    const clearing = clear();
    await new Promise(resolve => setImmediate(resolve));
    assert.deepEqual(methods, ['POST']);
    finishPost();
    await Promise.all([posting, clearing]);
    assert.deepEqual(methods, ['POST', 'DELETE']);
    assert.equal(browser.values.has('sleepLog'), false);
});

test('restored session skips startup sync on every refresh', () => {
    const saved = { SESSION_ID: 'current', CBT_RESTORED_SESSION: 'current',
        sleepLog: '[]', activities: '[]', phqHistory: '[]' };
    for (let refresh = 0; refresh < 2; refresh += 1) {
        const browser = makeBrowser(saved);
        browser.load('api.js');
        const calls = [];
        browser.context.syncData = (...args) => calls.push(args);
        browser.context.syncTests = () => calls.push('tests');
        browser.context.lucide = { createIcons() {} };
        browser.context.checkH = () => {};
        browser.context.updateWelcomeMsg = () => {};
        let ready;
        browser.context.document.addEventListener = (_event, callback) => { ready = callback; };
        browser.context.document.getElementById = id => {
            if (id === 'msgInput') return { style: {}, addEventListener() {} };
            if (id === 'messages') return { prepend() {} };
            return null;
        };
        browser.load('main.js');
        ready();
        assert.deepEqual(calls, []);
    }
});

test('HTML loads API, backup, chat and startup scripts in that order', () => {
    const html = fs.readFileSync(path.join(__dirname, '..', 'frontend', 'index.html'), 'utf8');
    const scripts = ['js/api.js', 'js/data_backup.js', 'js/chat_manager.js', 'js/main.js'];
    const positions = scripts.map(script => html.indexOf(`src="${script}`));
    assert.ok(positions.every(position => position >= 0));
    assert.ok(positions.every((position, index) => index === 0 || position > positions[index - 1]));
});

test('stop action aborts the active stream and records cancellation', () => {
    const browser = makeBrowser();
    browser.load('chat_manager.js');
    const controller = new AbortController();
    browser.context.currentController = controller;
    vm.runInContext('isProc = true; activeChatController = currentController; handleChatAction();', browser.context);
    assert.equal(controller.signal.aborted, true);
    assert.equal(vm.runInContext('chatWasCancelled', browser.context), true);
});
