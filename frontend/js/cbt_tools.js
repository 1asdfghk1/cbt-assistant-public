const cbtEscapeHtml = value => window.CBTSecurity.escapeHtml(value);

const CBT_I18N = {
    ru: {
        moodSaving: 'Записываем...',
        moodSaved: 'Записано ✓',
        moodButton: 'Записать состояние',
        moodLastEntry: 'Последняя запись',
        moodLoggedThanks: 'Спасибо! Оценка записана ✓',
        moodMessageMap: { 1: 'ужасно 😭', 3: 'плохо 😟', 5: 'нормально 😐', 8: 'хорошо 🙂', 10: 'отлично 😁' },
        moodMessageDefault: 'нормально',
        thoughtModalTitle: 'Мысли и действия',
        thoughtHint: 'Запишите ситуацию, мысль и более бережный взгляд на неё.',
        thoughtSave: 'Сохранить мысль',
        gratitudeSave: 'Сохранить благодарность',
        entrySave: 'Сохранить запись',
        save_entry: 'Сохранить запись',
        saving: 'Сохраняем...',
        gratitudeEmotion: 'благодарность',
        gratitudeSaved: '🙏 Запись благодарности сохранена. Это отличная практика!',
        thoughtSaved: 'Запись в дневник добавлена. Формулируя дальнейшие ответы, я учту вашу новую мысль.',
        saveError: 'Ошибка при сохранении.',
        loading: 'Загрузка...',
        noThoughtEntries: 'Пока нет записей',
        noThoughtEntriesSub: 'Дневник мыслей помогает замечать паттерны мышления и менять отношение к ним',
        searchPlaceholder: '🔍 Поиск...',
        loadHistoryError: 'Ошибка загрузки истории',
        selectEntry: 'Выберите запись',
        gratitudeTag: 'Благодарность',
        rhythmTag: 'Ритм дня',
        rhythmSummary: 'Шагов: {total} · Выполнено: {done}',
        fieldSituation: 'Ситуация',
        fieldAutomaticThought: 'Автоматическая мысль',
        fieldEmotion: 'Эмоция',
        fieldBalancedResponse: 'Рациональный ответ',
        today: 'Сегодня',
        yesterday: 'Вчера',
        thisWeek: 'На этой неделе',
        noDescription: 'Без описания',
        testOpenMsg: '📋 Я открыл(а) для вас опросник {test}. Прохождение займет пару минут.',
        noSleepEntries: 'Пока нет записей о сне',
        noSleepEntriesSub: 'Отслеживайте сон, чтобы понять как он влияет на ваше настроение и самочувствие',
        sleep_add_title: 'Добавить запись о сне',
        duration: 'Длительность',
        quality: 'Качество',
        sleepSchedule: 'График сна',
        awakenings: 'Пробуждения за ночь',
        timesCount: '{count} раз',
        notes: 'Заметки',
        sleepEntrySaved: 'Запись о сне сохранена.',
        slotMorning: 'Старт дня',
        slotBody: 'Для тела',
        slotJoy: 'Для души',
        earlier: 'Ранее',
        moodAfter: 'Настроение',
        edit: 'Редактировать',
        delete: 'Удалить',
        forExample: 'Например: ',
        save: 'Сохранить',
        saveChanges: 'Сохранить изменения',
        entryUpdated: 'Запись обновлена.',
        sleepEntryUpdated: 'Запись о сне обновлена.',
        activityUpdated: 'Активность обновлена.',
        editThoughtTitle: 'Редактировать запись',
        editGratitudeTitle: 'Редактировать благодарность',
        editSleepTitle: 'Редактировать запись о сне',
        editActivityPrompt: 'Измените текст активности',
        extra: 'Дополнительно',
        customStepPlaceholder: 'Ваш дополнительный шаг...',
        addCustomStep: 'Добавить свой шаг',
        stepsFilled: 'Заполнено шагов: <b>{total}</b>. Выполнено: <b>{done}</b>.',
        excellentDay: 'Отличный день! Вы выполнили все шаги.',
        addedToRhythm: 'Я добавил задачу в ваш {link}: <b>{text}</b>',
        rhythmLink: 'Ритм дня',
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        daysShort: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        thoughtDiaryDot: 'Дневник мыслей',
        moodTrackerDot: 'Трекер настроения',
        sleepDot: 'Сон',
        activitiesDot: 'Активности',
        testsDot: 'Тесты',
        thoughtSection: 'Дневник мыслей',
        moodSection: 'Настроение',
        moodScore: 'Оценка: {score}/5',
        sleepSection: 'Дневник сна',
        bedtime: 'Отбой',
        wakeup: 'Подъём',
        sleepDurationQuality: 'Продолжительность: <b>{hours} ч.</b>, Качество: <b>{quality}/10</b>',
        activitiesSection: 'Активности',
        testsSection: 'Результаты тестов',
        points: 'баллов',
        noRecordsDay: 'В этот день нет записей',
        analyzing: 'Анализирую данные…',
        noInsights: 'Нет наблюдений.',
        insightsUnavailable: 'Не удалось получить наблюдения прямо сейчас.',
        avgMood14: 'Ср. настроение (14 д.)',
        avgSleep: 'Ср. время сна',
        activitiesDone: 'Активностей выполнено',
        trackedDays: 'Дней отслеживания',
        moodLabel: 'Настроение (1-10)',
        moodTooltip: 'Настроение: {value}/10',
        notEnoughMoodData: 'Недостаточно данных. Запишите хотя бы 2 записи настроения.',
        sleepDurationHours: 'Длительность сна (часы)',
        sleepQualityShort: 'Качество (1-10)',
        noSleepData: 'Нет данных о сне',
        trendImproved: '↓ улучшение',
        trendWorse: '↑ ухудшение',
        trendNoChange: '→ без изменений',
        trendDrop: '↓ снижение',
        phqTitle: 'PHQ-9 (депрессия)',
        gadTitle: 'GAD-7 (тревога)',
        esteemTitle: 'Розенберг (самооценка)',
        noTestsYet: 'Пройдите PHQ-9, GAD-7 или шкалу самооценки, чтобы отслеживать динамику.'
    },
    en: {
        moodSaving: 'Saving...',
        moodSaved: 'Saved ✓',
        moodButton: 'Save mood',
        moodLastEntry: 'Last entry',
        moodLoggedThanks: 'Thanks. Your mood was saved ✓',
        moodMessageMap: { 1: 'awful 😭', 3: 'bad 😟', 5: 'okay 😐', 8: 'good 🙂', 10: 'excellent 😁' },
        moodMessageDefault: 'okay',
        thoughtModalTitle: 'Thoughts and Actions',
        thoughtHint: 'Write down the situation, the thought, and a gentler response to it.',
        thoughtSave: 'Save thought',
        gratitudeSave: 'Save gratitude',
        entrySave: 'Save entry',
        save_entry: 'Save entry',
        saving: 'Saving...',
        gratitudeEmotion: 'gratitude',
        gratitudeSaved: '🙏 Your gratitude entry was saved. This is a strong practice.',
        thoughtSaved: 'Your diary entry was saved. I will take this thought into account in future responses.',
        saveError: 'Could not save the entry.',
        loading: 'Loading...',
        noThoughtEntries: 'No entries yet',
        noThoughtEntriesSub: 'A thought diary helps you notice thinking patterns and change how you relate to them',
        searchPlaceholder: '🔍 Search...',
        loadHistoryError: 'Could not load history',
        selectEntry: 'Select an entry',
        gratitudeTag: 'Gratitude',
        rhythmTag: 'Daily Rhythm',
        rhythmSummary: 'Steps: {total} · Completed: {done}',
        fieldSituation: 'Situation',
        fieldAutomaticThought: 'Automatic thought',
        fieldEmotion: 'Emotion',
        fieldBalancedResponse: 'Balanced response',
        today: 'Today',
        yesterday: 'Yesterday',
        thisWeek: 'This week',
        noDescription: 'No description',
        testOpenMsg: '📋 I opened the {test} questionnaire for you. It only takes a couple of minutes.',
        noSleepEntries: 'No sleep entries yet',
        noSleepEntriesSub: 'Track your sleep to see how it affects your mood and wellbeing',
        sleep_add_title: 'Add a sleep entry',
        duration: 'Duration',
        quality: 'Quality',
        sleepSchedule: 'Sleep schedule',
        awakenings: 'Night awakenings',
        timesCount: '{count} times',
        notes: 'Notes',
        sleepEntrySaved: 'Sleep entry saved.',
        slotMorning: 'Start of day',
        slotBody: 'For the body',
        slotJoy: 'For the soul',
        earlier: 'Earlier',
        moodAfter: 'Mood',
        edit: 'Edit',
        delete: 'Delete',
        forExample: 'For example: ',
        save: 'Save',
        saveChanges: 'Save changes',
        entryUpdated: 'Entry updated.',
        sleepEntryUpdated: 'Sleep entry updated.',
        activityUpdated: 'Activity updated.',
        editThoughtTitle: 'Edit entry',
        editGratitudeTitle: 'Edit gratitude',
        editSleepTitle: 'Edit sleep entry',
        editActivityPrompt: 'Edit activity text',
        extra: 'Extra',
        customStepPlaceholder: 'Your extra step...',
        addCustomStep: 'Add your own step',
        stepsFilled: 'Filled steps: <b>{total}</b>. Completed: <b>{done}</b>.',
        excellentDay: 'Excellent day. You completed all your steps.',
        addedToRhythm: 'I added a task to your {link}: <b>{text}</b>',
        rhythmLink: 'Daily Rhythm',
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        daysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        thoughtDiaryDot: 'Thought diary',
        moodTrackerDot: 'Mood tracker',
        sleepDot: 'Sleep',
        activitiesDot: 'Activities',
        testsDot: 'Tests',
        thoughtSection: 'Thought Diary',
        moodSection: 'Mood',
        moodScore: 'Score: {score}/5',
        sleepSection: 'Sleep Journal',
        bedtime: 'Bedtime',
        wakeup: 'Wake time',
        sleepDurationQuality: 'Duration: <b>{hours} h</b>, Quality: <b>{quality}/10</b>',
        activitiesSection: 'Activities',
        testsSection: 'Test results',
        points: 'points',
        noRecordsDay: 'No records for this day',
        analyzing: 'Analyzing your data…',
        noInsights: 'No insights yet.',
        insightsUnavailable: 'Could not fetch insights right now.',
        avgMood14: 'Avg mood (14 d)',
        avgSleep: 'Avg sleep time',
        activitiesDone: 'Activities completed',
        trackedDays: 'Tracked days',
        moodLabel: 'Mood (1-10)',
        moodTooltip: 'Mood: {value}/10',
        notEnoughMoodData: 'Not enough data yet. Log at least 2 mood entries.',
        sleepDurationHours: 'Sleep duration (hours)',
        sleepQualityShort: 'Quality (1-10)',
        noSleepData: 'No sleep data',
        trendImproved: '↓ improved',
        trendWorse: '↑ worsened',
        trendNoChange: '→ no change',
        trendDrop: '↓ lower',
        phqTitle: 'PHQ-9 (depression)',
        gadTitle: 'GAD-7 (anxiety)',
        esteemTitle: 'Rosenberg (self-esteem)',
        noTestsYet: 'Take PHQ-9, GAD-7, or the self-esteem scale to track changes over time.'
    },

    zh: {
        moodSaving: '正在记录...',
        moodSaved: '已记录 ✓',
        moodButton: '记录心情',
        moodLastEntry: '最近一次记录',
        moodLoggedThanks: '谢谢！心情已经记录 ✓',
        moodMessageMap: {
            1: '非常糟糕 😭',
            3: '不太好 😟',
            5: '一般 😐',
            8: '不错 🙂',
            10: '非常好 😁'
        },
        moodMessageDefault: '一般',

        thoughtModalTitle: '想法与行动',
        thoughtHint: '记录当时的情境、自动化想法，以及一个更加平衡和温和的看法。',
        thoughtSave: '保存想法',
        gratitudeSave: '保存感恩记录',
        entrySave: '保存记录',
        save_entry: '保存记录',
        saving: '正在保存...',

        gratitudeEmotion: '感恩',
        gratitudeSaved: '🙏 感恩记录已保存。这是一个很好的练习！',
        thoughtSaved: '思维日记已保存。之后与你交流时，我会参考这条记录。',
        saveError: '保存失败。',
        loading: '正在加载...',

        noThoughtEntries: '暂时没有记录',
        noThoughtEntriesSub: '思维日记可以帮助你发现自己的思维模式，并尝试以新的方式看待它们。',
        searchPlaceholder: '🔍 搜索...',
        loadHistoryError: '加载历史记录失败',
        selectEntry: '请选择一条记录',

        gratitudeTag: '感恩',
        rhythmTag: '每日节奏',
        rhythmSummary: '步骤：{total} · 已完成：{done}',

        fieldSituation: '情境',
        fieldAutomaticThought: '自动化想法',
        fieldEmotion: '情绪',
        fieldBalancedResponse: '平衡想法',

        today: '今天',
        yesterday: '昨天',
        thisWeek: '本周',
        noDescription: '暂无描述',

        testOpenMsg: '📋 已为你打开 {test} 量表，完成大约需要几分钟。',

        noSleepEntries: '暂时没有睡眠记录',
        noSleepEntriesSub: '记录睡眠可以帮助你了解睡眠与情绪和身体状态之间的关系。',
        sleep_add_title: '添加睡眠记录',
        duration: '睡眠时长',
        quality: '睡眠质量',
        sleepSchedule: '睡眠时间',
        awakenings: '夜间醒来次数',
        timesCount: '{count} 次',
        notes: '备注',
        sleepEntrySaved: '睡眠记录已保存。',

        slotMorning: '开启一天',
        slotBody: '照顾身体',
        slotJoy: '愉悦自己',
        earlier: '更早',

        moodAfter: '心情',
        edit: '编辑',
        delete: '删除',
        forExample: '例如：',
        save: '保存',
        saveChanges: '保存修改',

        entryUpdated: '记录已更新。',
        sleepEntryUpdated: '睡眠记录已更新。',
        activityUpdated: '活动已更新。',

        editThoughtTitle: '编辑记录',
        editGratitudeTitle: '编辑感恩记录',
        editSleepTitle: '编辑睡眠记录',
        editActivityPrompt: '修改活动内容',

        extra: '其他',
        customStepPlaceholder: '添加一个自己的步骤...',
        addCustomStep: '添加自定义步骤',

        stepsFilled: '已填写步骤：<b>{total}</b>。已完成：<b>{done}</b>。',
        excellentDay: '做得很好！今天的步骤已经全部完成。',
        addedToRhythm: '已将任务添加到你的{link}：<b>{text}</b>',
        rhythmLink: '每日节奏',

        months: [
            '一月', '二月', '三月', '四月',
            '五月', '六月', '七月', '八月',
            '九月', '十月', '十一月', '十二月'
        ],

        daysShort: ['一', '二', '三', '四', '五', '六', '日'],

        thoughtDiaryDot: '思维日记',
        moodTrackerDot: '情绪记录',
        sleepDot: '睡眠',
        activitiesDot: '活动',
        testsDot: '量表',

        thoughtSection: '思维日记',
        moodSection: '情绪',
        moodScore: '评分：{score}/5',

        sleepSection: '睡眠日记',
        bedtime: '入睡时间',
        wakeup: '起床时间',
        sleepDurationQuality: '睡眠时长：<b>{hours} 小时</b>，质量：<b>{quality}/10</b>',

        activitiesSection: '活动',
        testsSection: '心理测试结果',
        points: '分',
        noRecordsDay: '当天没有记录',

        analyzing: '正在分析数据…',
        noInsights: '暂时没有新的观察。',
        insightsUnavailable: '暂时无法获取分析结果。',

        avgMood14: '平均情绪（14天）',
        avgSleep: '平均睡眠时间',
        activitiesDone: '已完成活动',
        trackedDays: '记录天数',

        moodLabel: '情绪（1-10）',
        moodTooltip: '情绪：{value}/10',
        notEnoughMoodData: '数据还不够，请至少记录2次情绪。',

        sleepDurationHours: '睡眠时长（小时）',
        sleepQualityShort: '质量（1-10）',
        noSleepData: '暂无睡眠数据',

        trendImproved: '↓ 改善',
        trendWorse: '↑ 加重',
        trendNoChange: '→ 无明显变化',
        trendDrop: '↓ 下降',

        phqTitle: 'PHQ-9（抑郁症状）',
        gadTitle: 'GAD-7（焦虑症状）',
        esteemTitle: 'Rosenberg（自尊）',

        noTestsYet: '完成 PHQ-9、GAD-7 或自尊量表后，可以在这里查看记录。'
    }
};

