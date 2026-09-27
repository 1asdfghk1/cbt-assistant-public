const CBT_BACKUP_FORMAT = 'cbt-assistant-backup-v1';
const CBT_BROWSER_KEYS = [
    'moodLog', 'sleepLog', 'activities', 'phqHistory', 'gadHistory',
    'esteemHistory', 'sosCrisisPlan', 'notifSettings', 'ttsSettings', 'APP_LANG'
];
const CBT_BROWSER_ARRAY_KEYS = [
    'moodLog', 'sleepLog', 'activities', 'phqHistory', 'gadHistory', 'esteemHistory'
];

function readBrowserBackupState() {
    const browser = {};
    for (const key of CBT_BROWSER_KEYS) browser[key] = localStorage.getItem(key);
    return browser;
}

function replaceBrowserBackupState(browser) {
    for (const key of CBT_BROWSER_KEYS) localStorage.removeItem(key);
    for (const key of CBT_BROWSER_KEYS) {
        if (browser[key] !== null) localStorage.setItem(key, browser[key]);
    }
}

function prepareBackupForCurrentSession(backup) {
    if (backup?.format !== CBT_BACKUP_FORMAT || typeof backup.session_id !== 'string'
        || !backup.session_id || backup.server?.session_id !== backup.session_id
        || !backup.browser || typeof backup.browser !== 'object' || Array.isArray(backup.browser)
        || CBT_BROWSER_KEYS.some(key => !Object.hasOwn(backup.browser, key)
            || (backup.browser[key] !== null && typeof backup.browser[key] !== 'string'))
        || !backup.server.tables || typeof backup.server.tables !== 'object'
        || Array.isArray(backup.server.tables)) {
        throw new Error('Invalid backup format');
    }
    for (const key of CBT_BROWSER_ARRAY_KEYS) {
        if (backup.browser[key] === null) continue;
        if (!Array.isArray(JSON.parse(backup.browser[key]))) {
            throw new Error(`Invalid browser records: ${key}`);
        }
    }
    const tables = {};
    for (const [name, rows] of Object.entries(backup.server.tables)) {
        if (!Array.isArray(rows) || rows.some(row => !row || typeof row !== 'object'
            || Array.isArray(row) || row.session_id !== backup.session_id)) {
            throw new Error(`Invalid backup table: ${name}`);
        }
        tables[name] = rows.map(row => ({ ...row, session_id: SESSION_ID }));
    }
    return { ...backup.server, session_id: SESSION_ID, tables };
}

function browserStateWithServerFallback(browser, snapshot) {
    const state = { ...browser };
    const tables = snapshot.tables;
    if (state.moodLog === null) {
        state.moodLog = JSON.stringify((tables.mood_logs || []).map(row => ({
            score: row.score, note: row.note, date: row.timestamp
        })));
    }
    if (state.sleepLog === null) {
        state.sleepLog = JSON.stringify((tables.sleep_logs || []).map((row, index) => ({
            id: `sleep_restored_${index}`, bed: row.bed, wake: row.wake,
            awk: row.awk, qual: row.qual, notes: row.notes,
            durHrs: row.dur_hrs, isoDate: row.iso_date
        })));
    }
    if (state.activities === null) {
        state.activities = JSON.stringify((tables.activities || []).map((row, index) => ({
            id: `activity_restored_${index}`, text: row.activity_text,
            done: Boolean(row.done), isoDate: row.iso_date
        })));
    }
    const tests = tables.tests || [];
    for (const [key, name] of [
        ['phqHistory', 'PHQ-9'], ['gadHistory', 'GAD-7'], ['esteemHistory', 'Rosenberg']
    ]) {
        if (state[key] === null) {
            state[key] = JSON.stringify(tests.filter(row => row.test_name === name)
                .map(row => ({ score: row.score, level: row.level, date: row.iso_date })));
        }
    }
    return state;
}

async function downloadDataBackup() {
    if (isProc) {
        alert('请先等待当前聊天结束，再备份记录。');
        return;
    }
    try {
        await waitForSyncIdle();
        const backup = await withDataWriteLock(async () => {
            const response = await fetch(`${API}/api/data/${encodeURIComponent(SESSION_ID)}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return {
                format: CBT_BACKUP_FORMAT,
                session_id: SESSION_ID,
                server: await response.json(),
                browser: readBrowserBackupState()
            };
        });
        const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `cbt-assistant-backup-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 30000);
    } catch (error) {
        alert('备份失败，请确认本机服务正在运行。');
        console.error('Backup failed', error);
    }
}

async function restoreDataBackup(file) {
    if (!file) return;
    if (isProc) {
        alert('请先等待当前聊天结束，再恢复记录。');
        return;
    }
    try {
        if (file.size > 10 * 1024 * 1024) throw new Error('Backup is too large');
        const backup = JSON.parse(await file.text());
        const snapshot = prepareBackupForCurrentSession(backup);
        const browser = browserStateWithServerFallback(backup.browser, snapshot);
        if (!confirm('恢复会替换当前会话记录。建议先下载一份当前数据备份。继续吗？')) return;
        if (syncIsSuspended()) throw new Error('A data operation is already running');
        localStorage.setItem('CBT_SYNC_SUSPENDED', '1');
        const previousBrowser = readBrowserBackupState();
        const previousRestoredMarker = localStorage.getItem('CBT_RESTORED_SESSION');
        try {
            await waitForSyncIdle();
            await withDataWriteLock(async () => {
                try {
                    replaceBrowserBackupState(browser);
                    localStorage.setItem('CBT_RESTORED_SESSION', SESSION_ID);
                    const response = await fetch(`${API}/api/data/${encodeURIComponent(SESSION_ID)}`, {
                        method: 'PUT', headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ snapshot })
                    });
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                } catch (error) {
                    replaceBrowserBackupState(previousBrowser);
                    if (previousRestoredMarker === null) localStorage.removeItem('CBT_RESTORED_SESSION');
                    else localStorage.setItem('CBT_RESTORED_SESSION', previousRestoredMarker);
                    throw error;
                }
            });
            localStorage.setItem('CBT_DATA_REVISION', `${Date.now()}-${Math.random()}`);
        } finally {
            localStorage.removeItem('CBT_SYNC_SUSPENDED');
        }
        location.reload();
    } catch (error) {
        alert('恢复未完成。请保留备份文件，检查本机服务后重试。');
        console.error('Restore failed', error);
    }
}

async function clearAllMyData() {
    if (isProc) {
        alert('请先等待当前聊天结束，再清除记录。');
        return;
    }
    if (!confirm('确定清除当前会话的聊天、记忆和浏览器记录吗？此操作无法撤销。')) return;
    try {
        if (syncIsSuspended()) throw new Error('A data operation is already running');
        localStorage.setItem('CBT_SYNC_SUSPENDED', '1');
        try {
            await waitForSyncIdle();
            await withDataWriteLock(async () => {
                const response = await fetch(`${API}/api/data/${encodeURIComponent(SESSION_ID)}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
            });
            for (const key of CBT_BROWSER_KEYS) localStorage.removeItem(key);
            localStorage.removeItem('CBT_RESTORED_SESSION');
            localStorage.removeItem('SESSION_ID');
            localStorage.setItem('CBT_DATA_REVISION', `${Date.now()}-${Math.random()}`);
        } finally {
            localStorage.removeItem('CBT_SYNC_SUSPENDED');
        }
        location.reload();
    } catch (error) {
        alert('清除未完成，请检查服务并重试。');
        console.error('Clear failed', error);
    }
}
