const API = window.location.origin;

let sessionId = localStorage.getItem('SESSION_ID');
if (!sessionId) {
    sessionId = 'session_' + Date.now().toString(36);
    localStorage.setItem('SESSION_ID', sessionId);
}
const SESSION_ID = sessionId;
const pageDataRevision = localStorage.getItem('CBT_DATA_REVISION');
let isProc = false;
const failedSyncTasks = new Set();
const syncQueues = new Map();
let retryingSync = false;

function syncIsSuspended() {
    return localStorage.getItem('CBT_SYNC_SUSPENDED') === '1'
        || localStorage.getItem('CBT_DATA_REVISION') !== pageDataRevision;
}

async function withDataWriteLock(callback) {
    if (navigator.locks?.request) {
        return navigator.locks.request(`cbt-assistant-data-${SESSION_ID}`, callback);
    }
    return callback();
}

async function waitForSyncIdle() {
    await Promise.allSettled([...syncQueues.values()]);
}

function showSyncStatus(message, failed = false) {
    let notice = document.getElementById('syncStatus');
    if (!notice) {
        notice = document.createElement('button');
        notice.id = 'syncStatus';
        notice.type = 'button';
        notice.style.cssText = 'position:fixed;bottom:16px;left:16px;z-index:1000;padding:9px 14px;border:1px solid #b45309;border-radius:10px;background:#fff7ed;color:#7c2d12;cursor:pointer';
        notice.addEventListener('click', retryFailedSyncs);
        document.body.appendChild(notice);
    }
    notice.textContent = message;
    notice.hidden = !failed;
}

function readSyncArray(key) {
    const items = JSON.parse(localStorage.getItem(key) || '[]');
    if (!Array.isArray(items)) throw new Error(`${key} is not an array`);
    return items;
}

function postSync(endpoint, storageKey, buildItems) {
    if (syncIsSuspended()) return Promise.resolve(false);
    const previous = syncQueues.get(storageKey) || Promise.resolve();
    const task = previous.then(async () => {
        if (syncIsSuspended()) return false;
        let items;
        try {
            items = buildItems();
        } catch (error) {
            failedSyncTasks.add(storageKey);
            showSyncStatus('本地记录无法读取，请检查浏览器数据', true);
            console.error('Failed to read local records', storageKey, error);
            return false;
        }
        try {
            return await withDataWriteLock(async () => {
                if (syncIsSuspended()) return false;
                const response = await fetch(API + endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ session_id: SESSION_ID, items })
                });
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                failedSyncTasks.delete(storageKey);
                if (!failedSyncTasks.size) showSyncStatus('', false);
                return true;
            });
        } catch (error) {
            failedSyncTasks.add(storageKey);
            showSyncStatus('记录尚未同步到本机服务。点击重试', true);
            console.error('Failed to sync', storageKey, error);
            return false;
        }
    });
    syncQueues.set(storageKey, task);
    void task.then(() => {
        if (syncQueues.get(storageKey) === task) syncQueues.delete(storageKey);
    });
    return task;
}

function syncData(endpoint, storageKey) {
    if (localStorage.getItem(storageKey) === null) return Promise.resolve(false);
    return postSync(endpoint, storageKey, () => readSyncArray(storageKey));
}

function syncTests() {
    if (['phqHistory', 'gadHistory', 'esteemHistory'].every(key => localStorage.getItem(key) === null)) {
        return Promise.resolve(false);
    }
    return postSync('/api/sync/tests', 'tests', () => {
        const phq = readSyncArray('phqHistory').map(t => ({ ...t, name: 'PHQ-9' }));
        const gad = readSyncArray('gadHistory').map(t => ({ ...t, name: 'GAD-7' }));
        const esteem = readSyncArray('esteemHistory').map(t => ({ ...t, name: 'Rosenberg' }));
        return phq.concat(gad, esteem);
    });
}

async function retryFailedSyncs() {
    if (retryingSync || syncIsSuspended()) return;
    retryingSync = true;
    try {
        const pending = [...failedSyncTasks];
        if (pending.includes('sleepLog')) await syncData('/api/sync/sleep', 'sleepLog');
        if (pending.includes('activities')) await syncData('/api/sync/activities', 'activities');
        if (pending.includes('tests')) await syncTests();
    } finally {
        retryingSync = false;
    }
}

window.addEventListener('storage', event => {
    if (event.key === 'CBT_DATA_REVISION' ||
        (event.key === 'SESSION_ID' && event.newValue !== SESSION_ID)) {
        location.reload();
    }
});