function cbtLang() {
    return (window.getCurrentLanguage && window.getCurrentLanguage()) || 'zh';
}

function cbtText(key) {
    const lang = cbtLang();

    return (
        CBT_I18N[lang] &&
        CBT_I18N[lang][key]
    )
        || (CBT_I18N.zh && CBT_I18N.zh[key])
        || (CBT_I18N.en && CBT_I18N.en[key])
        || key;
}

function cbtLocale() {
    return (window.getCurrentLocale && window.getCurrentLocale()) || 'zh-CN';
}

function cbtFormat(key, vars) {
    let template = cbtText(key);
    Object.keys(vars || {}).forEach(function (name) {
        template = template.replaceAll(`{${name}}`, vars[name]);
    });
    return template;
}

function inlineJsString(value) {
    return window.CBTSecurity.escapeInlineHandlerString(value);
}

async function logMood() {
    let s = document.getElementById('moodSlider').value;
    let btn = event.target;
    btn.innerText = cbtText('moodSaving');
    await fetch(API + '/api/mood', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ score: parseInt(s), session_id: SESSION_ID }) });
    // Save locally for dashboard
    let ml = JSON.parse(localStorage.getItem('moodLog') || '[]');
    ml.push({ score: parseInt(s), date: new Date().toISOString() });
    if (ml.length > 90) ml = ml.slice(-90);
    localStorage.setItem('moodLog', JSON.stringify(ml));
    btn.innerText = cbtText('moodSaved');
    setTimeout(() => btn.innerText = cbtText('moodButton'), 2000);
    document.getElementById('moodHistory').innerText = `${cbtText('moodLastEntry')}: ${s}/10`;
}

async function logMoodFromWelcome(score) {
    let ml = JSON.parse(localStorage.getItem('moodLog') || '[]');
    ml.push({ score: score, date: new Date().toISOString() });
    if (ml.length > 90) ml = ml.slice(-90);
    localStorage.setItem('moodLog', JSON.stringify(ml));

    // Update UI to hide tracker
    let tracker = document.getElementById('welcomeMoodTracker');
    if (tracker) {
        tracker.innerHTML = `<div style="font-size:14px; font-weight:500; color:var(--success);">${cbtText('moodLoggedThanks')}</div>`;
        setTimeout(() => {
            tracker.style.transition = 'opacity 0.3s';
            tracker.style.opacity = '0';
            setTimeout(() => tracker.style.display = 'none', 300);
        }, 1500);
    }

    // Send to backend and trigger chat
    try {
        await fetch(API + '/api/mood', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ score: score, session_id: SESSION_ID }) });
        let emojis = cbtText('moodMessageMap');
        let msg;

        if (cbtLang() === 'zh') {
            msg = `我现在的心情可以评为${emojis[score] || cbtText('moodMessageDefault')}（${score}/10）。`;
        } else if (cbtLang() === 'en') {
            msg = `I would rate my mood right now as ${emojis[score] || cbtText('moodMessageDefault')} (${score}/10).`;
        } else {
            msg = `Я оцениваю свое настроение сейчас как ${emojis[score] || cbtText('moodMessageDefault')} (${score}/10).`;
        }

        // Populate input and send
        let inp = document.getElementById('msgInput');
        if (inp && typeof sendMessage === 'function') {
            inp.value = msg;
            sendMessage();
        }
    } catch (e) {
        console.error('Mood logging error', e);
    }
}
window.logMoodFromWelcome = logMoodFromWelcome;

let _thoughtType = 'thought'; // 'thought' | 'gratitude' | 'rhythm'
let _editingThoughtId = null;
let _editingSleepId = null;

function makeLocalEntryId(prefix) {
    return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function normalizeLocalEntries(entries, prefix) {
    var changed = false;
    var normalized = (entries || []).map(function (entry, idx) {
        if (!entry || typeof entry !== 'object') return entry;
        if (entry.id) return entry;
        changed = true;
        return Object.assign(
            {
                id: prefix + '_' + idx + '_' + String(entry.isoDate || entry.date || Date.now()).replace(/[^a-zA-Z0-9]/g, '')
            },
            entry
        );
    });
    return { entries: normalized, changed: changed };
}

function updateThoughtFormMode() {
    var title = document.getElementById('thoughtModalTitle');
    var submit = document.getElementById('tSub');
    if (title) {
        if (_editingThoughtId !== null) {
            title.innerText = _thoughtType === 'gratitude' ? cbtText('editGratitudeTitle') : cbtText('editThoughtTitle');
        } else {
            title.innerText = cbtText('thoughtModalTitle');
        }
    }
    if (submit) {
        submit.innerText = _editingThoughtId !== null
            ? cbtText('saveChanges')
            : _thoughtType === 'gratitude'
                ? cbtText('gratitudeSave')
                : cbtText('thoughtSave');
    }
}

function resetThoughtEditor() {
    _editingThoughtId = null;
    var form = document.getElementById('tForm');
    if (form) form.reset();
    var gratitude = document.getElementById('gratText');
    if (gratitude) gratitude.value = '';
    var intensity = document.getElementById('tInt');
    if (intensity) intensity.value = '5';
    switchThoughtType('thought');
    updateThoughtFormMode();
}
window.resetThoughtEditor = resetThoughtEditor;

function cleanupLegacyRhythmIntro() {
    var rhythmSection = document.getElementById('rhythmSection');
    if (!rhythmSection) return;

    Array.from(rhythmSection.children).forEach(function (child) {
        if (child.id === 'actSlots' || child.id === 'actStats') return;

        var text = (child.textContent || '')
            .replace(/\s+/g, ' ')
            .trim();

        var legacyTitles = [
            'Правило трёх шагов',
            'Three-step rule',
            '三步法则'
        ];

        var isLegacyIntro = legacyTitles.some(function (title) {
            return text.indexOf(title) !== -1;
        });

        if (isLegacyIntro) {
            child.remove();
        }
    });
}

function switchThoughtType(type) {
    _thoughtType = type;
    document.getElementById('ttBtn0').classList.toggle('active', type === 'thought');
    document.getElementById('ttBtn1').classList.toggle('active', type === 'gratitude');
    document.getElementById('ttBtn2').classList.toggle('active', type === 'rhythm');
    var title = document.getElementById('thoughtModalTitle');
    var hint = document.getElementById('thoughtModalHint');
    var submit = document.getElementById('tSub');
    if (title) {
        title.innerText = cbtText('thoughtModalTitle');
        title.style.display = 'block';
    }
    if (hint) {
        hint.innerText = type === 'thought'
            ? cbtText('thoughtHint')
            : type === 'gratitude'
                ? ''
                : '';
        hint.style.display = hint.innerText ? 'block' : 'none';
    }
    if (submit) updateThoughtFormMode();
    document.getElementById('thoughtFormFull').style.display = type === 'thought' ? 'block' : 'none';
    document.getElementById('gratitudeFormSection').style.display = type === 'gratitude' ? 'block' : 'none';
    document.getElementById('tForm').style.display = type === 'rhythm' ? 'none' : 'block';
    document.getElementById('rhythmSection').style.display = type === 'rhythm' ? 'block' : 'none';
    if (type === 'rhythm') {
        cleanupLegacyRhythmIntro();
        if (typeof renderActivities === 'function') renderActivities();
    }
}
window.switchThoughtType = switchThoughtType;

function openThoughtModalSection(type) {
    resetThoughtEditor();
    openModal('thoughtModal');
    switchThoughtType(type || 'thought');
}
window.openThoughtModalSection = openThoughtModalSection;

async function submitThought(e) {
    e.preventDefault();
    let b = document.getElementById('tSub'); b.disabled = true; b.innerText = cbtText('saving');
    const isEditing = _editingThoughtId !== null;
    let d;
    if (_thoughtType === 'gratitude') {
        const text = document.getElementById('gratText').value.trim();
        if (!text) { b.disabled = false; b.innerText = cbtText('entrySave'); return; }
        d = {
            session_id: SESSION_ID,
            situation: text,
            thought: text,
            emotion: cbtText('gratitudeEmotion'),
            intensity: 8,
            distortion: 'gratitude',
            rational_response: ''
        };
    } else {
        d = {
            session_id: SESSION_ID,
            situation: document.getElementById('tSit').value,
            thought: document.getElementById('tThou').value,
            emotion: document.getElementById('tEmo').value,
            intensity: parseInt(document.getElementById('tInt').value) || 5,
            distortion: document.getElementById('tDist').value,
            rational_response: document.getElementById('tRat').value
        };
    }
    try {
        const url = isEditing ? API + '/api/thoughts/' + _editingThoughtId : API + '/api/thoughts';
        const method = isEditing ? 'PUT' : 'POST';
        const response = await fetch(url, { method: method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) });
        if (!response.ok) throw new Error('Failed to save thought record');
        const savedType = _thoughtType;
        closeModal('thoughtModal');
        const msg = isEditing
            ? cbtText('entryUpdated')
            : savedType === 'gratitude'
            ? cbtText('gratitudeSaved')
            : cbtText('thoughtSaved');
        addMsg('assistant', msg);
    } catch (err) { alert(cbtText('saveError')); }
    b.disabled = false;
    updateThoughtFormMode();
}

function editThoughtRecord(id) {
    var record = (window._histRecs || []).find(function (item) {
        return item && item.id === id && item.entryType !== 'rhythm';
    });
    if (!record) return;

    closeModal('histModal');
    resetThoughtEditor();
    _editingThoughtId = id;

    if (record.distortion === 'gratitude') {
        switchThoughtType('gratitude');
        document.getElementById('gratText').value = record.situation || '';
    } else {
        switchThoughtType('thought');
        document.getElementById('tSit').value = record.situation || '';
        document.getElementById('tThou').value = record.thought || '';
        document.getElementById('tEmo').value = record.emotion || '';
        document.getElementById('tInt').value = String(record.intensity ?? 5);
        document.getElementById('tDist').value = record.distortion || '';
        document.getElementById('tRat').value = record.rational_response || '';
    }

    updateThoughtFormMode();
    openModal('thoughtModal');
}
window.editThoughtRecord = editThoughtRecord;

async function openThoughtHistoryModal() {
    openModal('histModal');
    const c = document.getElementById('histContent');
    c.innerHTML = `<div style="color:var(--gray);text-align:center;padding:40px 0;">${cbtText('loading')}</div>`;
    try {
        const res = await fetch(API + '/api/thoughts/' + SESSION_ID).then(r => r.json());
        const recs = (res.thought_records || []).concat(_buildRhythmHistoryEntries())
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        window._histRecs = recs;

        if (!recs.length) {
            c.style.marginTop = '24px';
            c.innerHTML = `
                <div class="empty-state-wrap">
                    <div class="empty-state-icon" style="background:linear-gradient(135deg,rgba(121,114,152,.12),rgba(121,114,152,.22));">
                        <i data-lucide="notebook-pen" style="width:38px;height:38px;color:#797298;"></i>
                    </div>
                    <div class="empty-state-title">${cbtText('noThoughtEntries')}</div>
                    <div class="empty-state-sub">${cbtText('noThoughtEntriesSub')}</div>
                </div>`;
            lucide.createIcons();
            return;
        }

        c.style.marginTop = '16px';
        c.innerHTML = `
            <div style="display:flex;gap:0;height:430px;margin:0 -12px 0 -4px;">
                <div style="flex:0 0 246px;border-right:1px solid var(--border);display:flex;flex-direction:column;overflow:hidden;padding-left:4px;">
                    <div style="padding:10px 12px 8px 0;">
                        <input id="histSearch" type="text" placeholder="${cbtText('searchPlaceholder')}"
                            style="width:100%;padding:6px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;background:var(--bg);color:var(--text);outline:none;box-sizing:border-box;"
                            oninput="filterHistList()" />
                    </div>
                    <div id="histListItems" style="overflow-y:auto;flex:1;padding:0 10px 8px 0;">
                        ${_renderHistList(recs, 0)}
                    </div>
                </div>
                <div id="histDetail" style="flex:1;overflow-y:auto;padding:8px 28px 24px 24px;min-width:0;">
                    ${_renderHistDetail(recs[0])}
                </div>
            </div>`;

        lucide.createIcons();
    } catch (e) {
        c.innerHTML = `<div style="color:var(--danger);text-align:center;padding:40px 0;">${cbtText('loadHistoryError')}</div>`;
    }
}

function _buildRhythmHistoryEntries() {
    const acts = JSON.parse(localStorage.getItem('activities') || '[]');
    const dayGroups = {};

    acts.forEach(function (act) {
        if (!act || !act.isoDate) return;
        const d = new Date(act.isoDate);
        const dayKey = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        if (!dayGroups[dayKey]) dayGroups[dayKey] = [];
        dayGroups[dayKey].push(act);
    });

    return Object.values(dayGroups).map(function (items) {
        const sorted = items.slice().sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));
        const timestamp = sorted[0].isoDate;
        const doneCount = items.filter(function (a) { return a.done; }).length;
        const previewItems = items.slice(0, 3).map(function (a) { return a.text; }).join(' • ');

        return {
            entryType: 'rhythm',
            timestamp: timestamp,
            situation: previewItems,
            thought: '',
            emotion: '',
            intensity: 0,
            distortion: 'rhythm',
            rational_response: '',
            rhythm_items: items,
            rhythm_summary: cbtFormat('rhythmSummary', { total: items.length, done: doneCount })
        };
    });
}

function _dateGroupLabel(timestamp) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today - 86400000);
    const weekAgo = new Date(today - 7 * 86400000);
    const d = new Date(timestamp);
    const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    if (dayStart >= today) return cbtText('today');
    if (dayStart >= yesterday) return cbtText('yesterday');
    if (dayStart >= weekAgo) return cbtText('thisWeek');
    return d.toLocaleDateString(cbtLocale(), { month: 'long', year: 'numeric' });
}

function _renderHistList(recs, selectedIdx) {
    const groups = {};
    recs.forEach((r, i) => {
        const label = _dateGroupLabel(r.timestamp);
        if (!groups[label]) groups[label] = [];
        groups[label].push({ r, i });
    });
    let html = '';
    for (const [label, items] of Object.entries(groups)) {
        html += `<div class="hist-group-label">${cbtEscapeHtml(label)}</div>`;
        items.forEach(({ r, i }) => {
            const t = new Date(r.timestamp);
            const time = t.toLocaleTimeString(cbtLocale(), { hour: '2-digit', minute: '2-digit' });
            const isGratitude = r.distortion === 'gratitude';
            const isRhythm = r.entryType === 'rhythm';
            const preview = cbtEscapeHtml((r.situation || cbtText('noDescription')).slice(0, 55));
            const searchText = cbtEscapeHtml(((r.situation || '') + ' ' + (r.emotion || '') + ' ' + (r.thought || '') + ' ' + ((r.rhythm_items || []).map(function (a) { return a.text; }).join(' '))).toLowerCase());
            const editBtn = r.id && !isRhythm
                ? `<button onclick="event.stopPropagation(); editThoughtRecord(${r.id})"
                        title="${cbtText('edit')}"
                        style="margin-left:auto;background:none;border:none;cursor:pointer;color:var(--gray);padding:4px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i data-lucide="pencil" style="width:14px;"></i>
                   </button>`
                : '';
            html += `
                <div class="hist-list-item${i === selectedIdx ? ' selected' : ''}"
                    data-hist-idx="${i}"
                    data-search="${searchText}"
                    onclick="selectHistItem(${i})">
                    <div style="font-size:11px;color:var(--gray);margin-bottom:2px;display:flex;align-items:center;gap:6px;">${isGratitude ? '🙏 ' : isRhythm ? '☑ ' : ''}${time}${editBtn}</div>
                    <div style="font-size:13px;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${preview}</div>
                    ${r.emotion && !isGratitude && !isRhythm ? `<div style="font-size:11px;color:var(--accent);margin-top:2px;">${cbtEscapeHtml(r.emotion)}</div>` : ''}
                    ${isGratitude ? `<div style="font-size:11px;color:#6aa882;margin-top:2px;">${cbtText('gratitudeTag')}</div>` : ''}
                    ${isRhythm ? `<div style="font-size:11px;color:var(--accent);margin-top:2px;">${cbtText('rhythmTag')}</div>` : ''}
                </div>`;
        });
    }
    return html;
}

function _renderHistDetail(r) {
    if (!r) return `<div style="color:var(--gray);text-align:center;padding-top:80px;font-size:13px;">${cbtText('selectEntry')}</div>`;
    const d = new Date(r.timestamp);
    const dateStr = d.toLocaleDateString(cbtLocale(), { weekday: 'long', day: 'numeric', month: 'long' }) +
        ' · ' + d.toLocaleTimeString(cbtLocale(), { hour: '2-digit', minute: '2-digit' });
    const header = `
        <div style="font-size:12px;color:var(--gray);padding:8px 0 4px;margin-bottom:4px;display:flex;align-items:center;gap:5px;border-bottom:1px solid var(--border);">
            <i data-lucide="clock" style="width:12px;flex-shrink:0;"></i>
            <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${dateStr}</span>
        </div>`;
    const editAction = r.id && r.entryType !== 'rhythm'
        ? `<div style="display:flex;justify-content:flex-end;margin-top:12px;">
            <button onclick="editThoughtRecord(${r.id})" style="display:inline-flex;align-items:center;gap:6px;border:1px solid var(--border);background:var(--panel);color:var(--text);border-radius:10px;padding:8px 12px;cursor:pointer;font-size:12px;">
                <i data-lucide="pencil" style="width:13px;"></i>${cbtText('edit')}
            </button>
        </div>`
        : '';
    // Gratitude entry
    if (r.distortion === 'gratitude') {
        return header + editAction + `
        <div style="margin-top:12px; padding:16px; background:var(--bg); border-radius:12px; border:1px solid var(--border);">
            <div style="font-size:13px;font-weight:600;color:var(--accent);margin-bottom:10px;display:flex;align-items:center;gap:6px;">
                🙏 ${cbtText('gratitudeTag')}
            </div>
            <div style="font-size:13px;color:var(--text);line-height:1.7;white-space:pre-line;">${cbtEscapeHtml(r.situation)}</div>
        </div>`;
    }
    if (r.entryType === 'rhythm') {
        const items = (r.rhythm_items || []).slice().sort((a, b) => new Date(a.isoDate) - new Date(b.isoDate));
        return header + `
        <div style="margin-top:12px; padding:16px; background:var(--bg); border-radius:12px; border:1px solid var(--border);">
            <div style="font-size:13px;font-weight:600;color:var(--accent);margin-bottom:8px;display:flex;align-items:center;gap:6px;">
                <i data-lucide="check-square" style="width:14px;"></i> ${cbtText('rhythmTag')}
            </div>
            <div style="font-size:12px;color:var(--gray);margin-bottom:12px;">${cbtEscapeHtml(r.rhythm_summary)}</div>
            <div style="display:flex;flex-direction:column;gap:8px;">
                ${items.map(function (item) {
                    return `<div style="display:flex;align-items:flex-start;gap:8px;padding:10px 12px;border:1px solid var(--border);border-radius:10px;background:var(--panel);">
                        <span style="font-size:13px;color:${item.done ? 'var(--accent)' : 'var(--gray)'};line-height:1.4;">${item.done ? '✓' : '○'}</span>
                        <span style="font-size:13px;color:var(--text);line-height:1.5;${item.done ? 'text-decoration:line-through;color:var(--gray);' : ''}">${cbtEscapeHtml(item.text)}</span>
                    </div>`;
                }).join('')}
            </div>
        </div>`;
    }
    const field = (label, val) => val ? `
        <div class="hist-detail-field">
            <div class="hist-detail-label">${label}</div>
            <div class="hist-detail-value">${cbtEscapeHtml(val)}</div>
        </div>` : '';
    return header + editAction +
        field(cbtText('fieldSituation'), r.situation) +
        field(cbtText('fieldAutomaticThought'), r.thought) +
        (r.emotion ? `<div class="hist-detail-field">
            <div class="hist-detail-label">${cbtText('fieldEmotion')}</div>
            <div class="hist-detail-value">${cbtEscapeHtml(r.emotion)}${r.intensity ? `<span style="color:var(--gray);font-size:12px;margin-left:6px;">· ${cbtEscapeHtml(r.intensity)}/10</span>` : ''}</div>
        </div>` : '') +
        field(cbtText('fieldBalancedResponse'), r.rational_response) +
        (r.distortion && r.distortion !== 'gratitude' ? `<div style="padding-top:8px;"><span style="display:inline-flex;align-items:center;gap:5px;background:var(--accent-light);color:var(--accent);border-radius:12px;padding:4px 11px;font-size:11px;">
            <i data-lucide="brain-circuit" style="width:11px;flex-shrink:0;"></i>${cbtEscapeHtml(r.distortion)}
        </span></div>` : '');
}

function selectHistItem(idx) {
    document.querySelectorAll('[data-hist-idx]').forEach(el => {
        el.classList.toggle('selected', parseInt(el.dataset.histIdx) === idx);
    });
    const detail = document.getElementById('histDetail');
    if (detail && window._histRecs) {
        detail.innerHTML = _renderHistDetail(window._histRecs[idx]);
        lucide.createIcons();
    }
}

function filterHistList() {
    const q = (document.getElementById('histSearch')?.value || '').toLowerCase();
    let visibleGroups = new Set();
    document.querySelectorAll('[data-hist-idx]').forEach(el => {
        const match = !q || (el.dataset.search || '').includes(q);
        el.style.display = match ? '' : 'none';
        if (match) {
            let prev = el.previousElementSibling;
            while (prev && !prev.classList.contains('hist-group-label')) prev = prev.previousElementSibling;
            if (prev) visibleGroups.add(prev);
        }
    });
    document.querySelectorAll('.hist-group-label').forEach(el => {
        el.style.display = visibleGroups.has(el) ? '' : 'none';
    });
}
window.selectHistItem = selectHistItem;
window.filterHistList = filterHistList;

function openTestFromAI(testType) {
    if (testType === 'PHQ-9') {
        openModal('phqModal');
        initPHQ();
    } else if (testType === 'GAD-7') {
        openModal('gadModal');
        initGAD();
    }
    // Notify UI
    let btnMessage = document.getElementById('messages');
    let div = document.createElement('div');
    div.className = 'msg assistant';
    div.innerHTML = `
                <div class="msg-avatar"><i data-lucide="sparkles" style="width:18px;"></i></div>
                <div class="msg-content"><p>${cbtFormat('testOpenMsg', { test: `<a href="#" onclick="openModal('${testType === 'PHQ-9' ? 'phqModal' : 'gadModal'}'); return false;" style="color:var(--accent);text-decoration:underline;">${testType}</a>` })}</p></div>
            `;
    if (btnMessage) {
        btnMessage.appendChild(div);
        if (window.lucide) window.lucide.createIcons();
        btnMessage.scrollTop = btnMessage.scrollHeight;
    }
}
window.openTestFromAI = openTestFromAI;
/* PHQ-9 */
const ASSESSMENT_I18N = {
    ru: {
        phqQuestions: [
            'Отсутствие интереса или удовольствия от дел, которые раньше нравились',
            'Подавленное настроение, ощущение безнадёжности или депрессии',
            'Нарушения сна (трудно заснуть, частые пробуждения или, наоборот, слишком много сплю)',
            'Усталость или ощущение нехватки сил',
            'Плохой аппетит или переедание',
            'Ощущение себя неудачником или чувство вины',
            'Трудности с концентрацией внимания (чтение, телевизор, работа)',
            'Заметно замедленные движения или речь — или, наоборот, суетливость и трудно успокоиться',
            'Мысли о том, что лучше было бы умереть, или желание причинить себе вред'
        ],
        phqOptions: ['Совсем нет', 'Несколько дней', 'Больше половины дней', 'Почти каждый день'],
        phqDiscuss: 'Обсудить результат с ассистентом',
        phqSafetyNoticeTitle: 'Я заметил(а), что в ответе на вопрос 9 вы отметили наличие таких мыслей',
        phqSafetyNoticeBody: 'Этот пункт требует отдельного внимания, но по одному ответу нельзя определить, находитесь ли вы сейчас в непосредственной опасности. Я хочу уточнить важный вопрос:',
        phqSafetyQuestion: 'Есть ли у вас сейчас мысли о том, чтобы причинить себе вред или покончить с собой?',
        phqSafetyYes: 'Да, такие мысли есть у меня сейчас',
        phqSafetyNo: 'Нет, сейчас таких мыслей нет',
        phqSafetyCurrentTitle: 'Сейчас важнее всего ваша безопасность',
        phqSafetyCurrentBody: 'Если вы чувствуете, что можете причинить себе вред в ближайшее время, не оставайтесь с этим в одиночестве. Постарайтесь быть рядом с человеком, которому доверяете, и как можно скорее свяжитесь с местной экстренной медицинской службой, кризисной службой или специалистом.',
        phqSafetyCurrentPrecaution: 'Пока вы ожидаете дальнейшей помощи, постарайтесь отойти от предметов, которые можно использовать для причинения себе вреда.',
        phqSafetyCurrentButton: 'Сначала обсудить с ассистентом мою безопасность',
        phqSafetyPastTitle: 'Спасибо за уточнение',
        phqSafetyPastBody: 'Даже если сейчас таких мыслей нет, их появление в течение последних двух недель всё равно заслуживает внимания. Если они появятся снова, станут чаще или появится конкретный план, постарайтесь как можно скорее обратиться за профессиональной помощью.',
        phqSafetyPastButton: 'Продолжить разговор с ассистентом',
        phqSafetyCurrentMessage: 'Я только что прошёл(ла) PHQ-9. В вопросе 9 я отметил(а) наличие таких мыслей, и сейчас у меня всё ещё есть мысли о том, чтобы причинить себе вред. Помоги мне сначала сосредоточиться на текущей безопасности.',
        phqSafetyPastMessage: 'Я только что прошёл(ла) PHQ-9. В вопросе 9 я отметил(а) наличие таких мыслей, но сейчас у меня нет мыслей о том, чтобы причинить себе вред. Помоги мне понять, что это значит и на что стоит обратить внимание дальше.',
        phqLevels: [
            ['Минимальная или отсутствующая', 'Ваши результаты указывают на отсутствие значимых признаков депрессии. Продолжайте заботиться о себе.'],
            ['Лёгкая депрессия', 'Возможны признаки лёгкой депрессии. Обратите внимание на сон, активность и социальные связи. Поговорите с ассистентом о своём состоянии.'],
            ['Умеренная депрессия', 'Результаты указывают на умеренную депрессию. Рекомендуется обратиться к специалисту для дополнительной оценки.'],
            ['Умеренно-тяжёлая депрессия', 'Признаки выраженной депрессии. Настоятельно рекомендуется консультация врача или психотерапевта.'],
            ['Тяжёлая депрессия', 'Тяжёлая депрессия. Пожалуйста, обратитесь к специалисту как можно скорее. Горячая линия: 8-800-333-44-34.']
        ],
        gadQuestions: [
            'Нервозность, тревожность или ощущение напряжения',
            'Невозможность остановить или контролировать беспокойство',
            'Чрезмерное беспокойство о разных вещах',
            'Трудности с расслаблением',
            'Такое беспокойство, что трудно усидеть на месте',
            'Лёгкая раздражительность или нервозность',
            'Страх, что может случиться что-то плохое'
        ],
        gadOptions: ['Совсем нет', 'Несколько дней', 'Больше половины дней', 'Почти каждый день'],
        gadDiscuss: 'Обсудить с ассистентом',
        gadLevels: [
            ['Минимальная тревожность', 'Признаки тревоги минимальны или отсутствуют. Продолжайте придерживаться здоровых привычек.'],
            ['Лёгкая тревожность', 'Слабая тревога. Попробуйте дыхательные упражнения, ограничьте кофеин и стрессовые ситуации.'],
            ['Умеренная тревожность', 'Умеренная тревога. Рекомендуется обратиться к специалисту. КПТ-техники могут существенно помочь.'],
            ['Тяжёлая тревожность', 'Выраженная тревога. Пожалуйста, обратитесь к врачу или психотерапевту. Горячая линия: 8-800-333-44-34.']
        ],
        esteemQuestions: [
            'Я чувствую, что у меня есть хорошие качества.',
            'Иногда мне кажется, что я вообще ни на что не годен(на).',
            'Я способен(на) делать что-то не хуже большинства других людей.',
            'Мне кажется, что мне нечем особенно гордиться.',
            'В целом я отношусь к себе положительно.',
            'Иногда я чувствую себя бесполезным(ой).',
            'Я чувствую, что достоин(на) уважения не меньше других.',
            'Мне хотелось бы больше уважать себя.',
            'Я склонен(на) считать себя неудачником(цей).',
            'Я считаю, что я ценный человек, по крайней мере не меньше других.'
        ],
        esteemOptions: ['Полностью согласен(на)', 'Скорее согласен(на)', 'Скорее не согласен(на)', 'Совсем не согласен(на)'],
        esteemDiscuss: 'Обсудить с ассистентом',
        esteemDiscussMessage: 'Мой результат по шкале самооценки Розенберга: {score} баллов ({level}). Помоги мне понять, как улучшить моё отношение к себе.',
        esteemLevels: [
            ['Устойчивая самооценка', 'У вас достаточно устойчивая опора на себя. Сохраняйте уважительное отношение к себе и замечайте свои сильные стороны.'],
            ['Умеренная самооценка', 'Самооценка в целом сохранна, но в стрессовых ситуациях может заметно проседать. Полезно отслеживать самокритику и поддерживать более реалистичный внутренний диалог.'],
            ['Сниженная самооценка', 'Есть признаки сниженной самооценки. Полезно работать с автоматическими мыслями о собственной несостоятельности и не сводить ошибки к оценке всей личности.'],
            ['Выраженно сниженная самооценка', 'Самооценка сейчас сильно проседает. Это часто связано с депрессивными мыслями и жёсткой самокритикой. Лучше обсудить это со специалистом и не оставаться с этим одному.']
        ]
    },
    en: {
        phqQuestions: [
            'Little interest or pleasure in doing things you usually enjoy',
            'Feeling down, hopeless, or depressed',
            'Sleep problems (trouble falling asleep, waking often, or sleeping too much)',
            'Feeling tired or having little energy',
            'Poor appetite or overeating',
            'Feeling like a failure or feeling guilty',
            'Trouble concentrating (reading, TV, work)',
            'Moving or speaking so slowly that others notice, or the opposite: being very restless',
            'Thoughts that you would be better off dead or of hurting yourself'
        ],
        phqOptions: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        phqDiscuss: 'Discuss with the assistant',
        phqSafetyNoticeTitle: 'I noticed that you selected a non-zero response to question 9',
        phqSafetyNoticeBody: 'This item deserves separate attention, but this answer alone cannot determine whether you are in immediate danger. I want to check one important question:',
        phqSafetyQuestion: 'Are you currently thinking about harming yourself or ending your life?',
        phqSafetyYes: 'Yes, I am still having these thoughts',
        phqSafetyNo: 'No, I am not having these thoughts now',
        phqSafetyCurrentTitle: 'Your immediate safety matters most right now',
        phqSafetyCurrentBody: 'If you feel you may harm yourself soon, do not handle this alone. Try to stay with someone you trust and contact local emergency medical services, a crisis support service, or a professional as soon as possible.',
        phqSafetyCurrentPrecaution: 'While you are getting further help, move away from anything you might use to harm yourself.',
        phqSafetyCurrentButton: 'Talk with the assistant about immediate safety first',
        phqSafetyPastTitle: 'Thank you for clarifying',
        phqSafetyPastBody: 'Even though you are not having these thoughts now, having had them during the past two weeks still deserves attention. If they return, become more frequent, or involve a specific plan, seek professional support as soon as possible.',
        phqSafetyPastButton: 'Continue talking with the assistant',
        phqSafetyCurrentMessage: 'I just completed PHQ-9. I gave a non-zero response to question 9, and I am still having thoughts of harming myself. Please help me focus on my immediate safety first.',
        phqSafetyPastMessage: 'I just completed PHQ-9. I gave a non-zero response to question 9, but I am not currently thinking about harming myself. Please help me understand what this means and what I should pay attention to next.',
        phqLevels: [
            ['Minimal or none', 'Your results do not suggest significant signs of depression. Keep taking care of yourself.'],
            ['Mild depression', 'There may be signs of mild depression. Pay attention to sleep, activity, and social connection. Talk with the assistant about how you feel.'],
            ['Moderate depression', 'The results suggest moderate depression. It is worth contacting a professional for further assessment.'],
            ['Moderately severe depression', 'There are signs of marked depression. A consultation with a doctor or therapist is strongly recommended.'],
            ['Severe depression', 'This suggests severe depression. Please contact a specialist as soon as possible.']
        ],
        gadQuestions: [
            'Feeling nervous, anxious, or on edge',
            'Not being able to stop or control worrying',
            'Worrying too much about different things',
            'Trouble relaxing',
            'Being so restless that it is hard to sit still',
            'Becoming easily annoyed or irritable',
            'Feeling afraid as if something awful might happen'
        ],
        gadOptions: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        gadDiscuss: 'Discuss with the assistant',
        gadLevels: [
            ['Minimal anxiety', 'Signs of anxiety are minimal or absent. Keep following healthy routines.'],
            ['Mild anxiety', 'There are signs of mild anxiety. Try breathing exercises and reduce caffeine and stress overload.'],
            ['Moderate anxiety', 'The results suggest moderate anxiety. It would be useful to talk to a specialist. CBT tools can help a lot.'],
            ['Severe anxiety', 'There are signs of severe anxiety. Please contact a doctor or therapist.']
        ],
        esteemQuestions: [
            'I feel that I have a number of good qualities.',
            'At times I think I am no good at all.',
            'I am able to do things as well as most other people.',
            'I feel I do not have much to be proud of.',
            'On the whole, I am satisfied with myself.',
            'At times I feel useless.',
            'I feel that I am a person of worth, at least on an equal plane with others.',
            'I wish I could have more respect for myself.',
            'I am inclined to feel that I am a failure.',
            'I take a positive attitude toward myself.'
        ],
        esteemOptions: ['Strongly agree', 'Agree', 'Disagree', 'Strongly disagree'],
        esteemDiscuss: 'Discuss with the assistant',
        esteemDiscussMessage: 'My Rosenberg self-esteem score is {score} ({level}). Help me understand how to improve my self-evaluation.',
        esteemLevels: [
            ['Stable self-esteem', 'You seem to have a fairly stable inner support. Keep a respectful attitude toward yourself and notice your strengths.'],
            ['Moderate self-esteem', 'Your self-esteem is generally intact, but it may drop under stress. It can help to notice self-criticism and build a more balanced inner dialogue.'],
            ['Lowered self-esteem', 'There are signs of lowered self-esteem. It may help to work with automatic thoughts about inadequacy and not turn mistakes into a judgment of your whole self.'],
            ['Markedly lowered self-esteem', 'Your self-esteem seems to be under strong pressure right now. This often goes together with depressive thinking and harsh self-criticism. It would be good to discuss this with a professional and not stay alone with it.']
        ]
    },

    zh: {
        phqQuestions: [
            '做事情时提不起兴趣或没有愉快感',
            '感到情绪低落、沮丧或绝望',
            '入睡困难、容易醒来，或者睡得过多',
            '感到疲倦或缺乏精力',
            '食欲不振或吃得过多',
            '觉得自己很失败，或者觉得自己让自己或家人失望',
            '难以集中注意力，例如阅读、看电视或学习工作时',
            '动作或说话明显变慢，或者相反，烦躁不安、比平时活动更多',
            '出现过觉得不如死掉，或者想以某种方式伤害自己的念头'
        ],

        phqOptions: [
            '完全没有',
            '有几天',
            '一半以上的天数',
            '几乎每天'
        ],

        phqDiscuss: '与助手讨论结果',
        phqSafetyNoticeTitle: '我注意到你在第 9 题中选择了存在相关想法',
        phqSafetyNoticeBody: '这一项需要单独关注，但仅凭这一题不能判断你当前是否处于紧急风险。我想先确认一个重要问题：',
        phqSafetyQuestion: '你现在是否有伤害自己或结束自己生命的想法？',
        phqSafetyYes: '是，我现在仍有这样的想法',
        phqSafetyNo: '没有，我现在没有这样的想法',
        phqSafetyCurrentTitle: '当前安全比继续完成测评更重要',
        phqSafetyCurrentBody: '如果你觉得自己可能马上伤害自己，请不要独自处理。尽量待在可信任的人身边，并尽快联系当地的紧急医疗服务、危机支持服务或专业人员。',
        phqSafetyCurrentPrecaution: '在获得进一步帮助之前，尽量远离可能被用来伤害自己的物品。',
        phqSafetyCurrentButton: '让助手先陪我处理当前安全问题',
        phqSafetyPastTitle: '谢谢你的确认',
        phqSafetyPastBody: '虽然你现在没有这样的想法，但过去两周出现过相关想法仍值得关注。如果它再次出现、变得更频繁，或者开始出现具体计划，建议尽快寻求专业支持。',
        phqSafetyPastButton: '和助手继续聊聊',
        phqSafetyCurrentMessage: '我刚刚完成了PHQ-9，第9题有非零回答，而且我现在仍然有伤害自己的想法。请先帮助我关注当前安全。',
        phqSafetyPastMessage: '我刚刚完成了PHQ-9，第9题有非零回答，但我现在没有伤害自己的想法。请帮我理解这意味着什么，以及接下来应该关注什么。',

        phqLevels: [
            [
                '无或极轻微抑郁症状',
                '目前记录到的抑郁相关症状较少。可以继续关注自己的情绪、睡眠、活动和日常状态。'
            ],
            [
                '轻度抑郁症状',
                '目前记录到一些轻度抑郁相关症状。可以留意睡眠、活动量、压力来源和社交状态的变化。'
            ],
            [
                '中度抑郁症状',
                '目前记录到较明显的抑郁相关症状。建议持续关注这些症状对学习、工作和生活的影响，必要时寻求专业人员进一步评估。'
            ],
            [
                '中重度抑郁症状',
                '目前记录到较多抑郁相关症状，并可能对日常生活产生较明显影响。建议考虑向心理咨询师、心理治疗师或其他专业人员寻求进一步支持。'
            ],
            [
                '重度抑郁症状',
                '目前记录到较多且较明显的抑郁相关症状。建议尽快寻求专业人员进一步评估和支持。'
            ]
        ],

        gadQuestions: [
            '感到紧张、焦虑或不安',
            '无法停止或控制担忧',
            '对各种事情担忧过多',
            '很难放松下来',
            '坐立不安，以至于很难安静地坐着',
            '容易烦躁或易怒',
            '担心会发生可怕的事情'
        ],

        gadOptions: [
            '完全没有',
            '有几天',
            '一半以上的天数',
            '几乎每天'
        ],

        gadDiscuss: '与助手讨论结果',

        gadLevels: [
            [
                '无或极轻微焦虑症状',
                '目前记录到的焦虑症状较少，可以继续关注自己的情绪和生活状态。'
            ],
            [
                '轻度焦虑症状',
                '目前记录到一些轻度焦虑症状。可以留意压力来源、自动思维以及它们对生活的影响。'
            ],
            [
                '中度焦虑症状',
                '目前记录到较明显的焦虑症状。建议持续关注这些症状对学习、工作、睡眠和生活的影响，必要时寻求专业支持。'
            ],
            [
                '重度焦虑症状',
                '目前记录到较多焦虑症状。如果症状持续存在或明显影响日常生活，建议寻求专业人员进一步评估和支持。'
            ]
        ],

        esteemQuestions: [
            '我觉得自己有许多优点。',
            '有时候我觉得自己一无是处。',
            '我能够把事情做得和大多数人一样好。',
            '我觉得自己没有什么值得骄傲的地方。',
            '总体来说，我对自己持积极的态度。',
            '有时候我觉得自己毫无用处。',
            '我觉得自己是一个有价值的人，至少与别人一样有价值。',
            '我希望自己能够更加尊重自己。',
            '总的来说，我倾向于认为自己是一个失败者。',
            '总体来说，我对自己是满意的。'
        ],

        esteemOptions: [
            '非常同意',
            '同意',
            '不同意',
            '非常不同意'
        ],

        esteemDiscuss: '与助手讨论结果',
        esteemDiscussMessage: '我的 Rosenberg 自尊量表结果是 {score} 分（{level}），请帮我分析如何提升自我评价。',

        esteemLevels: [
            [
                '较稳定的自尊水平',
                '目前的结果显示，你对自己的整体评价和自我价值感相对稳定。可以继续关注自己的优势和真实努力。'
            ],
            [
                '中等自尊水平',
                '你的自我评价整体较为稳定，但在压力较大的情况下可能会受到影响。可以留意过度自我批评以及负面的自动思维。'
            ],
            [
                '较低的自尊水平',
                '目前记录到一些较低自我评价的表现。可以尝试识别关于“我不够好”的自动思维，并区分一次失败和对整个自己的评价。'
            ],
            [
                '明显较低的自尊水平',
                '目前的结果显示自我评价受到较明显影响。如果这种状态持续存在，并影响到学习、工作、人际关系或情绪状态，可以考虑寻求专业支持。'
            ]
        ]
    }
};

function assessmentText(key) {
    const lang = window.getCurrentLanguage
        ? window.getCurrentLanguage()
        : 'zh';

    return (
        ASSESSMENT_I18N[lang] &&
        ASSESSMENT_I18N[lang][key]
    ) || ASSESSMENT_I18N.zh[key] || ASSESSMENT_I18N.en[key];
}

const PHQ9_Q = assessmentText('phqQuestions');
const PHQ9_OPTS = assessmentText('phqOptions');

function initPHQ() {
    let c = document.getElementById('phqQuestions');
    if (c.children.length > 0) return;
    assessmentText('phqQuestions').forEach((q, i) => {
        let div = document.createElement('div');
        div.style = 'margin-bottom: 20px; border-bottom: 1px solid var(--border); padding-bottom: 16px;';
        div.innerHTML = `<p style="font-size:14px; margin-bottom: 10px; font-weight: 500;">${i + 1}. ${q}</p>
                <div style="display:flex; flex-direction:column; gap:6px;">
                ${assessmentText('phqOptions').map((opt, j) => `
                  <label style="display:flex; align-items:center; gap:8px; font-size:13px; color: var(--gray); cursor:pointer;">
                    <input type="radio" name="phq${i}" value="${j}" required style="accent-color: var(--accent);"> ${opt}
                  </label>`).join('')}
                </div>`;
        c.appendChild(div);
    });
}

document.getElementById('phqModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('phqModal')) return;
    initPHQ();
});


function submitPHQ(e) {
    e.preventDefault();

    let total = 0;
    let item9Score = 0;

    assessmentText('phqQuestions').forEach((_, i) => {
        const val = document.querySelector(`input[name="phq${i}"]:checked`);

        if (!val) return;

        const score = parseInt(val.value);
        total += score;

        // 数组从 0 开始，所以 i === 8 就是第 9 题。
        if (i === 8) {
            item9Score = score;
        }
    });

    let level, color, advice;
    const levels = assessmentText('phqLevels');

    if (total <= 4) { [level, advice] = levels[0]; color = 'var(--success)'; }
    else if (total <= 9) { [level, advice] = levels[1]; color = 'var(--warning)'; }
    else if (total <= 14) { [level, advice] = levels[2]; color = 'var(--warning)'; }
    else if (total <= 19) { [level, advice] = levels[3]; color = 'var(--danger)'; }
    else { [level, advice] = levels[4]; color = 'var(--danger)'; }

    const lang = cbtLang();
    const discussMessage =
        lang === 'en'
            ? `My PHQ-9 score is ${total} (${level}). Help me understand what to do next.`
            : lang === 'ru'
                ? `Мой PHQ-9 показал ${total} баллов (${level}). Помоги мне понять, что делать дальше.`
                : `我的PHQ-9测试结果是${total}分（${level}），请帮我分析下一步应该怎么办。`;

    const safetySection = item9Score > 0
        ? `
            <div
                id="phqSafetyNotice"
                style="
                    margin-top:16px;
                    padding:16px;
                    border:1px solid var(--danger);
                    border-radius:12px;
                    background:rgba(220, 53, 69, 0.06);
                "
            >
                <div
                    style="
                        font-size:14px;
                        font-weight:600;
                        margin-bottom:8px;
                        color:var(--text);
                    "
                >
                    ${assessmentText('phqSafetyNoticeTitle')}
                </div>

                <p
                    style="
                        font-size:13px;
                        color:var(--gray);
                        line-height:1.7;
                        margin-bottom:14px;
                    "
                >
                    ${assessmentText('phqSafetyNoticeBody')}
                    <strong>${assessmentText('phqSafetyQuestion')}</strong>
                </p>

                <div style="display:flex;gap:10px;flex-wrap:wrap;">
                    <button
                        type="button"
                        onclick="handlePHQSafetyAnswer(true)"
                        style="
                            padding:9px 14px;
                            border:none;
                            border-radius:8px;
                            background:var(--danger);
                            color:white;
                            cursor:pointer;
                        "
                    >
                        ${assessmentText('phqSafetyYes')}
                    </button>

                    <button
                        type="button"
                        onclick="handlePHQSafetyAnswer(false)"
                        style="
                            padding:9px 14px;
                            border:1px solid var(--border);
                            border-radius:8px;
                            background:var(--panel);
                            color:var(--text);
                            cursor:pointer;
                        "
                    >
                        ${assessmentText('phqSafetyNo')}
                    </button>
                </div>
            </div>
        `
        : '';

    const r = document.getElementById('phqResult');
    r.style.display = 'block';
    r.innerHTML = `
        <div style="font-size:36px;font-weight:700;color:${color};margin-bottom:4px;">${total} / 27</div>
        <div style="font-size:15px;font-weight:600;color:${color};margin-bottom:12px;">${level}</div>
        <p style="font-size:13px;color:var(--gray);line-height:1.6;">${advice}</p>
        ${safetySection}
        <button onclick="sendQuick('${inlineJsString(discussMessage)}')"
          style="margin-top:16px;padding:10px 16px;border-radius:8px;border:1px solid var(--border);background:transparent;cursor:pointer;font-size:13px;color:var(--text);">
          ${assessmentText('phqDiscuss')}
        </button>`;

    r.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Save PHQ result for dashboard.
    let phqHist = JSON.parse(localStorage.getItem('phqHistory') || '[]');
    phqHist.push({
        score: total,
        level: level,
        item9_score: item9Score,
        safety_followup_required: item9Score > 0,
        date: new Date().toISOString()
    });
    localStorage.setItem('phqHistory', JSON.stringify(phqHist));
    syncTests();
}

/* ── GAD-7 ── */
function initGAD() {
    let c = document.getElementById('gadQuestions');

    if (!c) {
        console.error('找不到 gadQuestions 容器');
        return;
    }

    if (c.children.length > 0) return;

    assessmentText('gadQuestions').forEach((q, i) => {
        let div = document.createElement('div');

        div.style =
            'margin-bottom: 20px; border-bottom: 1px solid var(--border); padding-bottom: 16px;';

        div.innerHTML = `
            <p style="font-size:14px; margin-bottom:10px; font-weight:500;">
                ${i + 1}. ${q}
            </p>

            <div style="display:flex; flex-direction:column; gap:6px;">
                ${assessmentText('gadOptions').map((opt, j) => `
                    <label style="
                        display:flex;
                        align-items:center;
                        gap:8px;
                        font-size:13px;
                        color:var(--gray);
                        cursor:pointer;
                    ">
                        <input
                            type="radio"
                            name="gad${i}"
                            value="${j}"
                            required
                            style="accent-color:var(--accent);"
                        >
                        ${opt}
                    </label>
                `).join('')}
            </div>
        `;

        c.appendChild(div);
    });
}
document.getElementById('gadModal')
    ?.addEventListener('click', () => initGAD());

document.querySelector('[onclick*="gadModal"]')
    ?.addEventListener('click', initGAD);
function submitGAD(e) {
    e.preventDefault();

    let total = 0;

    assessmentText('gadQuestions').forEach((_, i) => {
        const val = document.querySelector(`input[name="gad${i}"]:checked`);

        if (val) {
            total += parseInt(val.value);
        }
    });

    let level, color, advice;
    const levels = assessmentText('gadLevels');

    if (total <= 4) { [level, advice] = levels[0]; color = 'var(--success)'; }
    else if (total <= 9) { [level, advice] = levels[1]; color = 'var(--warning)'; }
    else if (total <= 14) { [level, advice] = levels[2]; color = 'var(--warning)'; }
    else { [level, advice] = levels[3]; color = 'var(--danger)'; }

    const lang = cbtLang();
    const discussMessage =
        lang === 'en'
            ? `My GAD-7 score is ${total} (${level}). How can I cope with this?`
            : lang === 'ru'
                ? `Мой GAD-7 показал ${total} баллов (${level}). Как мне справиться с этим?`
                : `我的GAD-7测试结果是${total}分（${level}），请帮我分析如何改善。`;

    const r = document.getElementById('gadResult');
    r.style.display = 'block';
    r.innerHTML = `
        <div style="font-size:36px;font-weight:700;color:${color};margin-bottom:4px;">${total} / 21</div>
        <div style="font-size:15px;font-weight:600;color:${color};margin-bottom:12px;">${level}</div>
        <p style="font-size:13px;color:var(--gray);line-height:1.6;">${advice}</p>
        <button onclick="sendQuick('${inlineJsString(discussMessage)}')"
          style="margin-top:16px;padding:10px 16px;border-radius:8px;border:1px solid var(--border);background:transparent;cursor:pointer;font-size:13px;color:var(--text);">
          ${assessmentText('gadDiscuss')}
        </button>`;

    r.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Save GAD result for dashboard.
    let gadHist = JSON.parse(localStorage.getItem('gadHistory') || '[]');
    gadHist.push({ score: total, level, date: new Date().toISOString() });
    localStorage.setItem('gadHistory', JSON.stringify(gadHist));
    syncTests();
}
function handlePHQSafetyAnswer(hasCurrentThoughts) {
    const box = document.getElementById('phqSafetyNotice');

    if (!box) return;

    if (hasCurrentThoughts) {
        box.innerHTML = `
            <div
                style="
                    font-size:15px;
                    font-weight:600;
                    color:var(--danger);
                    margin-bottom:10px;
                "
            >
                ${assessmentText('phqSafetyCurrentTitle')}
            </div>

            <p
                style="
                    font-size:13px;
                    line-height:1.7;
                    color:var(--text);
                    margin-bottom:10px;
                "
            >
                ${assessmentText('phqSafetyCurrentBody')}
            </p>

            <p
                style="
                    font-size:13px;
                    line-height:1.7;
                    color:var(--gray);
                    margin-bottom:14px;
                "
            >
                ${assessmentText('phqSafetyCurrentPrecaution')}
            </p>

            <button
                type="button"
                onclick="sendPHQSafetyMessage(true)"
                style="
                    padding:9px 14px;
                    border:none;
                    border-radius:8px;
                    background:var(--danger);
                    color:white;
                    cursor:pointer;
                "
            >
                ${assessmentText('phqSafetyCurrentButton')}
            </button>
        `;

    } else {
        box.innerHTML = `
            <div
                style="
                    font-size:14px;
                    font-weight:600;
                    color:var(--text);
                    margin-bottom:8px;
                "
            >
                ${assessmentText('phqSafetyPastTitle')}
            </div>

            <p
                style="
                    font-size:13px;
                    line-height:1.7;
                    color:var(--gray);
                    margin-bottom:12px;
                "
            >
                ${assessmentText('phqSafetyPastBody')}
            </p>

            <button
                type="button"
                onclick="sendPHQSafetyMessage(false)"
                style="
                    padding:9px 14px;
                    border:1px solid var(--border);
                    border-radius:8px;
                    background:var(--panel);
                    color:var(--text);
                    cursor:pointer;
                "
            >
                ${assessmentText('phqSafetyPastButton')}
            </button>
        `;
    }
}
function sendPHQSafetyMessage(hasCurrentThoughts) {
    closeModal('phqModal');

    const inp = document.getElementById('msgInput');

    if (!inp) return;

    inp.value = hasCurrentThoughts
        ? assessmentText('phqSafetyCurrentMessage')
        : assessmentText('phqSafetyPastMessage');

    if (typeof sendMessage === 'function') {
        sendMessage();
    }
}

window.sendPHQSafetyMessage = sendPHQSafetyMessage;
window.handlePHQSafetyAnswer = handlePHQSafetyAnswer;

/* ── Rosenberg Self-Esteem Scale ── */
const ESTEEM_REVERSE = [1, 3, 5, 7, 8];

function initEsteem() {
    let c = document.getElementById('esteemQuestions');
    if (!c || c.children.length > 0) return;
    assessmentText('esteemQuestions').forEach((q, i) => {
        let div = document.createElement('div');
        div.style = 'margin-bottom: 20px; border-bottom: 1px solid var(--border); padding-bottom: 16px;';
        div.innerHTML = `<p style="font-size:14px; margin-bottom: 10px; font-weight: 500;">${i + 1}. ${q}</p>
                <div style="display:flex; flex-direction:column; gap:6px;">
                ${assessmentText('esteemOptions').map((opt, j) => `
                  <label style="display:flex; align-items:center; gap:8px; font-size:13px; color: var(--gray); cursor:pointer;">
                    <input type="radio" name="esteem${i}" value="${j}" required style="accent-color: var(--accent);"> ${opt}
                  </label>`).join('')}
                </div>`;
        c.appendChild(div);
    });
}
document.getElementById('esteemModal').addEventListener('click', () => initEsteem());
document.querySelector('[onclick*="esteemModal"]')?.addEventListener('click', initEsteem);

function submitEsteem(e) {
    e.preventDefault();
    let total = 0;
    assessmentText('esteemQuestions').forEach((_, i) => {
        let v = document.querySelector(`input[name="esteem${i}"]:checked`);
        if (!v) return;
        let score = parseInt(v.value);
        if (!ESTEEM_REVERSE.includes(i)) score = 3 - score;
        total += score;
    });

    let level, color, advice;
    const levels = assessmentText('esteemLevels');
    if (total >= 25) { [level, advice] = levels[0]; color = 'var(--success)'; }
    else if (total >= 18) { [level, advice] = levels[1]; color = 'var(--warning)'; }
    else if (total >= 10) { [level, advice] = levels[2]; color = 'var(--warning)'; }
    else { [level, advice] = levels[3]; color = 'var(--danger)'; }

    const esteemDiscussMessage = assessmentText('esteemDiscussMessage')
        .replace('{score}', String(total))
        .replace('{level}', level);

    let r = document.getElementById('esteemResult');
    r.style.display = 'block';
    r.innerHTML = `
                <div style="font-size:36px;font-weight:700;color:${color};margin-bottom:4px;">${total} / 30</div>
                <div style="font-size:15px;font-weight:600;color:${color};margin-bottom:12px;">${level}</div>
                <p style="font-size:13px;color:var(--gray);line-height:1.6;">${advice}</p>
                <button onclick="sendQuick('${inlineJsString(esteemDiscussMessage)}')"
                  style="margin-top:16px;padding:10px 16px;border-radius:8px;border:1px solid var(--border);background:transparent;cursor:pointer;font-size:13px;color:var(--text);">
                  ${assessmentText('esteemDiscuss')}
                </button>`;
    r.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    let esteemHist = JSON.parse(localStorage.getItem('esteemHistory') || '[]');
    esteemHist.push({ score: total, level, date: new Date().toISOString() });
    localStorage.setItem('esteemHistory', JSON.stringify(esteemHist));
    syncTests();
}

function refreshLocalizedTests() {
    ['phqQuestions', 'gadQuestions', 'esteemQuestions'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.innerHTML = '';
    });
    ['phqResult', 'gadResult', 'esteemResult'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) {
            el.style.display = 'none';
            el.innerHTML = '';
        }
    });
    if (document.getElementById('phqModal')?.style.display === 'flex') initPHQ();
    if (document.getElementById('gadModal')?.style.display === 'flex') initGAD();
    if (document.getElementById('esteemModal')?.style.display === 'flex') initEsteem();
}
window.refreshLocalizedTests = refreshLocalizedTests;

/* ── Sleep Diary ── */
let _sleepInit = normalizeLocalEntries(JSON.parse(localStorage.getItem('sleepLog') || '[]'), 'sleep');
let sleepLog = _sleepInit.entries;
if (_sleepInit.changed) localStorage.setItem('sleepLog', JSON.stringify(sleepLog));

function persistSleepLog() {
    localStorage.setItem('sleepLog', JSON.stringify(sleepLog));
    syncData('/api/sync/sleep', 'sleepLog');
}

function updateSleepFormMode() {
    var title = document.getElementById('sleepModalTitle');
    var submit = document.getElementById('sleepSubmitBtn');
    if (title) title.innerText = _editingSleepId ? cbtText('editSleepTitle') : cbtText('sleep_add_title');
    if (submit) submit.innerText = _editingSleepId ? cbtText('saveChanges') : cbtText('save_entry');
}

function resetSleepEditor() {
    _editingSleepId = null;
    var form = document.querySelector('#sleepModal form');
    if (form) form.reset();
    var bed = document.getElementById('slBed');
    var wake = document.getElementById('slWake');
    var awake = document.getElementById('slAwk');
    var qual = document.getElementById('slQual');
    var qualLabel = document.getElementById('slQualLabel');
    var notes = document.getElementById('slNotes');
    if (bed) bed.value = '23:00';
    if (wake) wake.value = '07:00';
    if (awake) awake.value = '0';
    if (qual) qual.value = '6';
    if (qualLabel) qualLabel.innerText = '6';
    if (notes) notes.value = '';
    updateSleepFormMode();
}
window.resetSleepEditor = resetSleepEditor;

function openSleepEntryModal(entryId) {
    resetSleepEditor();
    if (entryId) {
        var record = sleepLog.find(function (item) { return item.id === entryId; });
        if (record) {
            _editingSleepId = entryId;
            document.getElementById('slBed').value = record.bed || '23:00';
            document.getElementById('slWake').value = record.wake || '07:00';
            document.getElementById('slAwk').value = String(record.awk ?? 0);
            document.getElementById('slQual').value = String(record.qual ?? 6);
            document.getElementById('slQualLabel').innerText = String(record.qual ?? 6);
            document.getElementById('slNotes').value = record.notes || '';
        }
    }
    updateSleepFormMode();
    openModal('sleepModal');
}
window.openSleepEntryModal = openSleepEntryModal;

function submitSleep(e) {
    e.preventDefault();
    const wasEditing = _editingSleepId !== null;
    let bed = document.getElementById('slBed').value;
    let wake = document.getElementById('slWake').value;
    let awk = parseInt(document.getElementById('slAwk').value) || 0;
    let qual = parseInt(document.getElementById('slQual').value);
    let notes = document.getElementById('slNotes').value;

    // Calculate total sleep hours (simple)
    let [bh, bm] = bed.split(':').map(Number);
    let [wh, wm] = wake.split(':').map(Number);
    let bedMins = bh * 60 + bm;
    let wakeMins = wh * 60 + wm;
    if (wakeMins < bedMins) wakeMins += 24 * 60;
    let durHrs = ((wakeMins - bedMins) / 60).toFixed(1);

    if (_editingSleepId) {
        sleepLog = sleepLog.map(function (entry) {
            if (entry.id !== _editingSleepId) return entry;
            return Object.assign({}, entry, { bed, wake, awk, qual, notes, durHrs });
        });
    } else {
        let entry = {
            id: makeLocalEntryId('sleep'),
            date: new Date().toLocaleDateString(cbtLocale(), { day: 'numeric', month: 'short' }),
            bed,
            wake,
            awk,
            qual,
            notes,
            durHrs,
            isoDate: new Date().toISOString()
        };
        sleepLog.unshift(entry);
        if (sleepLog.length > 30) sleepLog.pop();
    }
    persistSleepLog();
    closeModal('sleepModal');
    openSleepHistoryModal();
    addMsg('assistant', wasEditing ? cbtText('sleepEntryUpdated') : cbtText('sleepEntrySaved'));
}
window.submitSleep = submitSleep;
function openSleepHistoryModal() {
    openModal('sleepHistModal');
    const c = document.getElementById('sleepHistContent');
    const recs = JSON.parse(localStorage.getItem('sleepLog') || '[]');
    window._sleepHistRecs = recs;

    if (!recs.length) {
        c.style.marginTop = '24px';
        c.innerHTML = `
            <div class="empty-state-wrap">
                <div class="empty-state-icon" style="background:linear-gradient(135deg,rgba(121,114,152,.12),rgba(121,114,152,.22));">
                    <i data-lucide="moon" style="width:38px;height:38px;color:#797298;"></i>
                </div>
                <div class="empty-state-title">${cbtText('noSleepEntries')}</div>
                <div class="empty-state-sub">${cbtText('noSleepEntriesSub')}</div>
            </div>`;
        lucide.createIcons();
        return;
    }

    c.style.marginTop = '16px';
    c.innerHTML = `
        <div style="display:flex;gap:0;height:430px;margin:0 -12px 0 -4px;">
            <div style="flex:0 0 246px;border-right:1px solid var(--border);display:flex;flex-direction:column;overflow:hidden;padding-left:4px;">
                <div id="sleepHistListItems" style="overflow-y:auto;flex:1;padding:8px 10px 8px 0;">
                    ${_renderSleepHistList(recs, 0)}
                </div>
            </div>
            <div id="sleepHistDetail" style="flex:1;overflow-y:auto;padding:8px 28px 24px 24px;min-width:0;">
                ${_renderSleepHistDetail(recs[0])}
            </div>
        </div>`;

    lucide.createIcons();
}

function _renderSleepHistList(recs, selectedIdx) {
    const groups = {};
    recs.forEach((r, i) => {
        const d = r.isoDate ? new Date(r.isoDate) : new Date();
        const label = _dateGroupLabel(d);
        if (!groups[label]) groups[label] = [];
        groups[label].push({ r, i, d });
    });
    let html = '';
    for (const [label, items] of Object.entries(groups)) {
        html += `<div class="hist-group-label">${label}</div>`;
        items.forEach(({ r, i, d }) => {
            const dateStr = d.toLocaleDateString(cbtLocale(), { day: 'numeric', month: 'short' });
            html += `
                <div class="hist-list-item${i === selectedIdx ? ' selected' : ''}"
                    data-sleep-hist-idx="${i}"
                    onclick="selectSleepHistItem(${i})">
                    <div style="font-size:11px;color:var(--gray);margin-bottom:6px;">${dateStr}</div>
                    <div style="font-size:13px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:4px;">
                        ${cbtEscapeHtml(r.durHrs)}${cbtLang() === 'zh' ? '小时' : (cbtLang() === 'en' ? 'h' : 'ч')} <span style="color:var(--gray);">·</span> <i data-lucide="star" style="width:12px;color:var(--accent);fill:var(--accent);"></i> ${cbtEscapeHtml(r.qual)}/10
                    </div>
                </div>`;
        });
    }
    return html;
}

function _renderSleepHistDetail(r) {
    if (!r) return `<div style="color:var(--gray);text-align:center;padding-top:80px;font-size:13px;">${cbtText('selectEntry')}</div>`;
    const d = r.isoDate ? new Date(r.isoDate) : new Date();
    const dateStr = d.toLocaleDateString(cbtLocale(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const editAction = r.id
        ? `<div style="display:flex;justify-content:flex-end;margin-bottom:12px;">
            <button onclick="editSleepEntry('${inlineJsString(r.id)}')" style="display:inline-flex;align-items:center;gap:6px;border:1px solid var(--border);background:var(--panel);color:var(--text);border-radius:10px;padding:8px 12px;cursor:pointer;font-size:12px;">
                <i data-lucide="pencil" style="width:13px;"></i>${cbtText('edit')}
            </button>
        </div>`
        : '';

    // Calculate simple stats blocks for sleep
    return `
        <div style="font-size:12px;color:var(--gray);padding:8px 0 4px;margin-bottom:16px;display:flex;align-items:center;gap:5px;border-bottom:1px solid var(--border);">
            <i data-lucide="calendar" style="width:12px;flex-shrink:0;"></i>
            <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${dateStr}</span>
        </div>
        ${editAction}
        
        <div style="display:flex;gap:12px;margin-bottom:24px;">
            <div style="flex:1;background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:14px;text-align:center;">
                <div style="font-size:24px;font-weight:700;color:var(--accent);">${cbtEscapeHtml(r.durHrs)}${cbtLang() === 'zh' ? '小时' : (cbtLang() === 'en' ? 'h' : 'ч')}</div>
                <div style="font-size:11px;color:var(--gray);">${cbtText('duration')}</div>
            </div>
            <div style="flex:1;background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:14px;text-align:center;">
                <div style="font-size:24px;font-weight:700;color:var(--accent);">${cbtEscapeHtml(r.qual)}/10</div>
                <div style="font-size:11px;color:var(--gray);">${cbtText('quality')}</div>
            </div>
        </div>

        <div class="hist-detail-field">
            <div class="hist-detail-label">${cbtText('sleepSchedule')}</div>
            <div class="hist-detail-value">${cbtEscapeHtml(r.bed)} — ${cbtEscapeHtml(r.wake)}</div>
        </div>
        <div class="hist-detail-field">
            <div class="hist-detail-label">${cbtText('awakenings')}</div>
            <div class="hist-detail-value">${cbtFormat('timesCount', { count: cbtEscapeHtml(r.awk) })}</div>
        </div>
        ${r.notes ? `
        <div class="hist-detail-field">
            <div class="hist-detail-label">${cbtText('notes')}</div>
            <div class="hist-detail-value">${cbtEscapeHtml(r.notes)}</div>
        </div>` : ''}`;
}

function editSleepEntry(entryId) {
    closeModal('sleepHistModal');
    openSleepEntryModal(entryId);
}

function selectSleepHistItem(idx) {
    document.querySelectorAll('[data-sleep-hist-idx]').forEach(el => {
        el.classList.toggle('selected', parseInt(el.dataset.sleepHistIdx) === idx);
    });
    const detail = document.getElementById('sleepHistDetail');
    if (detail && window._sleepHistRecs) {
        detail.innerHTML = _renderSleepHistDetail(window._sleepHistRecs[idx]);
        lucide.createIcons();
    }
}

window.openSleepHistoryModal = openSleepHistoryModal;
window.selectSleepHistItem = selectSleepHistItem;
window.editSleepEntry = editSleepEntry;


/* ── Activity Planner ── */
let _activitiesInit = normalizeLocalEntries(JSON.parse(localStorage.getItem('activities') || '[]'), 'activity');
let activities = _activitiesInit.entries;
if (_activitiesInit.changed) localStorage.setItem('activities', JSON.stringify(activities));
let actMoodIdx = -1;

function persistActivities() {
    localStorage.setItem('activities', JSON.stringify(activities));
    syncData('/api/sync/activities', 'activities');
}

const RHYTHM_SLOTS = [
    {
        id: 'morning',
        icon: 'sunrise',
        title: 'Старт дня',
        title_en: 'Start of day',
        title_zh: '开启一天',
        color: '#f59e0b',
        suggestions: [
            'Выпить стакан воды',
            'Заправить кровать',
            'Сделать глубокий вдох',
            'Умыться'
        ],
        suggestions_en: [
            'Drink a glass of water',
            'Make the bed',
            'Take one deep breath',
            'Wash your face'
        ],
        suggestions_zh: [
            '喝一杯水',
            '整理床铺',
            '做一次深呼吸',
            '洗脸'
        ]
    },
    {
        id: 'body',
        icon: 'activity',
        title: 'Для тела',
        title_en: 'For the body',
        title_zh: '照顾身体',
        color: '#10b981',
        suggestions: [
            'Потянуться 5 минут',
            'Короткая прогулка',
            'Потанцевать под музыку',
            'Размять плечи'
        ],
        suggestions_en: [
            'Stretch for 5 minutes',
            'Take a short walk',
            'Dance to one song',
            'Roll your shoulders'
        ],
        suggestions_zh: [
            '拉伸5分钟',
            '进行一次短距离散步',
            '跟着音乐活动一下',
            '放松肩颈'
        ]
    },
    {
        id: 'joy',
        icon: 'heart',
        title: 'Для души',
        title_en: 'For the soul',
        title_zh: '愉悦自己',
        color: '#ef4444',
        suggestions: [
            'Посмотреть смешное видео',
            'Почитать книгу',
            'Выпить вкусный чай',
            'Послушать музыку'
        ],
        suggestions_en: [
            'Watch something funny',
            'Read a few pages',
            'Drink a nice tea',
            'Listen to music'
        ],
        suggestions_zh: [
            '看一个有趣的视频',
            '读几页书',
            '喝一杯喜欢的饮品',
            '听一会儿音乐'
        ]
    }
];

function getDateGroup(isoDate) {
    if (!isoDate) return cbtText('earlier');
    var d = new Date(isoDate);
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var itemDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    if (itemDate.getTime() === today.getTime()) return cbtText('today');
    return cbtText('earlier');
}

function renderActivities() {
    var slotsContainer = document.getElementById('actSlots');
    var stats = document.getElementById('actStats');
    if (!slotsContainer) return;

    // Find today's activities
    var todayActs = activities.filter(function (a) { return getDateGroup(a.isoDate) === cbtText('today'); });

    var html = '';
    var doneCount = 0;

    RHYTHM_SLOTS.forEach(function (slot) {
        // Find if this slot is already filled today
        var actObj = todayActs.find(function (a) { return a.category === slot.id; });
        var actGlobalIdx = actObj ? activities.indexOf(actObj) : -1;
        var slotTitle = cbtLang() === 'zh'
            ? slot.title_zh
            : (cbtLang() === 'en' ? slot.title_en : slot.title);

        var slotSuggestions = cbtLang() === 'zh'
            ? slot.suggestions_zh
            : (cbtLang() === 'en' ? slot.suggestions_en : slot.suggestions);

        if (actObj) {
            if (actObj.done) doneCount++;
            var moodBadge = '';
            if (actObj.done && actObj.mood) {
                moodBadge = '<span style="font-size:11px;color:' + (actObj.mood >= 7 ? 'var(--success)' : actObj.mood >= 4 ? 'var(--warning)' : 'var(--danger)') + ';margin-left:auto;white-space:nowrap;font-weight:600;">' + cbtText('moodAfter') + ': ' + cbtEscapeHtml(actObj.mood) + '/10</span>';
            } else if (actObj.done) {
                moodBadge = '<span style="font-size:11px;color:var(--success);margin-left:auto;font-weight:600;"><i data-lucide="check" style="width:14px;"></i></span>';
            }

            html += '<div style="background:var(--bg); border:1px solid var(--border); border-radius:12px; padding:16px; display:flex; align-items:center; gap:14px; ' + (actObj.done ? 'opacity:0.6;' : '') + ' transition:all 0.2s;">';
            html += '<div style="width:42px;height:42px;border-radius:12px;background:var(--panel);color:var(--text);display:flex;align-items:center;justify-content:center;flex-shrink:0;">';
            html += '<i data-lucide="' + slot.icon + '" style="width:20px;"></i>';
            html += '</div>';
            html += '<div style="flex:1;min-width:0;">';
            html += '<div style="font-size:12px;font-weight:700;color:var(--text);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">' + slotTitle + '</div>';
            html += '<div style="font-size:14px;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;' + (actObj.done ? 'text-decoration:line-through;color:var(--gray);' : '') + '">' + cbtEscapeHtml(actObj.text) + '</div>';
            html += '</div>';
            html += moodBadge;
            html += '<button onclick="editActivity(' + actGlobalIdx + ')" title="' + cbtText('edit') + '" style="background:none;border:none;cursor:pointer;color:var(--gray);font-size:16px;padding:4px;margin-left:8px;display:flex;align-items:center;"><i data-lucide="pencil" style="width:16px;"></i></button>';
            html += '<input type="checkbox" ' + (actObj.done ? 'checked' : '') + ' onchange="toggleActivity(' + actGlobalIdx + ')" style="width:22px;height:22px;accent-color:var(--accent);cursor:pointer;flex-shrink:0;margin-left:12px;">';
            if (!actObj.done) {
                html += '<button onclick="removeActivity(' + actGlobalIdx + ')" title="' + cbtText('delete') + '" style="background:none;border:none;cursor:pointer;color:var(--gray);font-size:16px;padding:4px;margin-left:4px;display:flex;align-items:center;"><i data-lucide="trash-2" style="width:16px;"></i></button>';
            }
            html += '</div>';
        } else {
            // Empty slot, show input
            var rndSugg = slotSuggestions[Math.floor(Math.random() * slotSuggestions.length)];
            html += '<div style="background:var(--bg); border:1px dashed var(--border); border-radius:12px; padding:16px; display:flex; align-items:flex-start; gap:14px;">';
            html += '<div style="width:42px;height:42px;border-radius:12px;background:var(--panel);color:var(--gray);display:flex;align-items:center;justify-content:center;flex-shrink:0;">';
            html += '<i data-lucide="' + slot.icon + '" style="width:20px;"></i>';
            html += '</div>';
            html += '<div style="flex:1;min-width:0;">';
            html += '<div style="font-size:12px;font-weight:700;color:var(--text);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">' + slotTitle + '</div>';
            html += '<div style="display:flex; gap:8px;">';
            html += '<input type="text" id="slotInp_' + slot.id + '" placeholder="' + cbtText('forExample') + rndSugg + '" style="flex:1; padding:10px 14px; border:1px solid var(--border); border-radius:8px; font-size:13px; outline:none; background:var(--panel); min-width:0;" onkeydown="if(event.key===\'Enter\')addSlotActivity(\'' + slot.id + '\')">';
            html += '<button onclick="addSlotActivity(\'' + slot.id + '\')" class="btn-primary" style="width:auto; padding:8px 12px; border-radius:8px; font-size:12px; white-space:nowrap; flex-shrink:0; background:var(--accent); transition:none;">' + cbtText('save') + '</button>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        }
    });

    // Custom activities
    var customActs = todayActs.filter(function (a) { return !RHYTHM_SLOTS.some(function (s) { return s.id === a.category; }); });
    customActs.forEach(function (actObj) {
        var actGlobalIdx = activities.indexOf(actObj);
        if (actObj.done) doneCount++;
        var moodBadge = '';
        if (actObj.done && actObj.mood) {
            moodBadge = '<span style="font-size:11px;color:' + (actObj.mood >= 7 ? 'var(--success)' : actObj.mood >= 4 ? 'var(--warning)' : 'var(--danger)') + ';margin-left:auto;white-space:nowrap;font-weight:600;">' + cbtText('moodAfter') + ': ' + cbtEscapeHtml(actObj.mood) + '/10</span>';
        } else if (actObj.done) {
            moodBadge = '<span style="font-size:11px;color:var(--success);margin-left:auto;font-weight:600;"><i data-lucide="check" style="width:14px;"></i></span>';
        }

        html += '<div style="background:var(--bg); border:1px solid var(--border); border-radius:12px; padding:16px; display:flex; align-items:center; gap:14px; ' + (actObj.done ? 'opacity:0.6;' : '') + ' transition:all 0.2s;">';
        html += '<div style="width:42px;height:42px;border-radius:12px;background:var(--panel);color:var(--text);display:flex;align-items:center;justify-content:center;flex-shrink:0;">';
        html += '<i data-lucide="star" style="width:20px;"></i>';
        html += '</div>';
        html += '<div style="flex:1;min-width:0;">';
        html += '<div style="font-size:12px;font-weight:700;color:var(--text);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">' + cbtText('extra') + '</div>';
        html += '<div style="font-size:14px;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;' + (actObj.done ? 'text-decoration:line-through;color:var(--gray);' : '') + '">' + cbtEscapeHtml(actObj.text) + '</div>';
        html += '</div>';
        html += moodBadge;
        html += '<button onclick="editActivity(' + actGlobalIdx + ')" title="' + cbtText('edit') + '" style="background:none;border:none;cursor:pointer;color:var(--gray);font-size:16px;padding:4px;margin-left:8px;display:flex;align-items:center;"><i data-lucide="pencil" style="width:16px;"></i></button>';
        html += '<input type="checkbox" ' + (actObj.done ? 'checked' : '') + ' onchange="toggleActivity(' + actGlobalIdx + ')" style="width:22px;height:22px;accent-color:var(--accent);cursor:pointer;flex-shrink:0;margin-left:12px;">';
        if (!actObj.done) {
            html += '<button onclick="removeActivity(' + actGlobalIdx + ')" title="' + cbtText('delete') + '" style="background:none;border:none;cursor:pointer;color:var(--gray);font-size:16px;padding:4px;margin-left:4px;display:flex;align-items:center;"><i data-lucide="trash-2" style="width:16px;"></i></button>';
        }
        html += '</div>';
    });

    html += '<div style="margin-top:8px;">';
    if (window._showCustomActInput) {
        html += '<div style="display:flex; gap:8px;">';
        html += '<input type="text" id="slotInp_custom" placeholder="' + cbtText('customStepPlaceholder') + '" style="flex:1; padding:12px 14px; border:1px solid var(--border); border-radius:10px; font-size:13px; outline:none; background:var(--panel); min-width:0;" onkeydown="if(event.key===\'Enter\')addCustomSlotActivity()">';
        html += '<button onclick="addCustomSlotActivity()" class="btn-primary" style="width:auto; padding:8px 12px; border-radius:8px; font-size:12px; white-space:nowrap; flex-shrink:0; background:var(--accent); transition:none;">' + cbtText('save') + '</button>';
        html += '<button onclick="window._showCustomActInput=false;renderActivities()" style="background:none;border:none;color:var(--gray);cursor:pointer;padding:0 8px;"><i data-lucide="x" style="width:20px;"></i></button>';
        html += '</div>';
        setTimeout(function () { var inp = document.getElementById('slotInp_custom'); if (inp) inp.focus(); }, 10);
    } else {
        html += '<button onclick="window._showCustomActInput=true;renderActivities()" style="background:none; border:1px dashed var(--border); border-radius:12px; padding:12px; width:100%; color:var(--gray); font-size:13px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:all 0.2s;"><i data-lucide="plus" style="width:16px;"></i> ' + cbtText('addCustomStep') + '</button>';
    }
    html += '</div>';

    slotsContainer.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();

    if (todayActs.length > 0) {
        stats.style.display = 'block';
        stats.innerHTML = cbtFormat('stepsFilled', { total: todayActs.length, done: doneCount });
        if (doneCount === todayActs.length && todayActs.length >= 3) {
            stats.innerHTML += '<div style="margin-top:12px;padding:10px;background:#e4f5e9;color:var(--success);border-radius:8px;font-weight:600;"><i data-lucide="sparkles" style="width:16px;display:inline-block;vertical-align:text-bottom;margin-right:4px;"></i> ' + cbtText('excellentDay') + '</div>';
            if (!window._actConfettiFired) {
                window._actConfettiFired = true;
                fireActConfetti();
                setTimeout(playActSuccessSound, 150);
            }
        } else {
            window._actConfettiFired = false;
        }
        if (window.lucide) window.lucide.createIcons();
    } else {
        stats.style.display = 'none';
        window._actConfettiFired = false;
    }
}

function addSlotActivity(slotId) {
    var inp = document.getElementById('slotInp_' + slotId);
    if (!inp) return;
    var txt = inp.value.trim();
    if (!txt) {
        // Fallback to placeholder suggestion
        txt = inp.getAttribute('placeholder').replace(cbtText('forExample'), '');
    }
    activities.unshift({
        id: makeLocalEntryId('activity'),
        text: txt,
        done: false,
        category: slotId,
        date: new Date().toLocaleDateString(cbtLocale()),
        isoDate: new Date().toISOString()
    });
    persistActivities();
    renderActivities();
}
window.addSlotActivity = addSlotActivity;

function addCustomSlotActivity() {
    var inp = document.getElementById('slotInp_custom');
    if (!inp) return;
    var txt = inp.value.trim();
    if (!txt) {
        window._showCustomActInput = false;
        renderActivities();
        return;
    }
    activities.unshift({
        id: makeLocalEntryId('activity'),
        text: txt,
        done: false,
        category: 'custom_' + Date.now(),
        date: new Date().toLocaleDateString(cbtLocale()),
        isoDate: new Date().toISOString()
    });
    persistActivities();
    window._showCustomActInput = false;
    renderActivities();
}
window.addCustomSlotActivity = addCustomSlotActivity;

function playActSuccessSound() {
    try {
        var AudioContextWrapper = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextWrapper) return;
        var ctx = new AudioContextWrapper();
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
    } catch (e) { }
}

function fireActConfetti() {
    var colors = ['#6aa882', '#5b8dd9', '#d9736c', '#d9a664', '#f59e0b'];
    for (var i = 0; i < 40; i++) {
        var conf = document.createElement('div');
        conf.style.position = 'fixed';
        conf.style.width = '8px';
        conf.style.height = '8px';
        conf.style.borderRadius = (Math.random() > 0.5 ? '50%' : '2px');
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        conf.style.left = '50%';
        conf.style.top = '40%';
        conf.style.zIndex = '99999';
        conf.style.pointerEvents = 'none';

        var angle = Math.random() * Math.PI * 2;
        var velocity = 80 + Math.random() * 200;
        var tx = Math.cos(angle) * velocity;
        var ty = Math.sin(angle) * velocity - 100;
        var rot = Math.random() * 360;

        conf.style.transition = 'all 1s cubic-bezier(0.1, 0.8, 0.3, 1)';
        conf.style.transform = 'translate(-50%, -50%) rotate(0deg) scale(1)';

        document.body.appendChild(conf);

        conf.getBoundingClientRect();

        conf.style.transform = 'translate(calc(-50% + ' + tx + 'px), calc(-50% + ' + ty + 'px)) rotate(' + rot + 'deg) scale(0)';
        conf.style.opacity = '0';

        (function (el) { setTimeout(function () { if (el.parentNode) el.remove(); }, 1000); })(conf);
    }
}

function addActivityFromAI(txt) {
    if (!txt) return;

    // Find the first unfilled slot for today
    var todayActs = activities.filter(function (a) { return getDateGroup(a.isoDate) === cbtText('today'); });
    var emptySlot = RHYTHM_SLOTS.find(function (s) {
        return !todayActs.find(function (a) { return a.category === s.id; });
    });
    // Default to 'joy' if all slots are somehow filled or we can't find one
    var slotId = emptySlot ? emptySlot.id : 'joy';

    activities.unshift({
        id: makeLocalEntryId('activity'),
        text: txt,
        done: false,
        category: slotId,
        date: new Date().toLocaleDateString(cbtLocale()),
        isoDate: new Date().toISOString()
    });
    persistActivities();
    renderActivities();
    var btnMessage = document.getElementById('messages');
    var div = document.createElement('div');
    div.className = 'msg assistant';
    div.innerHTML = '<div class="msg-avatar"><i data-lucide="sparkles" style="width:18px;"></i></div><div class="msg-content"><p>' + cbtFormat('addedToRhythm', { link: '<a href="#" onclick="openThoughtModalSection(\'rhythm\'); return false;" style="color:var(--accent);text-decoration:underline;">' + cbtText('rhythmLink') + '</a>', text: cbtEscapeHtml(txt) }) + '</p></div>';
    if (btnMessage) {
        btnMessage.appendChild(div);
        if (window.lucide) window.lucide.createIcons();
        btnMessage.scrollTop = btnMessage.scrollHeight;
    }
}
window.addActivityFromAI = addActivityFromAI;

function toggleActivity(i) {
    var wasNotDone = !activities[i].done;
    activities[i].done = !activities[i].done;
    persistActivities();

    if (wasNotDone) {
        playActSuccessSound();
        // Show mood popup
        actMoodIdx = i;
        var popup = document.getElementById('actMoodPopup');
        var taskEl = document.getElementById('actMoodTask');
        var starsEl = document.getElementById('actMoodStars');
        if (popup && taskEl && starsEl) {
            taskEl.innerText = activities[i].text;
            var starsHtml = '';
            for (var s = 1; s <= 10; s++) {
                starsHtml += '<button onclick="setActMood(' + s + ')" style="width:28px;height:28px;border-radius:50%;border:1px solid var(--border);background:' + (s <= 3 ? '#fce4e4' : s <= 6 ? '#fef3cd' : '#e4f5e9') + ';cursor:pointer;font-size:11px;font-weight:600;color:' + (s <= 3 ? 'var(--danger)' : s <= 6 ? '#b8860b' : 'var(--success)') + ';">' + s + '</button>';
            }
            starsEl.innerHTML = starsHtml;
            popup.style.display = 'flex';
        }
    }
    renderActivities();
}
window.toggleActivity = toggleActivity;

function setActMood(val) {
    if (actMoodIdx >= 0 && actMoodIdx < activities.length) {
        activities[actMoodIdx].mood = val;
        persistActivities();
    }
    actMoodIdx = -1;
    var popup = document.getElementById('actMoodPopup');
    if (popup) popup.style.display = 'none';
    renderActivities();
}
window.setActMood = setActMood;

function skipActMood() {
    actMoodIdx = -1;
    var popup = document.getElementById('actMoodPopup');
    if (popup) popup.style.display = 'none';
}
window.skipActMood = skipActMood;

function removeActivity(i) {
    activities.splice(i, 1);
    persistActivities();
    renderActivities();
}
window.removeActivity = removeActivity;

function editActivity(i) {
    var current = activities[i];
    if (!current) return;
    var next = window.prompt(cbtText('editActivityPrompt'), current.text || '');
    if (next === null) return;
    next = next.trim();
    if (!next || next === current.text) return;
    activities[i].text = next;
    persistActivities();
    renderActivities();
    addMsg('assistant', cbtText('activityUpdated'));
}
window.editActivity = editActivity;
window.renderActivities = renderActivities;

/* ── Calendar ── */
let calYear = new Date().getFullYear();
let calMonth = new Date().getMonth();
let calThoughtsCache = [];

const MONTHS_RU = CBT_I18N.ru.months;
const DAYS_RU = CBT_I18N.ru.daysShort;

async function openCalendar() {
    openModal('calModal');
    // Fetch thought records once
    try {
        let res = await fetch(API + '/api/thoughts/' + SESSION_ID).then(r => r.json());
        calThoughtsCache = res.thought_records || [];
    } catch (e) { calThoughtsCache = []; }
    renderCalendar();
    lucide.createIcons();
}

// Helper to get local date key "YYYY-MM-DD" from ISO string or Date
function getDateKey(dStr) {
    if (!dStr) return null;
    try {
        let d = new Date(dStr);
        return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    } catch (e) { return null; }
}

function renderCalendar() {
    const months = cbtText('months');
    const daysShort = cbtText('daysShort');
    document.getElementById('calTitle').innerText = months[calMonth] + ' ' + calYear;

    let moodLog = JSON.parse(localStorage.getItem('moodLog') || '[]');
    let slLog = JSON.parse(localStorage.getItem('sleepLog') || '[]');
    let actLog = JSON.parse(localStorage.getItem('activities') || '[]');
    let phqLog = JSON.parse(localStorage.getItem('phqHistory') || '[]');
    let gadLog = JSON.parse(localStorage.getItem('gadHistory') || '[]');
    let esteemLog = JSON.parse(localStorage.getItem('esteemHistory') || '[]');

    // Build day map: 'YYYY-MM-DD' → {thoughts:[], sleep:[], mood:[], acts:[], tests:[]}
    let dayMap = {};

    function addData(arr, type, getDateFn) {
        arr.forEach(item => {
            let dStr = getDateFn(item);
            let key = getDateKey(dStr);
            if (!key) return;
            let d = new Date(dStr);
            if (d.getFullYear() === calYear && d.getMonth() === calMonth) {
                if (!dayMap[key]) dayMap[key] = { thoughts: [], sleep: [], mood: [], acts: [], tests: [] };
                dayMap[key][type].push(item);
            }
        });
    }

    addData(calThoughtsCache, 'thoughts', t => t.timestamp);
    addData(moodLog, 'mood', m => m.date); // mood log saves date as ISO string
    addData(slLog, 'sleep', s => s.isoDate || new Date().toISOString()); // fallback if old data
    addData(actLog, 'acts', a => a.isoDate || new Date().toISOString());
    addData(phqLog, 'tests', p => p.date);
    addData(gadLog, 'tests', g => g.date);
    addData(esteemLog, 'tests', t => t.date);

    // Render day-of-week header
    let gridEl = document.getElementById('calGrid');
    let headEl = gridEl.previousElementSibling;
    if (!headEl || !headEl.classList.contains('cal-head')) {
        let head = document.createElement('div');
        head.className = 'cal-head';
        head.innerHTML = daysShort.map(d => `<div class="cal-head-day">${d}</div>`).join('');
        gridEl.parentNode.insertBefore(head, gridEl);
    } else {
        headEl.innerHTML = daysShort.map(d => `<div class="cal-head-day">${d}</div>`).join('');
    }

    let first = new Date(calYear, calMonth, 1);
    let startDow = (first.getDay() + 6) % 7; // 0=Mon
    let daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    let today = new Date();

    let cells = '';
    for (let i = 0; i < startDow; i++) cells += `<div class="cal-day empty"></div>`;
    for (let d = 1; d <= daysInMonth; d++) {
        let key = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        let isToday = d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
        let data = dayMap[key] || {};

        let dots = '';
        if (data.thoughts && data.thoughts.length) dots += `<span class="cal-dot" style="background:var(--accent)" title="${cbtText('thoughtDiaryDot')}"></span>`;
        if (data.mood && data.mood.length) dots += `<span class="cal-dot" style="background:#f59e0b" title="${cbtText('moodTrackerDot')}"></span>`;
        if (data.sleep && data.sleep.length) dots += `<span class="cal-dot" style="background:#38bdf8" title="${cbtText('sleepDot')}"></span>`;
        if (data.acts && data.acts.length) dots += `<span class="cal-dot" style="background:#10b981" title="${cbtText('activitiesDot')}"></span>`;
        if (data.tests && data.tests.length) dots += `<span class="cal-dot" style="background:#ef4444" title="${cbtText('testsDot')}"></span>`;

        cells += `<div class="cal-day${isToday ? ' today' : ''}" onclick="calSelectDay('${key}', ${d})" data-key="${key}">
                    ${d}
                    <div class="cal-dots">${dots}</div>
                </div>`;
    }
    gridEl.innerHTML = cells;

    document.getElementById('calDayTitle').innerText = window.t ? window.t('calendar_pick_day') : '选择日期';
    document.getElementById('calDayContent').innerHTML = '';
}

function calSelectDay(key, day) {
    document.querySelectorAll('.cal-day').forEach(el => el.classList.remove('selected'));
    document.querySelector(`.cal-day[data-key="${key}"]`)?.classList.add('selected');

    let dMatch = new Date(key);
    let label = dMatch.toLocaleDateString(cbtLocale(), { weekday: 'long', day: 'numeric', month: 'long' });
    document.getElementById('calDayTitle').innerText = label.charAt(0).toUpperCase() + label.slice(1);

    let html = '';

    let thoughts = calThoughtsCache.filter(t => getDateKey(t.timestamp) === key);
    if (thoughts.length) {
        html += `<div style="font-size:12px;text-transform:uppercase;color:var(--gray);letter-spacing:0.5px;margin-bottom:10px;margin-top:16px;">${cbtText('thoughtSection')} (${thoughts.length})</div>`;
        thoughts.forEach(t => {
            let time = new Date(t.timestamp).toLocaleTimeString(cbtLocale(), { hour: '2-digit', minute: '2-digit' });
            html += `<div style="border:1px solid var(--border);border-radius:10px;padding:14px;margin-bottom:10px;background:var(--bg);">
                        <div style="font-size:11px;color:var(--gray);margin-bottom:8px;">${time}</div>
                        <div style="margin-bottom:6px;"><span style="font-size:11px;text-transform:uppercase;color:var(--gray);">${cbtText('fieldSituation')}</span><br>${cbtEscapeHtml(t.situation)}</div>
                        <div style="margin-bottom:6px;"><span style="font-size:11px;text-transform:uppercase;color:var(--gray);">${cbtText('fieldEmotion')}</span><br>${cbtEscapeHtml(t.emotion)} — ${cbtEscapeHtml(t.intensity)}/10</div>
                        <div style="margin-bottom:6px;"><span style="font-size:11px;text-transform:uppercase;color:var(--gray);">${cbtText('fieldBalancedResponse')}</span><br>${cbtEscapeHtml(t.rational_response)}</div>
                    </div>`;
        });
    }

    let moodLog = JSON.parse(localStorage.getItem('moodLog') || '[]').filter(m => getDateKey(m.date) === key);
    if (moodLog.length) {
        html += `<div style="font-size:12px;text-transform:uppercase;color:var(--gray);letter-spacing:0.5px;margin-bottom:10px;margin-top:16px;">${cbtText('moodSection')}</div>`;
        moodLog.forEach(m => {
            let time = new Date(m.date).toLocaleTimeString(cbtLocale(), { hour: '2-digit', minute: '2-digit' });
            html += `<div style="border:1px solid var(--border);border-radius:10px;padding:14px;margin-bottom:10px;background:var(--bg);">
                        <div style="font-size:11px;color:var(--gray);margin-bottom:8px;">${time}</div>
                        <div style="display:flex; align-items:center; gap:8px; font-weight:500;">
                            <span style="font-size:20px">${['😭', '😟', '😐', '🙂', '😁'][m.score - 1] || '😐'}</span>
                            <span>${cbtFormat('moodScore', { score: cbtEscapeHtml(m.score) })}</span>
                        </div>
                    </div>`;
        });
    }

    let slLog = JSON.parse(localStorage.getItem('sleepLog') || '[]').filter(s => getDateKey(s.isoDate) === key);
    if (slLog.length) {
        html += `<div style="font-size:12px;text-transform:uppercase;color:var(--gray);letter-spacing:0.5px;margin-bottom:10px;margin-top:16px;">${cbtText('sleepSection')}</div>`;
        slLog.forEach(s => {
            html += `<div style="border:1px solid var(--border);border-radius:10px;padding:14px;margin-bottom:10px;background:var(--bg);">
                        <div style="display:flex; justify-content:space-between; margin-bottom: 6px;">
                            <span>${cbtText('bedtime')}: <b>${cbtEscapeHtml(s.bed)}</b></span>
                            <span>${cbtText('wakeup')}: <b>${cbtEscapeHtml(s.wake)}</b></span>
                        </div>
                        <div style="margin-bottom: 6px; font-size:13px;">${cbtFormat('sleepDurationQuality', { hours: cbtEscapeHtml(s.durHrs), quality: cbtEscapeHtml(s.qual) })}</div>
                        ${s.notes ? `<div style="font-size:12px;color:var(--gray);">${cbtEscapeHtml(s.notes)}</div>` : ''}
                    </div>`;
        });
    }

    let actLog = JSON.parse(localStorage.getItem('activities') || '[]').filter(a => getDateKey(a.isoDate) === key);
    if (actLog.length) {
        html += `<div style="font-size:12px;text-transform:uppercase;color:var(--gray);letter-spacing:0.5px;margin-bottom:10px;margin-top:16px;">${cbtText('activitiesSection')}</div>`;
        html += `<div style="border:1px solid var(--border);border-radius:10px;padding:14px;margin-bottom:10px;background:var(--bg);">`;
        actLog.forEach(a => {
            html += `<div style="display:flex; align-items:center; gap:8px; margin-bottom:4px; font-size:14px; ${a.done ? 'color:var(--gray);text-decoration:line-through;' : ''}">
                        <div style="width:14px;height:14px;border-radius:3px;border:1px solid ${a.done ? 'var(--success)' : 'var(--border)'};background:${a.done ? 'var(--success)' : 'transparent'};"></div>
                        <span>${cbtEscapeHtml(a.text)}</span>
                    </div>`;
        });
        html += `</div>`;
    }

    let phqLog = JSON.parse(localStorage.getItem('phqHistory') || '[]').filter(p => getDateKey(p.date) === key);
    let gadLog = JSON.parse(localStorage.getItem('gadHistory') || '[]').filter(g => getDateKey(g.date) === key);
    let esteemLog = JSON.parse(localStorage.getItem('esteemHistory') || '[]').filter(t => getDateKey(t.date) === key);
    let tests = phqLog.map(p => ({ ...p, name: 'PHQ-9' }))
        .concat(gadLog.map(g => ({ ...g, name: 'GAD-7' })))
        .concat(esteemLog.map(t => ({ ...t, name: 'Rosenberg' })));

    if (tests.length) {
        html += `<div style="font-size:12px;text-transform:uppercase;color:var(--gray);letter-spacing:0.5px;margin-bottom:10px;margin-top:16px;">${cbtText('testsSection')}</div>`;
        tests.forEach(t => {
            html += `<div style="border:1px solid var(--border);border-radius:10px;padding:14px;margin-bottom:10px;background:var(--bg);">
                        <div style="font-weight:600;margin-bottom:4px;">${cbtEscapeHtml(t.name)}: ${cbtEscapeHtml(t.score)} ${cbtText('points')}</div>
                        <div style="font-size:13px;color:var(--gray);">${cbtEscapeHtml(t.level)}</div>
                    </div>`;
        });
    }

    if (!html) {
        html = `<div style="color:var(--gray);text-align:center;padding:40px 0;">
                    <div style="font-size:32px;margin-bottom:12px;">📅</div>
                    <div>${cbtText('noRecordsDay')}</div>
                </div>`;
    }

    document.getElementById('calDayContent').innerHTML = html;
}

function calPrev() {
    calMonth--;
    if (calMonth < 0) { calMonth = 11; calYear--; }
    renderCalendar();
}
function calNext() {
    calMonth++;
    if (calMonth > 11) { calMonth = 0; calYear++; }
    renderCalendar();
}

/* ── Dashboard ── */
function openDashboard() {
    openModal('dashModal');
    renderDashboard();
    loadInsights();
    lucide.createIcons();
}

async function loadInsights() {
    const el = document.getElementById('dashInsightsText');
    const btn = document.getElementById('dashInsightsBtn');
    if (!el) return;

    el.textContent = cbtText('analyzing');
    el.style.opacity = '0.5';
    if (btn) btn.disabled = true;

    const payload = {
        session_id: SESSION_ID,
        lang: localStorage.getItem('APP_LANG') || 'ru',
        mood_log: JSON.parse(localStorage.getItem('moodLog') || '[]'),
        sleep_log: JSON.parse(localStorage.getItem('sleepLog') || '[]'),
        activities: JSON.parse(localStorage.getItem('activities') || '[]'),
        phq_history: JSON.parse(localStorage.getItem('phqHistory') || '[]'),
        gad_history: JSON.parse(localStorage.getItem('gadHistory') || '[]'),
        esteem_history: JSON.parse(localStorage.getItem('esteemHistory') || '[]'),
        thought_records: [] // will be fetched from server below if available
    };

    // Optionally enrich with thought records from server
    try {
        const tr = await fetch(API + '/api/thoughts/' + SESSION_ID).then(r => r.json());
        payload.thought_records = tr.thought_records || [];
    } catch (_) { }

    try {
        const res = await fetch(API + '/api/insights', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(r => r.json());

        el.style.opacity = '1';
        el.textContent = res.insights || cbtText('noInsights');
    } catch (e) {
        el.style.opacity = '1';
        el.textContent = cbtText('insightsUnavailable');
    }
    if (btn) btn.disabled = false;
}
window.loadInsights = loadInsights;

function renderDashboard() {
    let moodLog = JSON.parse(localStorage.getItem('moodLog') || '[]');
    let phqHist = JSON.parse(localStorage.getItem('phqHistory') || '[]');
    let gadHist = JSON.parse(localStorage.getItem('gadHistory') || '[]');
    let esteemHist = JSON.parse(localStorage.getItem('esteemHistory') || '[]');
    let sl = JSON.parse(localStorage.getItem('sleepLog') || '[]');
    let acts = JSON.parse(localStorage.getItem('activities') || '[]');

    // Summary cards
    let avgMood = moodLog.length ? (moodLog.slice(-14).reduce((a, e) => a + e.score, 0) / Math.min(moodLog.length, 14)).toFixed(1) : '—';
    let avgSleep = sl.length ? (sl.slice(0, 7).reduce((a, e) => a + parseFloat(e.durHrs), 0) / Math.min(sl.length, 7)).toFixed(1) : '—';
    let doneActs = acts.filter(a => a.done).length;
    let lastPHQ = phqHist.length ? phqHist[phqHist.length - 1].score : '—';
    let lastGAD = gadHist.length ? gadHist[gadHist.length - 1].score : '—';
    let trackedDays = new Set(moodLog.map(e => e.date.slice(0, 10))).size;

    document.getElementById('dashCards').innerHTML = `
                <div class="dash-card" style="border-left: 3px solid var(--accent);">
                    <div class="dash-card-val">${avgMood}</div>
                    <div class="dash-card-label">${cbtText('avgMood14')}</div>
                </div>
                <div class="dash-card" style="border-left: 3px solid #797298;">
                    <div class="dash-card-val">${avgSleep}${avgSleep !== '—' ? (cbtLang() === 'zh' ? '小时' : (cbtLang() === 'en' ? 'h' : 'ч')) : ''}</div>
                    <div class="dash-card-label">${cbtText('avgSleep')}</div>
                </div>
                <div class="dash-card" style="border-left: 3px solid #7b9cf5;">
                    <div class="dash-card-val">${doneActs}</div>
                    <div class="dash-card-label">${cbtText('activitiesDone')}</div>
                </div>
                <div class="dash-card" style="border-left: 3px solid var(--gray);">
                    <div class="dash-card-val">${trackedDays}</div>
                    <div class="dash-card-label">${cbtText('trackedDays')}</div>
                </div>`;

    // Mood chart (last 14 days)
    let moodContainer = document.getElementById('dashMoodChart');
    if (moodLog.length >= 2) {
        moodContainer.innerHTML = '<canvas id="moodCanvas" style="width:100%;height:140px;"></canvas>';
        let ctx = document.getElementById('moodCanvas').getContext('2d');
        if (window.dashMoodChartInstance) window.dashMoodChartInstance.destroy();
        let last14 = moodLog.slice(-14);

        // Ensure chart.js is ready
        if (window.Chart) {
            window.dashMoodChartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: last14.map(e => new Date(e.date).toLocaleDateString(cbtLocale(), { day: 'numeric', month: 'short' })),
                    datasets: [{
                        label: cbtText('moodLabel'),
                        data: last14.map(e => e.score),
                        borderColor: '#797298',
                        backgroundColor: 'rgba(121, 114, 152, 0.2)',
                        fill: true,
                        tension: 0.3,
                        pointBackgroundColor: '#797298',
                        pointRadius: 4,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            min: 0,
                            max: 10,
                            grid: { color: 'rgba(0,0,0,0.05)' }
                        },
                        x: {
                            grid: { display: false }
                        }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function (context) { return cbtFormat('moodTooltip', { value: context.parsed.y }); }
                            }
                        }
                    }
                }
            });
        }
    } else {
        moodContainer.innerHTML = `<div style="text-align:center;color:var(--gray);padding:40px 0;">${cbtText('notEnoughMoodData')}</div>`;
    }

    // Sleep quality chart (last 7)
    let slContainer = document.getElementById('dashSleepChart');
    if (sl.length >= 2) {
        slContainer.innerHTML = '<canvas id="sleepCanvas" style="width:100%;height:140px;"></canvas>';
        let ctx = document.getElementById('sleepCanvas').getContext('2d');
        if (window.dashSleepChartInstance) window.dashSleepChartInstance.destroy();
        let last7 = sl.slice(0, 7).reverse();

        if (window.Chart) {
            window.dashSleepChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: last7.map(e => new Date(e.date).toLocaleDateString(cbtLocale(), { day: 'numeric', month: 'short' })),
                    datasets: [{
                        label: cbtText('sleepDurationHours'),
                        data: last7.map(e => parseFloat(e.durHrs)),
                        backgroundColor: 'rgba(94, 186, 125, 0.7)',
                        borderRadius: 4,
                        order: 2
                    },
                    {
                        label: cbtText('sleepQualityShort'),
                        data: last7.map(e => e.qual),
                        type: 'line',
                        borderColor: '#d68f3a',
                        backgroundColor: '#d68f3a',
                        tension: 0.3,
                        borderWidth: 2,
                        fill: false,
                        pointRadius: 4,
                        order: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            min: 0,
                            max: 12,
                            grid: { color: 'rgba(0,0,0,0.05)' }
                        },
                        x: {
                            grid: { display: false }
                        }
                    },
                    plugins: {
                        legend: { position: 'bottom', labels: { boxWidth: 12, usePointStyle: true } }
                    }
                }
            });
        }
    } else {
        slContainer.innerHTML = `<div style="text-align:center;color:var(--gray);padding:30px 0;">${cbtText('noSleepData')}</div>`;
    }

    // PHQ/GAD/Self-esteem history
    let testHtml = '';
    if (phqHist.length) {
        let last = phqHist[phqHist.length - 1];
        let prev = phqHist.length > 1 ? phqHist[phqHist.length - 2].score : null;
        let trend = prev !== null ? (last.score < prev ? cbtText('trendImproved') : last.score > prev ? cbtText('trendWorse') : cbtText('trendNoChange')) : '';
        let col = last.score <= 4 ? '#797298' : last.score <= 9 ? '#d68f3a' : '#df5858';
        testHtml += `<div style="display:flex;justify-content:space-between;align-items:center;padding:12px;border-radius:10px;border:1px solid var(--border);margin-bottom:8px;">
                    <div><div style="font-weight:600;margin-bottom:2px;">${cbtText('phqTitle')}</div><div style="font-size:12px;color:var(--gray);">${cbtEscapeHtml(last.level)} · ${new Date(last.date).toLocaleDateString(cbtLocale())}</div></div>
                    <div style="text-align:right;"><div style="font-size:22px;font-weight:700;color:${col};">${cbtEscapeHtml(last.score)}<span style="font-size:13px;font-weight:400;color:var(--gray)">/27</span></div>
                    ${prev !== null ? `<div style="font-size:11px;color:${last.score < prev ? '#797298' : '#df5858'}">${trend}</div>` : ''}</div></div>`;
    }
    if (gadHist.length) {
        let last = gadHist[gadHist.length - 1];
        let prev = gadHist.length > 1 ? gadHist[gadHist.length - 2].score : null;
        let trend = prev !== null ? (last.score < prev ? cbtText('trendImproved') : last.score > prev ? cbtText('trendWorse') : cbtText('trendNoChange')) : '';
        let col = last.score <= 4 ? '#797298' : last.score <= 9 ? '#d68f3a' : '#df5858';
        testHtml += `<div style="display:flex;justify-content:space-between;align-items:center;padding:12px;border-radius:10px;border:1px solid var(--border);">
                    <div><div style="font-weight:600;margin-bottom:2px;">${cbtText('gadTitle')}</div><div style="font-size:12px;color:var(--gray);">${cbtEscapeHtml(last.level)} · ${new Date(last.date).toLocaleDateString(cbtLocale())}</div></div>
                    <div style="text-align:right;"><div style="font-size:22px;font-weight:700;color:${col};">${cbtEscapeHtml(last.score)}<span style="font-size:13px;font-weight:400;color:var(--gray)">/21</span></div>
                    ${prev !== null ? `<div style="font-size:11px;color:${last.score < prev ? '#797298' : '#df5858'}">${trend}</div>` : ''}</div></div>`;
    }
    if (esteemHist.length) {
        let last = esteemHist[esteemHist.length - 1];
        let prev = esteemHist.length > 1 ? esteemHist[esteemHist.length - 2].score : null;
        let trend = prev !== null ? (last.score > prev ? cbtText('trendImproved') : last.score < prev ? cbtText('trendDrop') : cbtText('trendNoChange')) : '';
        let col = last.score >= 25 ? '#797298' : last.score >= 18 ? '#d68f3a' : '#df5858';
        testHtml += `<div style="display:flex;justify-content:space-between;align-items:center;padding:12px;border-radius:10px;border:1px solid var(--border);margin-top:${testHtml ? '8px' : '0'};">
                    <div><div style="font-weight:600;margin-bottom:2px;">${cbtText('esteemTitle')}</div><div style="font-size:12px;color:var(--gray);">${cbtEscapeHtml(last.level)} · ${new Date(last.date).toLocaleDateString(cbtLocale())}</div></div>
                    <div style="text-align:right;"><div style="font-size:22px;font-weight:700;color:${col};">${cbtEscapeHtml(last.score)}<span style="font-size:13px;font-weight:400;color:var(--gray)">/30</span></div>
                    ${prev !== null ? `<div style="font-size:11px;color:${last.score > prev ? '#797298' : '#df5858'}">${trend}</div>` : ''}</div></div>`;
    }
    if (!testHtml) testHtml = `<div style="color:var(--gray);font-size:13px;">${cbtText('noTestsYet')}</div>`;
    document.getElementById('dashTests').innerHTML = testHtml;
}

function refreshLocalizedCBT() {
    const moodHistory = document.getElementById('moodHistory');
    const moodLog = JSON.parse(localStorage.getItem('moodLog') || '[]');
    if (moodHistory && moodLog.length) {
        const last = moodLog[moodLog.length - 1];
        moodHistory.innerText = `${cbtText('moodLastEntry')}: ${last.score}/10`;
    }

    if (document.getElementById('thoughtModal')?.style.display === 'flex') {
        switchThoughtType(_thoughtType);
    }
    if (document.getElementById('histModal')?.style.display === 'flex') {
        openThoughtHistoryModal();
    }
    if (document.getElementById('sleepHistModal')?.style.display === 'flex') {
        openSleepHistoryModal();
    }
    if (document.getElementById('calModal')?.style.display === 'flex') {
        renderCalendar();
    }
    if (document.getElementById('dashModal')?.style.display === 'flex') {
        renderDashboard();
    }
    if (document.getElementById('rhythmSection')?.style.display === 'block') {
        renderActivities();
    }
}
window.refreshLocalizedCBT = refreshLocalizedCBT;
