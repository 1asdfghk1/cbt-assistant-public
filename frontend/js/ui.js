const UI_TRANSLATIONS = {
    ru: {
        document_title: 'КПТ Ассистент',
        app_title: 'КПТ Ассистент',
        sos_button: 'SOS',
        sidebar_thoughts: 'Дневник мыслей',
        sidebar_sleep: 'Журнал сна',
        sidebar_assessment: 'Самооценка',
        sidebar_calendar: 'Календарь записей',
        sidebar_dashboard: 'Дашборд прогресса',
        sidebar_articles: 'Библиотека статей',
        sidebar_videos: 'Видео-библиотека',
        sidebar_reminders: 'Напоминания',
        sidebar_settings: 'Настройки',
        sidebar_download: 'Скачать выписку',
        tts_title: 'Озвучка ассистента',
        mic_title: 'Голосовой ввод',
        status_connecting: 'Подключение...',
        status_offline: 'Ollama offline',
        status_backend_down: 'Бекенд недоступен',
        input_placeholder: 'Как я могу помочь вам сегодня?',
        input_placeholder_idle: 'Задайте вопрос...',
        input_placeholder_listening: 'Слушаю...',
        assistant_disclaimer: 'Ассистент может ошибаться. При остром состоянии обратитесь к специалисту.',
        welcome_morning: 'Доброе утро',
        welcome_day: 'Добрый день',
        welcome_evening: 'Добрый вечер',
        welcome_night: 'Доброй ночи',
        assessment_title: 'Самооценка',
        assessment_phq_title: 'Депрессия (PHQ-9)',
        assessment_phq_desc: 'Скрининг выраженности симптомов депрессии и снижения настроения',
        assessment_gad_title: 'Тревожность (GAD-7)',
        assessment_gad_desc: 'Оценка общего уровня тревоги и беспокойства',
        assessment_esteem_title: 'Самооценка (Розенберг)',
        assessment_esteem_desc: 'Оценка отношения к себе, самоуважения и внутренней опоры',
        mood_modal_title: 'Настроение',
        mood_log_button: 'Записать состояние',
        thought_modal_title: 'Мысли и действия',
        thought_tab_diary: 'Дневник мыслей',
        thought_tab_gratitude: 'Благодарность',
        thought_tab_rhythm: 'Ритм дня',
        thought_modal_hint: 'Запишите ситуацию, мысль и более бережный взгляд на неё.',
        thought_label_situation: 'Ситуация (Что произошло?)',
        thought_label_thought: 'Автоматическая мысль (О чем подумали?)',
        thought_label_emotion: 'Эмоция',
        thought_placeholder_emotion: 'Например: тревога',
        thought_label_intensity: 'Сила (0-10)',
        thought_label_distortion: 'Когнитивное искажение',
        distortion_catastrophizing: 'Катастрофизация',
        distortion_mind_reading: 'Чтение мыслей',
        distortion_fortune_telling: 'Предсказание будущего',
        distortion_overgeneralization: 'Сверхобобщение',
        distortion_black_white: 'Чёрно-белое мышление',
        distortion_discounting_positive: 'Обесценивание позитивного',
        distortion_personalization: 'Персонализация',
        distortion_unsure: 'Не знаю',
        thought_label_response: 'Рациональный ответ',
        gratitude_prompt: 'Запишите 3 вещи, за которые вы благодарны сегодня — большие или маленькие.',
        gratitude_label: 'За что я благодарен(а)?',
        gratitude_placeholder: '1. \n2. \n3. ',
        thought_save: 'Сохранить мысль',
        rhythm_mood_after: 'Как настроение после?',
        skip: 'Пропустить',
        phq_modal_title: 'PHQ-9 — Скрининг депрессии',
        phq_modal_desc: 'На протяжении последних двух недель, как часто вас беспокоили следующие проблемы?',
        gad_modal_title: 'GAD-7 — Скрининг тревожности',
        gad_modal_desc: 'За последние две недели, как часто вас беспокоили следующие проблемы?',
        esteem_modal_title: 'Самооценка — шкала Розенберга',
        esteem_modal_desc: 'Насколько вы согласны со следующими утверждениями о себе?',
        get_result: 'Получить результат',
        assessment_dashboard_title: 'Самооценка (PHQ-9 / GAD-7 / Розенберг)',
        calendar_legend_thoughts: 'Мысли',
        calendar_legend_mood: 'Настроение',
        calendar_legend_sleep: 'Сон',
        calendar_legend_activities: 'Активности',
        calendar_legend_assessment: 'Самооценка',
        calendar_pick_day: 'Выберите день',
        dashboard_title: 'Дашборд прогресса',
        dashboard_insights: 'Наблюдения',
        refresh: 'обновить',
        loading: 'Загрузка…',
        dashboard_mood_14: 'Настроение за последние 14 дней',
        dashboard_sleep_7: 'Качество сна (7 дней)',
        history_title: 'Дневник мыслей',
        new_entry: 'Новая запись',
        sleep_history_title: 'Журнал сна',
        sleep_add_title: 'Добавить запись о сне',
        sleep_bedtime: 'Лёг спать',
        sleep_wake: 'Встал',
        sleep_awake_count: 'Сколько раз просыпался за ночь',
        sleep_quality: 'Качество сна (0 — ужасно, 10 — отлично)',
        sleep_notes: 'Заметки (сны, причины плохого сна)',
        sleep_notes_placeholder: 'Что могло повлиять на сон?',
        save_entry: 'Сохранить запись',
        sos_title: 'Экстренная помощь (SOS)',
        sos_tab_breathing: 'Дыхание',
        sos_tab_grounding: 'Заземление',
        sos_tab_muscles: 'Мышцы',
        sos_tab_stop: 'СТОП',
        start_exercise: 'Начать упражнение',
        settings_title: 'Настройки',
        language_title: 'Язык',
        language_ru: 'Русский',
        language_en: 'English',
        language_zh: '中文',
        tts_settings_title: 'Microsoft TTS',
        tts_voice_ru_label: 'Русский голос',
        tts_voice_en_label: 'English voice',
        tts_voice_zh_label: 'Китайский голос',
        tts_preview: 'Прослушать',
        reminders_title: 'Напоминания',
        reminders_desc: 'Браузерные уведомления напомнят записать настроение или практику. Страница должна быть открыта в браузере.',
        reminders_morning: 'Утреннее',
        reminders_evening: 'Вечернее',
        save: 'Сохранить',
        article_library_title: 'Библиотека статей',
        article_library_subtitle: 'Подборка статей о депрессии, КПТ и доказательных подходах к самопомощи.',
        video_library_title: 'Видео-библиотека',
        video_library_subtitle: 'Отобранные материалы от специалистов: механизмы депрессии, тревоги и полезные практики.',
        back_to_list: 'Назад к списку',
        download_title: 'Скачать выписку',
        download_desc: 'Выберите формат экспорта данных',
        download_pdf_desc: 'Красивый отчёт\nс графиками',
        download_txt_desc: 'Текстовый файл\nсо всеми данными',
        skip_arrow: 'Пропустить →',
        done_arrow: 'Готово →',
        breathe_phase: 'Дыхание',
        cycle_one: 'Цикл 1',
        follow_circle: 'Следуйте за кругом'
    },
    en: {
        document_title: 'CBT Assistant',
        app_title: 'CBT Assistant',
        sos_button: 'SOS',
        sidebar_thoughts: 'Thought Diary',
        sidebar_sleep: 'Sleep Journal',
        sidebar_assessment: 'Self-Assessment',
        sidebar_calendar: 'Records Calendar',
        sidebar_dashboard: 'Progress Dashboard',
        sidebar_articles: 'Article Library',
        sidebar_videos: 'Video Library',
        sidebar_reminders: 'Reminders',
        sidebar_settings: 'Settings',
        sidebar_download: 'Download Summary',
        tts_title: 'Assistant voice',
        mic_title: 'Voice input',
        status_connecting: 'Connecting...',
        status_offline: 'Ollama offline',
        status_backend_down: 'Backend unavailable',
        input_placeholder: 'How can I help you today?',
        input_placeholder_idle: 'Ask a question...',
        input_placeholder_listening: 'Listening...',
        assistant_disclaimer: 'The assistant may be mistaken. In an acute state, contact a professional.',
        welcome_morning: 'Good morning',
        welcome_day: 'Good afternoon',
        welcome_evening: 'Good evening',
        welcome_night: 'Good night',
        assessment_title: 'Self-Assessment',
        assessment_phq_title: 'Depression (PHQ-9)',
        assessment_phq_desc: 'Screening for depressive symptoms and lowered mood severity',
        assessment_gad_title: 'Anxiety (GAD-7)',
        assessment_gad_desc: 'Assessment of general anxiety and worry level',
        assessment_esteem_title: 'Self-Esteem (Rosenberg)',
        assessment_esteem_desc: 'Assessment of self-attitude, self-respect, and inner support',
        mood_modal_title: 'Mood',
        mood_log_button: 'Save mood',
        thought_modal_title: 'Thoughts and Actions',
        thought_tab_diary: 'Thought Diary',
        thought_tab_gratitude: 'Gratitude',
        thought_tab_rhythm: 'Daily Rhythm',
        thought_modal_hint: 'Write down the situation, the thought, and a gentler response to it.',
        thought_label_situation: 'Situation (What happened?)',
        thought_label_thought: 'Automatic thought (What went through your mind?)',
        thought_label_emotion: 'Emotion',
        thought_placeholder_emotion: 'For example: anxiety',
        thought_label_intensity: 'Intensity (0-10)',
        thought_label_distortion: 'Cognitive distortion',
        distortion_catastrophizing: 'Catastrophizing',
        distortion_mind_reading: 'Mind reading',
        distortion_fortune_telling: 'Fortune telling',
        distortion_overgeneralization: 'Overgeneralization',
        distortion_black_white: 'Black-and-white thinking',
        distortion_discounting_positive: 'Discounting the positive',
        distortion_personalization: 'Personalization',
        distortion_unsure: 'Not sure',
        thought_label_response: 'Balanced response',
        gratitude_prompt: 'Write down 3 things you feel grateful for today, big or small.',
        gratitude_label: 'What am I grateful for?',
        gratitude_placeholder: '1. \n2. \n3. ',
        thought_save: 'Save thought',
        rhythm_mood_after: 'How do you feel after it?',
        skip: 'Skip',
        phq_modal_title: 'PHQ-9 - Depression Screen',
        phq_modal_desc: 'Over the past two weeks, how often have you been bothered by the following problems?',
        gad_modal_title: 'GAD-7 - Anxiety Screen',
        gad_modal_desc: 'Over the past two weeks, how often have you been bothered by the following problems?',
        esteem_modal_title: 'Self-Esteem - Rosenberg Scale',
        esteem_modal_desc: 'How strongly do you agree with the following statements about yourself?',
        get_result: 'Get result',
        assessment_dashboard_title: 'Self-Assessment (PHQ-9 / GAD-7 / Rosenberg)',
        calendar_legend_thoughts: 'Thoughts',
        calendar_legend_mood: 'Mood',
        calendar_legend_sleep: 'Sleep',
        calendar_legend_activities: 'Activities',
        calendar_legend_assessment: 'Assessment',
        calendar_pick_day: 'Pick a day',
        dashboard_title: 'Progress Dashboard',
        dashboard_insights: 'Insights',
        refresh: 'refresh',
        loading: 'Loading…',
        dashboard_mood_14: 'Mood over the last 14 days',
        dashboard_sleep_7: 'Sleep quality (7 days)',
        history_title: 'Thought Diary',
        new_entry: 'New entry',
        sleep_history_title: 'Sleep Journal',
        sleep_add_title: 'Add sleep entry',
        sleep_bedtime: 'Went to bed',
        sleep_wake: 'Woke up',
        sleep_awake_count: 'How many times did you wake up at night',
        sleep_quality: 'Sleep quality (0 = awful, 10 = excellent)',
        sleep_notes: 'Notes (dreams, reasons for poor sleep)',
        sleep_notes_placeholder: 'What might have affected your sleep?',
        save_entry: 'Save entry',
        sos_title: 'Emergency Help (SOS)',
        sos_tab_breathing: 'Breathing',
        sos_tab_grounding: 'Grounding',
        sos_tab_muscles: 'Muscles',
        sos_tab_stop: 'STOP',
        start_exercise: 'Start exercise',
        settings_title: 'Settings',
        language_title: 'Language',
        language_ru: 'Russian',
        language_en: 'English',
        language_zh: 'Chinese',
        tts_settings_title: 'Microsoft TTS',
        tts_voice_ru_label: 'Russian voice',
        tts_voice_en_label: 'English voice',
        tts_voice_zh_label: 'Chinese voice',
        tts_preview: 'Preview',
        reminders_title: 'Reminders',
        reminders_desc: 'Browser notifications can remind you to log your mood or do a practice. Keep this page open in your browser.',
        reminders_morning: 'Morning',
        reminders_evening: 'Evening',
        save: 'Save',
        article_library_title: 'Article Library',
        article_library_subtitle: 'A curated collection about depression, CBT, and evidence-based self-help.',
        video_library_title: 'Video Library',
        video_library_subtitle: 'Selected materials from specialists on depression, anxiety, and useful practices.',
        back_to_list: 'Back to list',
        download_title: 'Download Summary',
        download_desc: 'Choose an export format',
        download_pdf_desc: 'Styled report\nwith charts',
        download_txt_desc: 'Plain text file\nwith all data',
        skip_arrow: 'Skip →',
        done_arrow: 'Done →',
        breathe_phase: 'Breathing',
        cycle_one: 'Cycle 1',
        follow_circle: 'Follow the circle'
    },
    

    zh: {
        document_title: 'CBT 助手',
        app_title: 'CBT 助手',
        sos_button: 'SOS',

        sidebar_thoughts: '思维日记',
        sidebar_sleep: '睡眠日志',
        sidebar_assessment: '心理测评',
        sidebar_calendar: '记录日历',
        sidebar_dashboard: '进度面板',
        sidebar_articles: '文章库',
        sidebar_videos: '视频库',
        sidebar_reminders: '提醒',
        sidebar_settings: '设置',
        sidebar_download: '导出记录',

        tts_title: '助手语音',
        mic_title: '语音输入',

        status_connecting: '正在连接...',
        status_offline: 'AI 服务离线',
        status_backend_down: '后端服务不可用',

        input_placeholder: '今天有什么我可以帮助你的？',
        input_placeholder_idle: '请输入问题...',
        input_placeholder_listening: '正在聆听...',

        assistant_disclaimer: 'AI 助手可能会出错。如遇严重或紧急情况，请及时寻求专业帮助。',

        welcome_morning: '早上好',
        welcome_day: '下午好',
        welcome_evening: '晚上好',
        welcome_night: '夜深了',

        assessment_title: '心理测评',
        assessment_phq_title: '抑郁症状筛查（PHQ-9）',
        assessment_phq_desc: '评估近期抑郁相关症状和情绪状态',
        assessment_gad_title: '焦虑症状筛查（GAD-7）',
        assessment_gad_desc: '评估近期焦虑和担忧程度',
        assessment_esteem_title: '自尊量表（Rosenberg）',
        assessment_esteem_desc: '评估自我评价、自尊和内在支持',

        mood_modal_title: '情绪',
        mood_log_button: '记录当前状态',

        thought_modal_title: '思维与行动',
        thought_tab_diary: '思维日记',
        thought_tab_gratitude: '感恩记录',
        thought_tab_rhythm: '每日节奏',
        thought_modal_hint: '记录发生的事情、当时的想法，以及一个更加平衡的看法。',

        thought_label_situation: '情境（发生了什么？）',
        thought_label_thought: '自动思维（当时想到了什么？）',
        thought_label_emotion: '情绪',
        thought_placeholder_emotion: '例如：焦虑',
        thought_label_intensity: '强度（0-10）',
        thought_label_distortion: '认知偏差',

        distortion_catastrophizing: '灾难化',
        distortion_mind_reading: '读心术',
        distortion_fortune_telling: '预言未来',
        distortion_overgeneralization: '过度概括',
        distortion_black_white: '非黑即白',
        distortion_discounting_positive: '忽视积极面',
        distortion_personalization: '个人化',
        distortion_unsure: '不确定',

        thought_label_response: '平衡回应',

        gratitude_prompt: '写下今天让你感到感激的3件事，无论大小。',
        gratitude_label: '我今天感激什么？',
        gratitude_placeholder: '1. \n2. \n3. ',

        thought_save: '保存记录',
        rhythm_mood_after: '完成后心情如何？',
        skip: '跳过',

        phq_modal_title: 'PHQ-9 — 抑郁症状筛查',
        phq_modal_desc: '过去两周内，以下问题困扰你的频率是多少？',

        gad_modal_title: 'GAD-7 — 焦虑症状筛查',
        gad_modal_desc: '过去两周内，以下问题困扰你的频率是多少？',

        esteem_modal_title: 'Rosenberg 自尊量表',
        esteem_modal_desc: '以下描述与你目前的情况有多符合？',

        get_result: '查看结果',

        assessment_dashboard_title: '心理测评（PHQ-9 / GAD-7 / Rosenberg）',

        calendar_legend_thoughts: '思维',
        calendar_legend_mood: '情绪',
        calendar_legend_sleep: '睡眠',
        calendar_legend_activities: '活动',
        calendar_legend_assessment: '测评',
        calendar_pick_day: '选择日期',

        dashboard_title: '进度面板',
        dashboard_insights: 'AI 分析',
        refresh: '刷新',
        loading: '加载中…',
        dashboard_mood_14: '最近14天情绪变化',
        dashboard_sleep_7: '最近7天睡眠质量',

        history_title: '思维日记',
        new_entry: '新建记录',

        sleep_history_title: '睡眠日志',
        sleep_add_title: '添加睡眠记录',
        sleep_bedtime: '入睡时间',
        sleep_wake: '起床时间',
        sleep_awake_count: '夜间醒来次数',
        sleep_quality: '睡眠质量（0 = 很差，10 = 很好）',
        sleep_notes: '备注',
        sleep_notes_placeholder: '有什么可能影响了你的睡眠？',

        save_entry: '保存记录',

        sos_title: '紧急调节工具（SOS）',
        sos_tab_breathing: '呼吸',
        sos_tab_grounding: '着地练习',
        sos_tab_muscles: '肌肉放松',
        sos_tab_stop: 'STOP',
        start_exercise: '开始练习',

        settings_title: '设置',
        language_title: '语言',
        language_ru: '俄语',
        language_en: '英语',
        language_zh: '中文',

        tts_settings_title: '语音设置',
        tts_voice_ru_label: '俄语语音',
        tts_voice_en_label: '英语语音',
        tts_voice_zh_label: '中文语音',
        tts_preview: '试听',

        reminders_title: '提醒',
        reminders_desc: '浏览器可以提醒你记录情绪或进行练习。使用提醒时请保持网页开启。',
        reminders_morning: '早晨提醒',
        reminders_evening: '晚间提醒',

        save: '保存',

        article_library_title: '文章库',
        article_library_subtitle: '关于 CBT、焦虑、情绪管理和自助方法的资料。',

        video_library_title: '视频库',
        video_library_subtitle: '关于焦虑、情绪管理以及相关练习的视频资料。',

        back_to_list: '返回列表',

        download_title: '导出记录',
        download_desc: '请选择导出格式',
        download_pdf_desc: 'PDF 报告\n包含图表',
        download_txt_desc: '文本文件\n包含所有记录',

        skip_arrow: '跳过 →',
        done_arrow: '完成 →',

        breathe_phase: '呼吸',
        cycle_one: '第1轮',
        follow_circle: '跟随圆圈进行呼吸'
    }

};

function getCurrentLanguage() {
    return localStorage.getItem('APP_LANG') || 'zh';
}
window.getCurrentLanguage = getCurrentLanguage;

function getCurrentLocale() {
    const lang = getCurrentLanguage();

    if (lang === 'zh') {
        return 'zh-CN';
    }

    if (lang === 'en') {
        return 'en-US';
    }

    return 'ru-RU';
}
window.getCurrentLocale = getCurrentLocale;

function escapeInlineJsString(value) {
    return String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}
window.escapeInlineJsString = escapeInlineJsString;

function t(key) {
    const lang = getCurrentLanguage();

    return (
        UI_TRANSLATIONS[lang] &&
        UI_TRANSLATIONS[lang][key]
    )
        || UI_TRANSLATIONS.zh[key]
        || UI_TRANSLATIONS.en[key]
        || key;
}
window.t = t;

function updateLanguageButtons() {
    const lang = getCurrentLanguage();
    document.getElementById('settingsLangRu')?.classList.toggle('active', lang === 'ru');
    document.getElementById('settingsLangEn')?.classList.toggle('active', lang === 'en');
    document.getElementById('settingsLangZh')?.classList.toggle('active', lang === 'zh');
}

const TTS_VOICE_OPTIONS = {
    ru: [
        { value: 'ru-RU-SvetlanaNeural', label: 'Svetlana' },
        { value: 'ru-RU-DmitryNeural', label: 'Dmitry' }
    ],

    en: [
        { value: 'en-US-JennyNeural', label: 'Jenny' },
        { value: 'en-US-GuyNeural', label: 'Guy' }
    ],

    zh: [
        { value: 'zh-CN-XiaoxiaoNeural', label: '晓晓（女声）' },
        { value: 'zh-CN-YunxiNeural', label: '云希（男声）' }
    ]
};

function getTtsSettings() {
    let raw = {};

    try {
        raw = JSON.parse(localStorage.getItem('ttsSettings') || '{}');
    } catch (err) {
        console.warn('Invalid TTS settings; using the default voices.', err);
    }

    return {
        ruVoice: raw.ruVoice || 'ru-RU-SvetlanaNeural',
        enVoice: raw.enVoice || 'en-US-JennyNeural',
        zhVoice: raw.zhVoice || 'zh-CN-XiaoxiaoNeural'
    };
}

function getPreferredTtsVoice(language) {
    const settings = getTtsSettings();

    if (language === 'ru') {
        return settings.ruVoice;
    }

    if (language === 'en') {
        return settings.enVoice;
    }

    return settings.zhVoice;
}

function populateTtsVoiceControls() {
    const settings = getTtsSettings();

    [
        ['ttsVoiceRu', 'ru', settings.ruVoice],
        ['ttsVoiceEn', 'en', settings.enVoice],
        ['ttsVoiceZh', 'zh', settings.zhVoice]
    ].forEach(function ([id, lang, selected]) {
        const select = document.getElementById(id);

        if (!select) return;

        select.innerHTML = TTS_VOICE_OPTIONS[lang]
            .map(function (voice) {
                return (
                    '<option value="'
                    + voice.value
                    + '"'
                    + (voice.value === selected ? ' selected' : '')
                    + '>'
                    + voice.label
                    + '</option>'
                );
            })
            .join('');

        select.onchange = function () {
            scheduleTtsPreviewPreload(lang, select.value);
        };
    });
}

window.populateTtsVoiceControls = populateTtsVoiceControls;

const QUICK_SUGGESTIONS = {
    ru: [
        {
            id: 'ddMood',
            icon: 'smile-plus',
            label: 'Настроение',
            items: [
                { type: 'mood', score: 10, icon: 'laugh', label: 'Отлично (10)' },
                { type: 'mood', score: 8, icon: 'smile', label: 'Хорошо (8)' },
                { type: 'mood', score: 5, icon: 'meh', label: 'Нормально (5)' },
                { type: 'mood', score: 3, icon: 'annoyed', label: 'Плохо (3)' },
                { type: 'mood', score: 1, icon: 'frown', label: 'Ужасно (1)' }
            ]
        },
        {
            id: 'ddSad',
            icon: 'frown',
            label: 'Грусть',
            items: [
                { text: 'Мне одиноко и тоскливо', label: 'Мне одиноко и тоскливо' },
                { text: 'Чувствую безысходность', label: 'Чувствую безысходность' },
                { text: 'Хочется плакать без причины', label: 'Хочется плакать без причины' },
                { text: 'Всё кажется бессмысленным', label: 'Всё кажется бессмысленным' },
                { text: 'Кажется, я в тупике', label: 'Кажется, я в тупике' }
            ]
        },
        {
            id: 'ddAnxious',
            icon: 'wind',
            label: 'Тревога',
            items: [
                { text: 'Я предчувствую что-то плохое', label: 'Предчувствую что-то плохое' },
                { text: 'Не могу перестать беспокоиться', label: 'Не могу перестать беспокоиться' },
                { text: 'У меня физические симптомы паники', label: 'Физические симптомы паники' },
                { text: 'Страх перед предстоящим событием', label: 'Страх перед событием' },
                { text: 'Много мыслей, не могу сосредоточиться', label: 'Много мыслей, не могу сосредоточиться' }
            ]
        },
        {
            id: 'ddAngry',
            icon: 'flame',
            label: 'Злость',
            items: [
                { text: 'Меня всё раздражает', label: 'Меня всё раздражает' },
                { text: 'Я злюсь на конкретного человека', label: 'Злюсь на конкретного человека' },
                { text: 'Не могу сдержать агрессию', label: 'Не могу сдержать агрессию' },
                { text: 'Чувствую несправедливость', label: 'Чувствую несправедливость' },
                { text: 'Сложно понять свои эмоции', label: 'Сложно понять свои эмоции' }
            ]
        },
        {
            id: 'ddTired',
            icon: 'battery-low',
            label: 'Усталость',
            items: [
                { text: 'Сил нет совсем, даже на простые дела', label: 'Сил нет совсем' },
                { text: 'Чувствую эмоциональное выгорание', label: 'Эмоциональное выгорание' },
                { text: 'Прокрастинирую и не могу начать', label: 'Прокрастинирую' },
                { text: 'Плохо сплю и не высыпаюсь', label: 'Плохо сплю' },
                { text: 'Не знаю, какое решение принять', label: 'Не знаю, какое решение принять' }
            ]
        },
        {
            id: 'ddCalm',
            icon: 'sun',
            label: 'Спокойствие',
            items: [
                { text: 'Сегодня отличный день!', label: 'Сегодня отличный день!' },
                { text: 'Удалось справиться с трудной задачей', label: 'Справился с трудной задачей' },
                { text: 'Хочу закрепить хорошее состояние', label: 'Закрепить хорошее состояние' },
                { text: 'Я благодарен за то, что сейчас имею', label: 'Чувствую благодарность' }
            ]
        }
    ],
    en: [
        {
            id: 'ddMood',
            icon: 'smile-plus',
            label: 'Mood',
            items: [
                { type: 'mood', score: 10, icon: 'laugh', label: 'Excellent (10)' },
                { type: 'mood', score: 8, icon: 'smile', label: 'Good (8)' },
                { type: 'mood', score: 5, icon: 'meh', label: 'Okay (5)' },
                { type: 'mood', score: 3, icon: 'annoyed', label: 'Bad (3)' },
                { type: 'mood', score: 1, icon: 'frown', label: 'Awful (1)' }
            ]
        },
        {
            id: 'ddSad',
            icon: 'frown',
            label: 'Sadness',
            items: [
                { text: 'I feel lonely and low', label: 'I feel lonely and low' },
                { text: 'I feel hopeless', label: 'I feel hopeless' },
                { text: 'I want to cry for no clear reason', label: 'I want to cry for no clear reason' },
                { text: 'Everything feels meaningless', label: 'Everything feels meaningless' },
                { text: 'I feel stuck', label: 'I feel stuck' }
            ]
        },
        {
            id: 'ddAnxious',
            icon: 'wind',
            label: 'Anxiety',
            items: [
                { text: 'I feel like something bad is about to happen', label: 'Something bad feels close' },
                { text: 'I cannot stop worrying', label: 'I cannot stop worrying' },
                { text: 'I have physical panic symptoms', label: 'Physical panic symptoms' },
                { text: 'I feel afraid of an upcoming event', label: 'Fear of an upcoming event' },
                { text: 'My mind is racing and I cannot focus', label: 'Too many thoughts to focus' }
            ]
        },
        {
            id: 'ddAngry',
            icon: 'flame',
            label: 'Anger',
            items: [
                { text: 'Everything irritates me right now', label: 'Everything irritates me' },
                { text: 'I am angry at a specific person', label: 'I am angry at someone' },
                { text: 'I cannot hold back my aggression', label: 'I cannot hold back my aggression' },
                { text: 'Something feels unfair', label: 'Something feels unfair' },
                { text: 'It is hard to understand my emotions', label: 'I cannot sort out my emotions' }
            ]
        },
        {
            id: 'ddTired',
            icon: 'battery-low',
            label: 'Fatigue',
            items: [
                { text: 'I have no energy even for simple tasks', label: 'No energy at all' },
                { text: 'I feel emotionally burned out', label: 'Emotional burnout' },
                { text: 'I keep procrastinating and cannot start', label: 'I keep procrastinating' },
                { text: 'I sleep badly and never feel rested', label: 'I sleep badly' },
                { text: 'I do not know what decision to make', label: 'I cannot decide what to do' }
            ]
        },
        {
            id: 'ddCalm',
            icon: 'sun',
            label: 'Calm',
            items: [
                { text: 'Today feels like a really good day', label: 'Today is a good day' },
                { text: 'I managed to handle a difficult task', label: 'I handled a difficult task' },
                { text: 'I want to reinforce this good state', label: 'I want to reinforce this state' },
                { text: 'I feel grateful for what I have right now', label: 'I feel grateful' }
            ]
        }
    ],

    zh: [
        {
            id: 'ddMood',
            icon: 'smile-plus',
            label: '情绪',
            items: [
                { type: 'mood', score: 10, icon: 'laugh', label: '非常好 (10)' },
                { type: 'mood', score: 8, icon: 'smile', label: '很好 (8)' },
                { type: 'mood', score: 5, icon: 'meh', label: '一般 (5)' },
                { type: 'mood', score: 3, icon: 'annoyed', label: '不太好 (3)' },
                { type: 'mood', score: 1, icon: 'frown', label: '非常糟糕 (1)' }
            ]
        },
        {
            id: 'ddSad',
            icon: 'frown',
            label: '悲伤',
            items: [
                { text: '我感到孤独和低落', label: '我感到孤独和低落' },
                { text: '我觉得没有希望', label: '感觉没有希望' },
                { text: '我没有明显原因却想哭', label: '莫名想哭' },
                { text: '我觉得一切都没有意义', label: '感觉一切没有意义' },
                { text: '我感觉自己陷入了困境', label: '感觉陷入困境' }
            ]
        },
        {
            id: 'ddAnxious',
            icon: 'wind',
            label: '焦虑',
            items: [
                { text: '我总觉得可能会发生不好的事情', label: '担心会发生坏事' },
                { text: '我无法停止担忧', label: '无法停止担忧' },
                { text: '我出现了心慌、呼吸急促等恐慌症状', label: '出现恐慌症状' },
                { text: '我对即将发生的事情感到害怕', label: '害怕即将发生的事情' },
                { text: '我的脑子里有很多想法，很难集中注意力', label: '思绪太多无法集中' }
            ]
        },
        {
            id: 'ddAngry',
            icon: 'flame',
            label: '愤怒',
            items: [
                { text: '现在很多事情都会让我烦躁', label: '很多事情让我烦躁' },
                { text: '我在生某个人的气', label: '我在生某个人的气' },
                { text: '我感觉自己很难控制愤怒', label: '很难控制愤怒' },
                { text: '我觉得这件事很不公平', label: '感觉事情不公平' },
                { text: '我很难弄清楚自己现在的情绪', label: '无法理清自己的情绪' }
            ]
        },
        {
            id: 'ddTired',
            icon: 'battery-low',
            label: '疲惫',
            items: [
                { text: '我几乎没有精力，连简单的事情都不想做', label: '完全没有精力' },
                { text: '我感觉自己有些情绪耗竭', label: '感觉情绪耗竭' },
                { text: '我一直拖延，很难开始行动', label: '一直拖延' },
                { text: '我最近睡得不好，总感觉没有休息够', label: '睡眠不好' },
                { text: '我不知道现在应该做什么决定', label: '不知道如何决定' }
            ]
        },
        {
            id: 'ddCalm',
            icon: 'sun',
            label: '平静',
            items: [
                { text: '今天感觉是很不错的一天', label: '今天状态很好' },
                { text: '我成功完成了一件困难的事情', label: '完成了困难任务' },
                { text: '我想保持现在这种良好的状态', label: '保持良好状态' },
                { text: '我很感谢现在拥有的一切', label: '感到感恩' }
            ]
        }
    ]
};

function renderQuickSuggestions() {
    const wrap = document.getElementById('quickSuggestions');
    if (!wrap) return;
    const lang = getCurrentLanguage();
    const groups = QUICK_SUGGESTIONS[lang] || QUICK_SUGGESTIONS.zh;
    wrap.innerHTML = groups.map((group) => {
        const items = group.items.map((item) => {
            if (item.type === 'mood') {
                return `<button class="suggest-item" onclick="logMoodFromWelcome(${item.score}); toggleSuggestMenu('${group.id}')"><i data-lucide="${item.icon}" style="width:14px; vertical-align:middle; margin-right:6px;"></i>${item.label}</button>`;
            }
            return `<button class="suggest-item" onclick="sendQuick('${escapeInlineJsString(item.text)}'); toggleSuggestMenu('${group.id}')">${item.label}</button>`;
        }).join('');
        return `
            <div class="suggest-dropdown" id="${group.id}">
                <button class="suggest-btn" onclick="toggleSuggestMenu('${group.id}')"><i data-lucide="${group.icon}" style="width:14px;color:var(--gray)"></i> ${group.label}</button>
                <div class="suggest-menu">${items}</div>
            </div>
        `;
    }).join('');
    if (window.lucide) lucide.createIcons();
}

function localizeStaticUi() {
    document.title = t('document_title');
    renderQuickSuggestions();
    refreshLocalizedExercises();
    if (document.getElementById('articleModal')?.style.display === 'flex') {
        if (document.getElementById('articleReaderContainer')?.style.display === 'block' && typeof window._articleReaderIndex === 'number') {
            openArticleReader(window._articleReaderIndex);
        } else {
            renderArticleList();
        }
    }
    if (document.getElementById('videoModal')?.style.display === 'flex' && document.getElementById('videoListContainer')?.style.display !== 'none') {
        renderVideoList();
    }
}

function applyTranslations() {
    document.documentElement.lang = getCurrentLanguage();
    localizeStaticUi();
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder));
    });
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
        el.setAttribute('title', t(el.dataset.i18nTitle));
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
        el.innerHTML = t(el.dataset.i18nHtml).replace(/\n/g, '<br>');
    });
    updateLanguageButtons();
    if (rec) rec.lang = getCurrentLocale();
    updateWelcomeMsg();
    if (typeof window.refreshLocalizedTests === 'function') window.refreshLocalizedTests();
    if (typeof window.refreshLocalizedCBT === 'function') window.refreshLocalizedCBT();
    if (typeof checkH === 'function') checkH();
}
window.applyTranslations = applyTranslations;

function setLanguage(lang) {
    localStorage.setItem('APP_LANG', lang);
    applyTranslations();
    scheduleTtsEnabledPromptPreload(lang);
}
window.setLanguage = setLanguage;

function updateWelcomeMsg() {
    let h = new Date().getHours();
    let msg = t('welcome_day');
    if (h >= 5 && h < 12) { msg = t('welcome_morning'); }
    else if (h >= 18 && h < 23) { msg = t('welcome_evening'); }
    else if (h >= 23 || h < 5) { msg = t('welcome_night'); }

    let welText = document.getElementById('welcomeText');
    if (welText) welText.innerText = msg;
}

async function checkH() {
    try {
        const response = await fetch(API + '/api/health');

        if (!response.ok) {
            throw new Error('Backend unavailable');
        }

        const r = await response.json();

        const d = document.getElementById('dotStatus');
        const statusEl = document.getElementById('txtStatus');

        if (d) {
            d.className = 'status-dot online';
        }

        if (statusEl) {
            if (r.provider && r.model) {
                statusEl.innerText = `${r.provider} · ${r.model}`;
            } else if (r.model) {
                statusEl.innerText = r.model;
            } else {
                statusEl.innerText = '后端已连接';
            }
        }

    } catch (e) {
        const d = document.getElementById('dotStatus');
        const statusEl = document.getElementById('txtStatus');

        if (d) {
            d.className = 'status-dot';
        }

        if (statusEl) {
            statusEl.innerText = t('status_backend_down');
        }
    }
}
function toggleSuggestMenu(id) {
    document.querySelectorAll('.suggest-dropdown.open').forEach(el => {
        if (el.id !== id) el.classList.remove('open');
    });
    let el = document.getElementById(id);
    if (el) el.classList.toggle('open');
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.suggest-dropdown')) {
        document.querySelectorAll('.suggest-dropdown.open').forEach(el => el.classList.remove('open'));
    }
});

function openModal(id) {
    document.getElementById(id).style.display = 'flex';
    if (id === 'thoughtModal' && typeof window.renderActivities === 'function') {
        window.renderActivities();
    }
    if (window.lucide) lucide.createIcons();
    if (id === 'sosModal') { loadSosPlan(); if (window.switchSos) switchSos(0); }
}
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
    if (id === 'sosModal') stopBreathing();
    if (id === 'thoughtModal' && typeof window.resetThoughtEditor === 'function') window.resetThoughtEditor();
    if (id === 'sleepModal' && typeof window.resetSleepEditor === 'function') window.resetSleepEditor();
}

let rec = null;
let isRec = false;

// 已经确认完成的文字
let finalTranscript = '';

// 开始语音输入前，输入框原本已有的文字
let speechBaseText = '';

if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

    rec = new SR();

    // 使用当前页面语言，例如中文 zh-CN
    rec.lang = getCurrentLocale();

    // 持续识别
    rec.continuous = true;

    // 返回临时识别结果，实现流式文字
    rec.interimResults = true;

    rec.onstart = () => {
        isRec = true;
        updateMicButton();
    };

    rec.onresult = (event) => {
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;

            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }

        const inp = document.getElementById('msgInput');

        if (!inp) return;

        // 实时把最终文本 + 临时文本显示到输入框
        inp.value =
            speechBaseText +
            finalTranscript +
            interimTranscript;

        // 触发你项目原有的 textarea 自动高度调整逻辑
        inp.dispatchEvent(new Event('input', {
            bubbles: true
        }));
    };

    rec.onerror = (event) => {
        console.error('语音识别错误:', event.error);

        // no-speech 不一定需要关闭
        if (
            event.error !== 'no-speech' &&
            event.error !== 'aborted'
        ) {
            stopVoiceRecognition();
        }
    };

    rec.onend = () => {
        /*
         * 某些浏览器即使 continuous=true，
         * 说话暂停一会儿以后仍会自动结束 Recognition。
         *
         * 如果用户没有主动按暂停，
         * 就自动重新启动。
         */
        if (isRec) {
            try {
                rec.start();
            } catch (e) {
                // Recognition 可能还没有完全释放，忽略即可
            }
        } else {
            updateMicButton();
        }
    };
}

function updateMicButton() {
    const btn = document.getElementById('micBtn');

    if (!btn) return;

    if (isRec) {
        // 正在录音：显示暂停按钮
        btn.innerHTML =
            '<i data-lucide="pause" style="width:18px;"></i>';

        btn.style.color = 'var(--accent)';
        btn.setAttribute('title', '暂停语音输入');

    } else {
        // 没有录音：恢复麦克风
        btn.innerHTML =
            '<i data-lucide="mic" style="width:18px;"></i>';

        btn.style.color = '';
        btn.setAttribute('title', '语音输入');
    }

    if (window.lucide) {
        lucide.createIcons();
    }
}

function startVoiceRecognition() {
    if (!rec) {
        console.warn('当前浏览器不支持语音识别');
        return;
    }

    const inp = document.getElementById('msgInput');

    // 每次新一轮录音重新清空内部结果
    finalTranscript = '';

    // 保留用户原本手打的文字
    speechBaseText = inp ? inp.value : '';

    if (
        speechBaseText &&
        !speechBaseText.endsWith(' ')
    ) {
        speechBaseText += ' ';
    }

    // 切换成当前语言
    rec.lang = getCurrentLocale();

    isRec = true;

    updateMicButton();

    if (inp) {
        inp.placeholder = '正在聆听...';
        inp.focus();
    }

    try {
        rec.start();
    } catch (e) {
        console.warn('语音识别已经启动:', e);
    }
}

function stopVoiceRecognition() {
    if (!rec) return;

    isRec = false;

    try {
        rec.stop();
    } catch (e) {
        console.warn('停止语音识别失败:', e);
    }

    const inp = document.getElementById('msgInput');

    if (inp) {
        inp.placeholder = t('input_placeholder_idle');
        inp.focus();
    }

    updateMicButton();
}

function toggleMic() {
    if (!rec) {
        console.warn('当前浏览器不支持语音识别');
        return;
    }

    if (isRec) {
        stopVoiceRecognition();
    } else {
        startVoiceRecognition();
    }
}

let ttsEnabled = false;
let ttsAudio = null;
let ttsRequestController = null;
let ttsPlaybackPrimed = false;
let ttsEnabledPromptPlayId = 0;
let ttsPreviewPlayId = 0;
let ttsPromptCacheGeneration = 0;
const ttsEnabledPromptCache = new Map();
const ttsEnabledPromptRequests = new Map();
const ttsPreviewCache = new Map();
const ttsPreviewRequests = new Map();

const TTS_ENABLED_PROMPTS = {
    ru: 'Голос включен',
    en: 'Voice on',
    zh: '语音已开启'
};

const TTS_PREVIEW_TEXTS = {
    ru: 'Так звучит выбранный голос Microsoft.',
    en: 'This is how the selected Microsoft voice sounds.',
    zh: '这是当前选择的 Microsoft 中文语音效果。'
};

function setTTSEnabled(enabled) {
    ttsEnabled = Boolean(enabled);
    window.ttsEnabled = ttsEnabled;
}

function isTTSEnabled() {
    return ttsEnabled;
}

window.ttsEnabled = ttsEnabled;
window.isTTSEnabled = isTTSEnabled;

function primeTTSPlayback() {
    if (ttsPlaybackPrimed) return;

    // Start a tiny silent clip while this call is still inside the user's click.
    // This makes later assistant audio reliable in browsers with autoplay rules.
    const silentAudio = new Audio(
        'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQQAAACAgICA'
    );
    const playPromise = silentAudio.play();

    if (playPromise && typeof playPromise.then === 'function') {
        playPromise
            .then(() => {
                ttsPlaybackPrimed = true;
            })
            .catch((err) => {
                console.warn('Unable to prime TTS playback.', err);
            });
    }
}

function getTtsEnabledPromptConfig(language) {
    const lang = TTS_ENABLED_PROMPTS[language] ? language : 'zh';

    return {
        language: lang,
        text: TTS_ENABLED_PROMPTS[lang],
        voice: getPreferredTtsVoice(lang)
    };
}

function getTtsEnabledPromptCacheKey(config) {
    return [
        ttsPromptCacheGeneration,
        config.language,
        config.voice
    ].join(':');
}

function invalidateTtsEnabledPromptCache() {
    ttsPromptCacheGeneration += 1;
    ttsEnabledPromptCache.clear();
    ttsEnabledPromptRequests.clear();
}

async function preloadTtsEnabledPrompt(language) {
    const config = getTtsEnabledPromptConfig(language || getCurrentLanguage());
    const generation = ttsPromptCacheGeneration;
    const cacheKey = getTtsEnabledPromptCacheKey(config);

    if (ttsEnabledPromptCache.has(cacheKey)) {
        return ttsEnabledPromptCache.get(cacheKey);
    }

    if (ttsEnabledPromptRequests.has(cacheKey)) {
        return ttsEnabledPromptRequests.get(cacheKey);
    }

    const request = (async () => {
        try {
            const res = await fetch(API + '/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });

            if (!res.ok) {
                const detail = await res.text();
                throw new Error(`TTS prompt preload failed (${res.status}): ${detail}`);
            }

            const blob = await res.blob();
            if (!blob.size) throw new Error('TTS prompt preload returned empty audio');

            if (generation === ttsPromptCacheGeneration) {
                ttsEnabledPromptCache.set(cacheKey, blob);
            }

            return generation === ttsPromptCacheGeneration ? blob : null;
        } catch (err) {
            console.warn('Unable to preload the TTS enabled prompt.', err);
            return null;
        }
    })();

    ttsEnabledPromptRequests.set(cacheKey, request);
    request.finally(() => {
        if (ttsEnabledPromptRequests.get(cacheKey) === request) {
            ttsEnabledPromptRequests.delete(cacheKey);
        }
    });
    return request;
}

function scheduleTtsEnabledPromptPreload(language) {
    const lang = language || getCurrentLanguage();
    const preload = () => {
        preloadTtsEnabledPrompt(lang);
    };

    if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(preload, { timeout: 2000 });
    } else {
        window.setTimeout(preload, 0);
    }
}

function getTtsPreviewConfig(language, voice) {
    const lang = TTS_PREVIEW_TEXTS[language] ? language : 'zh';

    return {
        language: lang,
        text: TTS_PREVIEW_TEXTS[lang],
        voice: voice || getPreferredTtsVoice(lang)
    };
}

function getTtsPreviewCacheKey(config) {
    return [config.language, config.voice].join(':');
}

async function preloadTtsPreview(language, voice) {
    const config = getTtsPreviewConfig(language, voice);
    const cacheKey = getTtsPreviewCacheKey(config);

    if (ttsPreviewCache.has(cacheKey)) {
        return ttsPreviewCache.get(cacheKey);
    }

    if (ttsPreviewRequests.has(cacheKey)) {
        return ttsPreviewRequests.get(cacheKey);
    }

    const request = (async () => {
        try {
            const res = await fetch(API + '/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });

            if (!res.ok) {
                const detail = await res.text();
                throw new Error(`TTS preview preload failed (${res.status}): ${detail}`);
            }

            const blob = await res.blob();
            if (!blob.size) throw new Error('TTS preview preload returned empty audio');
            ttsPreviewCache.set(cacheKey, blob);
            return blob;
        } catch (err) {
            console.warn('Unable to preload a TTS preview.', err);
            return null;
        }
    })();

    ttsPreviewRequests.set(cacheKey, request);
    request.finally(() => {
        if (ttsPreviewRequests.get(cacheKey) === request) {
            ttsPreviewRequests.delete(cacheKey);
        }
    });
    return request;
}

function scheduleTtsPreviewPreload(language, voice) {
    const preload = () => {
        preloadTtsPreview(language, voice);
    };

    if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(preload, { timeout: 1000 });
    } else {
        window.setTimeout(preload, 0);
    }
}

function scheduleTtsPreviewPreloads(includeAllVoices) {
    const currentLanguage = getCurrentLanguage();
    const languageOrder = [
        currentLanguage,
        ...['zh', 'en', 'ru'].filter((lang) => lang !== currentLanguage)
    ];
    const configs = [];

    languageOrder.forEach((lang) => {
        const voices = includeAllVoices
            ? TTS_VOICE_OPTIONS[lang].map((option) => option.value)
            : [getPreferredTtsVoice(lang)];

        voices.forEach((voice) => configs.push({ language: lang, voice }));
    });

    const preload = () => {
        configs.forEach((config, index) => {
            window.setTimeout(() => {
                preloadTtsPreview(config.language, config.voice);
            }, index * 100);
        });
    };

    if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(preload, { timeout: 1000 });
    } else {
        window.setTimeout(preload, 0);
    }
}

function releaseTtsAudio(audio) {
    if (!audio) return;

    const objectUrl = audio.dataset && audio.dataset.objectUrl;
    if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
        delete audio.dataset.objectUrl;
    }

    if (ttsAudio === audio) ttsAudio = null;
}

function stopTTSPlayback() {
    if (ttsRequestController) {
        ttsRequestController.abort();
        ttsRequestController = null;
    }
    if (ttsAudio) {
        const audio = ttsAudio;
        audio.pause();
        releaseTtsAudio(audio);
    }
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
}
window.stopTTSPlayback = stopTTSPlayback;

async function playTtsBlob(blob) {
    stopTTSPlayback();

    const objectUrl = URL.createObjectURL(blob);
    const audio = new Audio(objectUrl);
    audio.preload = 'auto';
    audio.dataset.objectUrl = objectUrl;
    audio.onended = () => releaseTtsAudio(audio);
    audio.onerror = () => releaseTtsAudio(audio);
    ttsAudio = audio;

    try {
        await audio.play();
        ttsPlaybackPrimed = true;
        return true;
    } catch (err) {
        releaseTtsAudio(audio);
        console.warn('Unable to play cached TTS audio.', err);
        return false;
    }
}

async function playTtsEnabledPrompt(language, playId) {
    const config = getTtsEnabledPromptConfig(language || getCurrentLanguage());
    const cacheKey = getTtsEnabledPromptCacheKey(config);
    let blob = ttsEnabledPromptCache.get(cacheKey) || null;

    if (!blob && ttsEnabledPromptRequests.has(cacheKey)) {
        blob = await ttsEnabledPromptRequests.get(cacheKey);
    }

    if (!isTTSEnabled() || playId !== ttsEnabledPromptPlayId) {
        return false;
    }

    if (blob) {
        const played = await playTtsBlob(blob);
        if (played) return true;
        ttsEnabledPromptCache.delete(cacheKey);
    }

    return playAssistantSpeech(config.text, config.language);
}

async function playAssistantSpeech(text, language) {
    ttsPreviewPlayId += 1;
    const lang = language || getCurrentLanguage();
    const cleanText = (text || '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\*/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 1000);

    if (!cleanText) return;

    stopTTSPlayback();
    const requestController = new AbortController();
    ttsRequestController = requestController;

    try {
        const res = await fetch(API + '/api/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: cleanText,
                language: lang,
                voice: getPreferredTtsVoice(lang)
            }),
            signal: requestController.signal
        });
        if (!res.ok) {
            const detail = await res.text();
            throw new Error(`TTS request failed (${res.status}): ${detail}`);
        }

        const blob = await res.blob();
        if (requestController.signal.aborted) return false;
        if (!blob.size) throw new Error('TTS request returned empty audio');

        const objectUrl = URL.createObjectURL(blob);
        const audio = new Audio(objectUrl);
        audio.preload = 'auto';
        audio.dataset.objectUrl = objectUrl;
        audio.onended = () => releaseTtsAudio(audio);
        audio.onerror = () => releaseTtsAudio(audio);

        ttsAudio = audio;
        await audio.play();
        ttsPlaybackPrimed = true;
        return true;
    } catch (err) {
        if (err.name !== 'AbortError') {
            console.error('Microsoft TTS playback failed', err);
        }
        return false;
    } finally {
        if (ttsRequestController === requestController) {
            ttsRequestController = null;
        }
    }
}
window.playAssistantSpeech = playAssistantSpeech;

async function previewTtsVoice(language) {
    const selectIds = {
        ru: 'ttsVoiceRu',
        en: 'ttsVoiceEn',
        zh: 'ttsVoiceZh'
    };

    const selectId = selectIds[language] || selectIds.zh;
    const select = document.getElementById(selectId);
    const voice = select ? select.value : getPreferredTtsVoice(language);
    const config = getTtsPreviewConfig(language, voice);
    const cacheKey = getTtsPreviewCacheKey(config);
    const playId = ++ttsPreviewPlayId;
    stopTTSPlayback();

    let blob = ttsPreviewCache.get(cacheKey) || null;
    if (!blob && ttsPreviewRequests.has(cacheKey)) {
        blob = await ttsPreviewRequests.get(cacheKey);
    }

    if (playId !== ttsPreviewPlayId) return false;
    if (blob) return playTtsBlob(blob);

    const requestController = new AbortController();
    ttsRequestController = requestController;

    try {
        const res = await fetch(API + '/api/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config),
            signal: requestController.signal
        });
        if (!res.ok) {
            const detail = await res.text();
            throw new Error(`TTS preview request failed (${res.status}): ${detail}`);
        }
        const blob = await res.blob();
        if (requestController.signal.aborted) return false;
        if (!blob.size) throw new Error('TTS preview returned empty audio');
        if (playId !== ttsPreviewPlayId) return false;

        ttsPreviewCache.set(cacheKey, blob);
        if (ttsRequestController === requestController) {
            ttsRequestController = null;
        }
        return playTtsBlob(blob);
    } catch (err) {
        if (err.name !== 'AbortError') console.error('Microsoft TTS preview failed', err);
        return false;
    } finally {
        if (ttsRequestController === requestController) {
            ttsRequestController = null;
        }
    }
}
window.previewTtsVoice = previewTtsVoice;

function toggleTTS() {
    ttsPreviewPlayId += 1;
    ttsEnabledPromptPlayId += 1;
    const playId = ttsEnabledPromptPlayId;
    setTTSEnabled(!isTTSEnabled());
    let btn = document.getElementById('ttsBtn');
    if (ttsEnabled) {
        primeTTSPlayback();
        btn.style.color = 'var(--accent)';
        btn.innerHTML = '<i data-lucide="volume-2" style="width:18px;"></i>';
        const lang = getCurrentLanguage();

        playTtsEnabledPrompt(lang, playId);
    } else {
        btn.style.color = '';
        btn.innerHTML = '<i data-lucide="volume-x" style="width:18px;"></i>';
        stopTTSPlayback();
    }
    lucide.createIcons();
}
window.toggleTTS = toggleTTS;

if (document.readyState === 'complete') {
    scheduleTtsEnabledPromptPreload();
    scheduleTtsPreviewPreloads(false);
} else {
    window.addEventListener('load', () => {
        scheduleTtsEnabledPromptPreload();
        scheduleTtsPreviewPreloads(false);
    }, { once: true });
}

function getLocalizedUiContent() {
    const lang = getCurrentLanguage();
    return {
        ru: {
            sosHints: [
                'Паника, учащённое сердцебиение — быстро снижает пульс',
                '',
                '',
                ''
            ],
            breathingPane: {
                title: 'Дыхательные практики',
                desc: 'Выберите ритм дыхания, который лучше всего подходит вашему состоянию прямо сейчас.'
            },
            breatheTypes: [
                {
                    desc: 'Снижает пульс и останавливает панику.',
                    bgImage: 'img/bg/forest.png',
                    cardTitle: 'Квадрат 4-4-4-4',
                    cardDesc: 'Снижает пульс, останавливает панику',
                    steps: [
                        { text: 'Вдох...', dur: 4000, scale: '1.5', bg: 'var(--accent-light)', color: 'var(--accent)' },
                        { text: 'Задержка', dur: 4000, scale: '1.5', bg: 'var(--accent-light)', color: 'var(--accent)' },
                        { text: 'Выдох...', dur: 4000, scale: '1', bg: 'var(--border)', color: 'var(--text)' },
                        { text: 'Задержка', dur: 4000, scale: '1', bg: 'var(--border)', color: 'var(--text)' }
                    ]
                },
                {
                    desc: 'Техника для снижения тревоги и быстрого засыпания.',
                    bgImage: 'img/bg/stars.png',
                    cardTitle: '4-7-8',
                    cardDesc: 'Снижает тревогу, помогает заснуть',
                    steps: [
                        { text: 'Вдох...', dur: 4000, scale: '1.5', bg: 'var(--accent-light)', color: 'var(--accent)' },
                        { text: 'Задержка...', dur: 7000, scale: '1.5', bg: 'var(--accent-light)', color: 'var(--accent)' },
                        { text: 'Выдох...', dur: 8000, scale: '1', bg: 'var(--border)', color: 'var(--text)' }
                    ]
                },
                {
                    desc: 'Выдох длиннее вдоха — включает парасимпатическую нервную систему.',
                    bgImage: 'img/bg/ocean.png',
                    cardTitle: 'Успокаивающее 4-6',
                    cardDesc: 'Включает парасимпатическую систему',
                    steps: [
                        { text: 'Вдох...', dur: 4000, scale: '1.5', bg: 'var(--accent-light)', color: 'var(--accent)' },
                        { text: 'Выдох...', dur: 6000, scale: '1', bg: 'var(--border)', color: 'var(--text)' }
                    ]
                }
            ],
            breatheTips: [
                'Дышите через нос для максимального эффекта',
                'Сфокусируйтесь на ощущениях в теле',
                'Представьте, как напряжение покидает вас с выдохом',
                'Закройте глаза для более глубокого расслабления',
                'Каждый цикл снижает уровень кортизола',
                'Не торопитесь — ваш ритм идеален',
                'Медленное дыхание активирует блуждающий нерв',
                'Вы делаете важное для своего здоровья'
            ],
            groundingPane: {
                title: 'Заземление 5-4-3-2-1',
                desc: 'Пошаговая техника — помогает вернуться в «здесь и сейчас» при тревоге или панике.',
                items: ['Вещей, которые вы видите', 'Предмета, которых касаетесь', 'Звука, которые слышите', 'Запаха, которые чувствуете', 'Хорошая вещь о себе']
            },
            pmrPane: {
                title: 'Мышечная релаксация',
                desc: 'Напрягайте и расслабляйте группы мышц — снижает физическое напряжение и тревогу.',
                items: ['Лицо — сожмите и расслабьте', 'Плечи и шея', 'Руки и кисти', 'Живот и грудь', 'Ноги и стопы']
            },
            stopPane: {
                title: 'Техника СТОП',
                desc: 'Быстрый 4-шаговый алгоритм — останавливает спираль тревожных мыслей.',
                items: ['Стоп — остановитесь', 'Тело — сделайте глубокий вдох', 'Осмотрись — наблюдайте без оценки', 'Продолжай — действуйте осознанно']
            },
            groundSteps: [
                { num: '5', sense: 'Зрение', text: 'Назовите 5 вещей, которые вы видите вокруг' },
                { num: '4', sense: 'Осязание', text: 'Дотроньтесь до 4 предметов рядом с вами' },
                { num: '3', sense: 'Слух', text: 'Услышьте 3 звука прямо сейчас' },
                { num: '2', sense: 'Обоняние', text: 'Почувствуйте 2 запаха или вспомните их' },
                { num: '1', sense: 'Вы сами', text: 'Назовите 1 хорошую вещь о себе' }
            ],
            groundDone: { sense: 'Готово', text: 'Вы вернулись в «здесь и сейчас». Молодец!', button: 'Закрыть' },
            pmrSteps: [
                { num: '1', muscle: 'Лицо', tenseText: 'Сожмите лицо: зажмурьтесь, нахмурьтесь, сожмите челюсть', relaxText: 'Медленно расслабьте все мышцы лица… почувствуйте тепло' },
                { num: '2', muscle: 'Плечи и шея', tenseText: 'Поднимите плечи к ушам, напрягите шею', relaxText: 'Опустите плечи… почувствуйте как уходит напряжение' },
                { num: '3', muscle: 'Руки и кисти', tenseText: 'Сожмите кулаки и напрягите предплечья', relaxText: 'Разожмите кулаки… расправьте пальцы' },
                { num: '4', muscle: 'Живот и грудь', tenseText: 'Напрягите пресс и грудь, как будто ждёте удар', relaxText: 'Расслабьте живот… дышите свободно' },
                { num: '5', muscle: 'Ноги и стопы', tenseText: 'Вытяните ноги, напрягите бёдра и икры', relaxText: 'Расслабьте ноги… почувствуйте тяжесть и тепло' }
            ],
            pmrPhaseTense: 'Напрягите',
            pmrPhaseRelax: 'Расслабьте',
            pmrDone: 'Готово',
            pmrDoneText: 'Всё тело расслаблено. Молодец!',
            pmrClose: 'Закрыть',
            stopSteps: [
                { letter: 'С', word: 'Стоп', text: 'Скажите себе «Стоп». Мысленно или вслух. Остановите поток мыслей.' },
                { letter: 'Т', word: 'Тело', text: 'Сделайте глубокий вдох через нос на 4 счёта. Медленный выдох через рот на 6.' },
                { letter: 'О', word: 'Осмотрись', text: 'Наблюдайте свои мысли и ощущения со стороны — без оценки и критики.' },
                { letter: 'П', word: 'Продолжай', text: 'Теперь действуйте осознанно. Что важно прямо сейчас?' }
            ],
            stopDone: { word: 'Готово', text: 'Вы вернули контроль. Действуйте осознанно!', button: 'Закрыть' },
            notifications: {
                title: 'КПТ Ассистент',
                morning: '🌅 Доброе утро! Как вы себя чувствуете? Запишите настроение.',
                evening: '🌙 Добрый вечер! Время записать благодарность или мысли дня.'
            },
            aiBreathingStarted: '🌬️ Я запустил(а) для вас Дыхательную практику. Следуйте инструкциям на экране.'
        },
        en: {
            sosHints: [
                '',
                '',
                '',
                ''
            ],
            breathingPane: {
                title: 'Breathing practices',
                desc: 'Choose the breathing rhythm that best matches you.'
            },
            breatheTypes: [
                {
                    desc: 'Helps slow your pulse and interrupt panic.',
                    bgImage: 'img/bg/forest.png',
                    cardTitle: 'Box 4-4-4-4',
                    cardDesc: 'Slows the pulse and interrupts panic',
                    steps: [
                        { text: 'Inhale...', dur: 4000, scale: '1.5', bg: 'var(--accent-light)', color: 'var(--accent)' },
                        { text: 'Hold', dur: 4000, scale: '1.5', bg: 'var(--accent-light)', color: 'var(--accent)' },
                        { text: 'Exhale...', dur: 4000, scale: '1', bg: 'var(--border)', color: 'var(--text)' },
                        { text: 'Hold', dur: 4000, scale: '1', bg: 'var(--border)', color: 'var(--text)' }
                    ]
                },
                {
                    desc: 'A technique for lowering anxiety and falling asleep faster.',
                    bgImage: 'img/bg/stars.png',
                    cardTitle: '4-7-8',
                    cardDesc: 'Reduces anxiety and helps you fall asleep',
                    steps: [
                        { text: 'Inhale...', dur: 4000, scale: '1.5', bg: 'var(--accent-light)', color: 'var(--accent)' },
                        { text: 'Hold...', dur: 7000, scale: '1.5', bg: 'var(--accent-light)', color: 'var(--accent)' },
                        { text: 'Exhale...', dur: 8000, scale: '1', bg: 'var(--border)', color: 'var(--text)' }
                    ]
                },
                {
                    desc: 'A longer exhale activates the parasympathetic nervous system.',
                    bgImage: 'img/bg/ocean.png',
                    cardTitle: 'Soothing 4-6',
                    cardDesc: 'Activates the parasympathetic system',
                    steps: [
                        { text: 'Inhale...', dur: 4000, scale: '1.5', bg: 'var(--accent-light)', color: 'var(--accent)' },
                        { text: 'Exhale...', dur: 6000, scale: '1', bg: 'var(--border)', color: 'var(--text)' }
                    ]
                }
            ],
            breatheTips: [
                'Breathe through your nose for the strongest effect',
                'Focus on what you feel in your body',
                'Imagine tension leaving with every exhale',
                'Close your eyes if that helps you relax',
                'Each cycle helps lower stress hormones',
                'No need to rush, this pace is enough',
                'Slow breathing activates the vagus nerve',
                'You are doing something important for your health'
            ],
            groundingPane: {
                title: 'Grounding 5-4-3-2-1',
                desc: 'A technique to ground you in the present during anxiety or panic.',
                items: ['Things you can see', 'Objects you can touch', 'Sounds you can hear', 'Scents you can notice', 'One good thing about yourself']
            },
            pmrPane: {
                title: 'Progressive Muscle Relaxation',
                desc: 'Tense and release muscles to ease tension and anxiety.',
                items: ['Face - tense and release', 'Shoulders and neck', 'Arms and hands', 'Stomach and chest', 'Legs and feet']
            },
            stopPane: {
                title: 'STOP Technique',
                desc: 'A fast 4-step method that interrupts the spiral of anxious thoughts.',
                items: ['Stop - pause', 'Take a breath - breathe deeply', 'Observe - notice without judging', 'Proceed - act with intention']
            },
            groundSteps: [
                { num: '5', sense: 'Sight', text: 'Name 5 things you can see around you' },
                { num: '4', sense: 'Touch', text: 'Touch 4 objects near you' },
                { num: '3', sense: 'Hearing', text: 'Notice 3 sounds right now' },
                { num: '2', sense: 'Smell', text: 'Notice 2 smells or remember them' },
                { num: '1', sense: 'You', text: 'Name 1 good thing about yourself' }
            ],
            groundDone: { sense: 'Done', text: 'You are back in the here and now. Well done.', button: 'Close' },
            pmrSteps: [
                { num: '1', muscle: 'Face', tenseText: 'Tense your face: squeeze your eyes shut, frown, clench your jaw', relaxText: 'Slowly relax all the muscles in your face and notice the warmth' },
                { num: '2', muscle: 'Shoulders and neck', tenseText: 'Lift your shoulders to your ears and tense your neck', relaxText: 'Drop your shoulders and feel the tension leave' },
                { num: '3', muscle: 'Arms and hands', tenseText: 'Clench your fists and tense your forearms', relaxText: 'Unclench your fists and open your fingers' },
                { num: '4', muscle: 'Stomach and chest', tenseText: 'Tense your abdomen and chest as if bracing for impact', relaxText: 'Relax your stomach and breathe freely' },
                { num: '5', muscle: 'Legs and feet', tenseText: 'Stretch your legs and tense your thighs and calves', relaxText: 'Relax your legs and notice heaviness and warmth' }
            ],
            pmrPhaseTense: 'Tense',
            pmrPhaseRelax: 'Release',
            pmrDone: 'Done',
            pmrDoneText: 'Your whole body is more relaxed now. Well done.',
            pmrClose: 'Close',
            stopSteps: [
                { letter: 'S', word: 'Stop', text: 'Tell yourself “Stop,” silently or out loud. Interrupt the stream of thoughts.' },
                { letter: 'T', word: 'Take a breath', text: 'Take a deep breath in through the nose for 4 counts, then exhale through the mouth for 6.' },
                { letter: 'O', word: 'Observe', text: 'Notice your thoughts and sensations from a small distance, without judging them.' },
                { letter: 'P', word: 'Proceed', text: 'Now act intentionally. What matters most right now?' }
            ],
            stopDone: { word: 'Done', text: 'You have regained control. Move forward with intention.', button: 'Close' },
            notifications: {
                title: 'CBT Assistant',
                morning: '🌅 Good morning. How are you feeling? Log your mood.',
                evening: '🌙 Good evening. It may be a good time to record gratitude or thoughts from the day.'
            },
            aiBreathingStarted: '🌬️ I started a breathing practice for you. Follow the instructions on the screen.'
        },

        zh: {
            sosHints: [
                '如果你正在感到紧张或恐慌，可以先慢慢调整呼吸。',
                '',
                '',
                ''
            ],

            breathingPane: {
                title: '呼吸练习',
                desc: '请选择一种更适合你当前状态的呼吸节奏。'
            },

            breatheTypes: [
                {
                    desc: '帮助放慢呼吸与心率，在紧张或恐慌时稳定下来。',
                    bgImage: 'img/bg/forest.png',
                    cardTitle: '方形呼吸 4-4-4-4',
                    cardDesc: '帮助稳定呼吸与情绪',
                    steps: [
                        {
                            text: '吸气...',
                            dur: 4000,
                            scale: '1.5',
                            bg: 'var(--accent-light)',
                            color: 'var(--accent)'
                        },
                        {
                            text: '屏息',
                            dur: 4000,
                            scale: '1.5',
                            bg: 'var(--accent-light)',
                            color: 'var(--accent)'
                        },
                        {
                            text: '呼气...',
                            dur: 4000,
                            scale: '1',
                            bg: 'var(--border)',
                            color: 'var(--text)'
                        },
                        {
                            text: '屏息',
                            dur: 4000,
                            scale: '1',
                            bg: 'var(--border)',
                            color: 'var(--text)'
                        }
                    ]
                },

                {
                    desc: '一种常见的放松呼吸节奏，可用于缓解紧张并帮助入睡。',
                    bgImage: 'img/bg/stars.png',
                    cardTitle: '4-7-8 呼吸',
                    cardDesc: '帮助放松并为睡眠做准备',
                    steps: [
                        {
                            text: '吸气...',
                            dur: 4000,
                            scale: '1.5',
                            bg: 'var(--accent-light)',
                            color: 'var(--accent)'
                        },
                        {
                            text: '屏息...',
                            dur: 7000,
                            scale: '1.5',
                            bg: 'var(--accent-light)',
                            color: 'var(--accent)'
                        },
                        {
                            text: '呼气...',
                            dur: 8000,
                            scale: '1',
                            bg: 'var(--border)',
                            color: 'var(--text)'
                        }
                    ]
                },

                {
                    desc: '让呼气比吸气更长，帮助身体逐渐放松。',
                    bgImage: 'img/bg/ocean.png',
                    cardTitle: '舒缓呼吸 4-6',
                    cardDesc: '延长呼气，帮助身体放松',
                    steps: [
                        {
                            text: '吸气...',
                            dur: 4000,
                            scale: '1.5',
                            bg: 'var(--accent-light)',
                            color: 'var(--accent)'
                        },
                        {
                            text: '呼气...',
                            dur: 6000,
                            scale: '1',
                            bg: 'var(--border)',
                            color: 'var(--text)'
                        }
                    ]
                }
            ],

            breatheTips: [
                '尽量用鼻子自然吸气',
                '把注意力放在身体的感觉上',
                '呼气时感受身体逐渐放松',
                '如果感觉舒服，可以轻轻闭上眼睛',
                '不需要追求完美的呼吸节奏',
                '慢一点也没关系，找到适合自己的速度',
                '如果感到头晕或不适，请恢复自然呼吸',
                '能停下来照顾自己已经很重要'
            ],

            groundingPane: {
                title: '5-4-3-2-1 感官着陆',
                desc: '通过逐步关注周围环境，帮助自己重新回到此时此刻。',
                items: [
                    '你能看到的东西',
                    '你能触碰到的东西',
                    '你能听到的声音',
                    '你能闻到的气味',
                    '关于自己的一件好事'
                ]
            },

            pmrPane: {
                title: '渐进式肌肉放松',
                desc: '依次绷紧并放松不同肌肉群，帮助减轻身体紧张。',
                items: [
                    '面部——绷紧并放松',
                    '肩膀和颈部',
                    '手臂和双手',
                    '腹部和胸部',
                    '双腿和双脚'
                ]
            },

            stopPane: {
                title: 'STOP 技巧',
                desc: '一个简单的四步练习，帮助打断焦虑和反复思考。',
                items: [
                    'S：停下来',
                    'T：做一次呼吸',
                    'O：观察',
                    'P：继续行动'
                ]
            },

            groundSteps: [
                {
                    num: '5',
                    sense: '视觉',
                    text: '说出你现在能看到的 5 样东西'
                },
                {
                    num: '4',
                    sense: '触觉',
                    text: '触碰身边的 4 样东西，并注意它们的触感'
                },
                {
                    num: '3',
                    sense: '听觉',
                    text: '留意你现在能够听到的 3 种声音'
                },
                {
                    num: '2',
                    sense: '嗅觉',
                    text: '找出你能闻到的 2 种气味，或者回想熟悉的气味'
                },
                {
                    num: '1',
                    sense: '你自己',
                    text: '说出关于自己的一件积极或值得肯定的事情'
                }
            ],

            groundDone: {
                sense: '完成',
                text: '你已经把注意力重新带回了此时此刻。',
                button: '关闭'
            },

            pmrSteps: [
                {
                    num: '1',
                    muscle: '面部',
                    tenseText: '轻轻绷紧面部肌肉：闭紧眼睛、皱眉并咬紧下颌',
                    relaxText: '慢慢放松面部肌肉，注意紧张感逐渐消退'
                },
                {
                    num: '2',
                    muscle: '肩膀和颈部',
                    tenseText: '把肩膀向耳朵方向抬起，并轻轻绷紧颈部',
                    relaxText: '放下肩膀，让颈部和肩膀慢慢松下来'
                },
                {
                    num: '3',
                    muscle: '手臂和双手',
                    tenseText: '握紧拳头并绷紧前臂',
                    relaxText: '慢慢松开拳头，舒展手指'
                },
                {
                    num: '4',
                    muscle: '腹部和胸部',
                    tenseText: '轻轻绷紧腹部和胸部肌肉',
                    relaxText: '放松腹部，让呼吸恢复自然'
                },
                {
                    num: '5',
                    muscle: '双腿和双脚',
                    tenseText: '伸直双腿并轻轻绷紧大腿和小腿',
                    relaxText: '放松双腿，注意沉重和放松的感觉'
                }
            ],

            pmrPhaseTense: '绷紧',
            pmrPhaseRelax: '放松',
            pmrDone: '完成',
            pmrDoneText: '练习完成了，让身体保持自然放松。',
            pmrClose: '关闭',

            stopSteps: [
                {
                    letter: 'S',
                    word: 'Stop 停下来',
                    text: '先停一下，暂时不要继续跟着当前的想法往下走。'
                },
                {
                    letter: 'T',
                    word: 'Take a breath 呼吸',
                    text: '慢慢吸气，再缓慢呼气，把注意力带回身体。'
                },
                {
                    letter: 'O',
                    word: 'Observe 观察',
                    text: '观察现在的想法、情绪和身体感觉，不急着评价它们。'
                },
                {
                    letter: 'P',
                    word: 'Proceed 继续',
                    text: '重新思考：现在最重要的事情是什么？然后选择下一步行动。'
                }
            ],

            stopDone: {
                word: '完成',
                text: '你已经暂停并重新观察了当前状态，现在可以更有意识地选择下一步。',
                button: '关闭'
            },

            notifications: {
                title: 'CBT 心理助手',
                morning: '🌅 早上好。现在感觉怎么样？可以记录一下今天的情绪。',
                evening: '🌙 晚上好。可以记录一下今天的感受、想法或值得感谢的事情。'
            },

            aiBreathingStarted: '🌬️ 我已经为你启动了呼吸练习，请按照屏幕上的提示进行。'
        }
    }[lang] || null;
}


sosHints = window.sosHints || [];
let BREATHE_TYPES = [];
let BREATHE_TIPS = [];
let GROUND_STEPS = [];
let PMR_STEPS = [];
let STOP_STEPS = [];

function refreshLocalizedExercises() {
    const content = getLocalizedUiContent();
    if (!content) return;
    sosHints = content.sosHints.slice();
    BREATHE_TYPES = content.breatheTypes.map((item) => ({ ...item, steps: item.steps.map((step) => ({ ...step })) }));
    BREATHE_TIPS = content.breatheTips.slice();
    GROUND_STEPS = content.groundSteps.map((step) => ({ ...step }));
    PMR_STEPS = content.pmrSteps.map((step) => ({ ...step }));
    STOP_STEPS = content.stopSteps.map((step) => ({ ...step }));

    const sosHint = document.getElementById('sosHint');
    if (sosHint && document.getElementById('sosPane0')?.style.display !== 'none') {
        sosHint.textContent = sosHints[0] || '';
    }

    const breatheButtons = document.querySelectorAll('#breatheTypes .breathe-option');
    BREATHE_TYPES.forEach((type, idx) => {
        const btn = breatheButtons[idx];
        if (!btn) return;
        const icon = btn.querySelector('span');
        const contentWrap = btn.querySelectorAll('span')[1];
        if (contentWrap) {
            contentWrap.innerHTML = `${type.cardTitle}<br><span style="font-weight:400; font-size:11px;">${type.cardDesc}</span>`;
        }
    });

    const ids = [
        ['breathePaneTitle', content.breathingPane.title],
        ['breathePaneDesc', content.breathingPane.desc],
        ['groundPaneTitle', content.groundingPane.title],
        ['groundPaneDesc', content.groundingPane.desc],
        ['pmrPaneTitle', content.pmrPane.title],
        ['pmrPaneDesc', content.pmrPane.desc],
        ['stopPaneTitle', content.stopPane.title],
        ['stopPaneDesc', content.stopPane.desc],
        ['groundSense', GROUND_STEPS[groundStepIdx]?.sense || GROUND_STEPS[0]?.sense || ''],
        ['groundInstruction', GROUND_STEPS[groundStepIdx]?.text || GROUND_STEPS[0]?.text || ''],
        ['pmrMuscle', PMR_STEPS[pmrStepIdx]?.muscle || PMR_STEPS[0]?.muscle || ''],
        ['stopWord', STOP_STEPS[stopStepIdx]?.word || STOP_STEPS[0]?.word || ''],
        ['stopInstruction', STOP_STEPS[stopStepIdx]?.text || STOP_STEPS[0]?.text || '']
    ];
    ids.forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el && value) el.textContent = value;
    });

    content.groundingPane.items.forEach((text, idx) => {
        const el = document.getElementById(`groundPaneItem${idx}`);
        if (el) el.textContent = text;
    });
    content.pmrPane.items.forEach((text, idx) => {
        const el = document.getElementById(`pmrPaneItem${idx}`);
        if (el) el.textContent = text;
    });
    content.stopPane.items.forEach((text, idx) => {
        const el = document.getElementById(`stopPaneItem${idx}`);
        if (el) el.textContent = text;
    });
    STOP_STEPS.forEach((step, idx) => {
        const el = document.getElementById(`stopPaneLetter${idx}`);
        if (el) el.textContent = step.letter;
    });
}

/* === SOS Tabs === */
function switchSosTab(n) {
    const tb = document.getElementById('sosTabBody');
    if (tb) tb.setAttribute('data-tab', String(n));
    if (n !== 0) stopBreathing();
}
window.switchSosTab = switchSosTab;
let breatheTimer = null;
let breatheStepIdx = 0;
let breatheTypeIdx = 0;

function setBreatheType(idx) {
    stopBreathing();
    breatheTypeIdx = idx;
}
window.setBreatheType = setBreatheType;

function openBreatheScreen() {
    console.log('openBreatheScreen called');
    var overlay = document.getElementById('breatheOverlay');
    if (!overlay) { console.error('breatheOverlay not found!'); return; }

    // Set background image based on selected type
    const type = BREATHE_TYPES[breatheTypeIdx];
    overlay.style.backgroundImage = 'linear-gradient(to bottom, rgba(5,5,16,0.6) 0%, rgba(5,5,16,0.85) 100%), url(' + type.bgImage + ')';

    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    // Reset visuals
    var phase = document.getElementById('breathePhase');
    var timer = document.getElementById('breatheTimer');
    var flower = document.getElementById('breatheFlower');
    var glow = document.querySelector('.breathe-bg-glow');
    var cycleEl = document.getElementById('breatheCycleCount');
    var tipEl = document.getElementById('breatheTip');
    if (phase) phase.innerText = t('breathe_phase');
    if (timer) timer.innerText = '';
    if (flower) {
        flower.className = 'breathe-portal';
        flower.style.transitionDuration = '0.5s'; // reset quickly
    }
    if (glow) {
        glow.className = 'breathe-bg-glow';
        glow.style.transitionDuration = '0.5s'; // reset quickly
    }
    if (cycleEl) cycleEl.innerText = t('cycle_one');
    if (tipEl) tipEl.innerText = '';
    _breatheCycleNum = 1;
    // Spawn particles
    spawnBreatheParticles();
    // Auto-start after 0.8s
    setTimeout(function () { toggleBreathing(); }, 800);
}
window.openBreatheScreen = openBreatheScreen;

function closeBreatheScreen() {
    stopBreathing();
    destroyBreatheParticles();
    var overlay = document.getElementById('breatheOverlay');
    if (overlay) overlay.style.display = 'none';
    document.body.style.overflow = '';
}
window.closeBreatheScreen = closeBreatheScreen;

/* === Particle system === */
let _particleInterval = null;

function spawnBreatheParticles() {
    destroyBreatheParticles();
    var container = document.getElementById('breatheParticles');
    if (!container) return;
    function createParticle() {
        var p = document.createElement('div');
        p.className = 'breathe-particle';
        var size = 2 + Math.random() * 3;
        var left = Math.random() * 100;
        var dur = 10 + Math.random() * 15;
        var delay = Math.random() * 8;
        var hue = 240 + Math.random() * 40;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = left + '%';
        p.style.bottom = '-10px';
        p.style.background = 'hsla(' + hue + ', 75%, 70%, ' + (0.3 + Math.random() * 0.4) + ')';
        p.style.animationDuration = dur + 's';
        p.style.animationDelay = delay + 's';
        p.style.boxShadow = '0 0 ' + (size * 3) + 'px hsla(' + hue + ', 75%, 70%, 0.4)';
        container.appendChild(p);
    }
    for (var i = 0; i < 30; i++) createParticle();
    _particleInterval = setInterval(function () {
        if (container.children.length < 40) createParticle();
        if (container.children.length > 50) container.removeChild(container.children[0]);
    }, 2500);
}

function destroyBreatheParticles() {
    if (_particleInterval) { clearInterval(_particleInterval); _particleInterval = null; }
    var container = document.getElementById('breatheParticles');
    if (container) container.innerHTML = '';
}

let _tipIdx = 0;

function showBreatheTip() {
    var tipEl = document.getElementById('breatheTip');
    if (!tipEl) return;
    tipEl.style.opacity = '0';
    setTimeout(function () {
        tipEl.innerText = BREATHE_TIPS[_tipIdx % BREATHE_TIPS.length];
        tipEl.style.transition = 'opacity 1.2s ease';
        tipEl.style.opacity = '1';
        _tipIdx++;
    }, 400);
}

let _breatheCountdown = null;
let _breatheCycleNum = 1;

function toggleBreathing() {
    if (breatheTimer) { stopBreathing(); return; }
    breatheStepIdx = 0;
    _breatheCycleNum = 1;
    showBreatheTip();
    runBreatheStep();
}

function runBreatheStep() {
    const type = BREATHE_TYPES[breatheTypeIdx];
    const step = type.steps[breatheStepIdx % type.steps.length];
    const stepInCycle = breatheStepIdx % type.steps.length;
    const flower = document.getElementById('breatheFlower');
    const glow = document.querySelector('.breathe-bg-glow');
    const phase = document.getElementById('breathePhase');
    const timer = document.getElementById('breatheTimer');
    const cycleEl = document.getElementById('breatheCycleCount');

    if (phase) phase.innerText = step.text;

    // Determine phase type (expanded or collapsed) based directly on the scale property
    let phaseClass = step.scale === '1.5' ? 'expanded' : 'collapsed';

    // Set transition duration to match the step dur precisely
    const durSeconds = (step.dur / 1000) + 's';

    // Animate portal ring (formerly flower)
    if (flower) {
        flower.className = 'breathe-portal ' + phaseClass;
        flower.style.transitionDuration = durSeconds;
    }

    // Animate background glow
    if (glow) {
        glow.className = 'breathe-bg-glow ' + phaseClass;
        glow.style.transitionDuration = durSeconds;
    }

    // Cycle counter update
    if (stepInCycle === 0 && breatheStepIdx > 0) {
        _breatheCycleNum++;
        if (cycleEl) {
    const lang = getCurrentLanguage();

    const cycleLabel =
        lang === 'zh'
            ? '第'
            : lang === 'en'
                ? 'Cycle '
                : 'Цикл ';

    cycleEl.innerText =
        lang === 'zh'
            ? `第 ${_breatheCycleNum} 轮`
            : cycleLabel + _breatheCycleNum;
        }
        showBreatheTip();
    }

    // Countdown timer
    var secs = Math.round(step.dur / 1000);
    if (timer) timer.innerText = secs;
    if (_breatheCountdown) clearInterval(_breatheCountdown);
    var remaining = secs - 1;
    _breatheCountdown = setInterval(function () {
        if (remaining > 0 && timer) { timer.innerText = remaining; remaining--; }
        else { clearInterval(_breatheCountdown); _breatheCountdown = null; }
    }, 1000);

    breatheTimer = setTimeout(function () {
        breatheStepIdx++;
        if (breatheTimer) runBreatheStep();
    }, step.dur);
}

function stopBreathing() {
    if (breatheTimer) { clearTimeout(breatheTimer); breatheTimer = null; }
    if (_breatheCountdown) { clearInterval(_breatheCountdown); _breatheCountdown = null; }
    const flower = document.getElementById('breatheFlower');
    const glow = document.querySelector('.breathe-bg-glow');
    const phase = document.getElementById('breathePhase');
    const timer = document.getElementById('breatheTimer');
    if (flower) {
        flower.className = 'breathe-portal';
        flower.style.transitionDuration = '0.5s';
    }
    if (glow) {
        glow.className = 'breathe-bg-glow';
        glow.style.transitionDuration = '0.5s';
    }
    if (phase) phase.innerText = t('breathe_phase');
    if (timer) timer.innerText = '';
}

var groundStepIdx = 0;

function openGroundScreen() {
    groundStepIdx = 0;
    var overlay = document.getElementById('groundOverlay');
    if (!overlay) return;
    overlay.style.backgroundImage = 'linear-gradient(to bottom, rgba(9,16,12,0.52) 0%, rgba(9,16,12,0.82) 100%), url(img/bg/forest.png)';
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    renderGroundStep();
}
window.openGroundScreen = openGroundScreen;

function closeGroundScreen() {
    var overlay = document.getElementById('groundOverlay');
    if (overlay) overlay.style.display = 'none';
    document.body.style.overflow = '';
}
window.closeGroundScreen = closeGroundScreen;

function renderGroundStep() {
    var step = GROUND_STEPS[groundStepIdx];
    var numEl = document.getElementById('groundNumber');
    var senseEl = document.getElementById('groundSense');
    var instrEl = document.getElementById('groundInstruction');
    var btn = document.getElementById('groundNextBtn');
    var dots = document.querySelectorAll('.ground-dot');
    var scene = document.querySelector('.ground-scene');

    if (numEl) { numEl.innerText = step.num; numEl.style.animation = 'none'; numEl.offsetHeight; numEl.style.animation = ''; }
    if (senseEl) { senseEl.innerText = step.sense; senseEl.style.animation = 'none'; senseEl.offsetHeight; senseEl.style.animation = ''; }
    if (instrEl) { instrEl.innerText = step.text; instrEl.style.animation = 'none'; instrEl.offsetHeight; instrEl.style.animation = ''; }
    if (btn) {
    const lang = getCurrentLanguage();

    btn.innerText = (groundStepIdx < 4)
        ? t('done_arrow')
        : (
            lang === 'zh'
                ? '完成'
                : lang === 'en'
                    ? 'Finish'
                    : 'Завершить'
        );
    }
    if (scene) scene.classList.remove('ground-complete');

    dots.forEach(function (d, i) {
        d.className = 'ground-dot' + (i < groundStepIdx ? ' done' : '') + (i === groundStepIdx ? ' active' : '');
    });
}

function groundNext() {
    groundStepIdx++;
    if (groundStepIdx >= GROUND_STEPS.length) {
        showGroundComplete();
        return;
    }
    renderGroundStep();
}
window.groundNext = groundNext;

function showGroundComplete() {
    var numEl = document.getElementById('groundNumber');
    var senseEl = document.getElementById('groundSense');
    var instrEl = document.getElementById('groundInstruction');
    var btn = document.getElementById('groundNextBtn');
    var dots = document.querySelectorAll('.ground-dot');
    var scene = document.querySelector('.ground-scene');

    if (scene) scene.classList.add('ground-complete');
    if (numEl) { numEl.innerText = '\u2713'; numEl.style.animation = 'none'; }
    const content = getLocalizedUiContent();
    if (senseEl) senseEl.innerText = content.groundDone.sense;
    if (instrEl) instrEl.innerText = content.groundDone.text;
    if (btn) { btn.innerText = content.groundDone.button; btn.onclick = closeGroundScreen; }
    dots.forEach(function (d) { d.className = 'ground-dot done'; });
}

var pmrStepIdx = 0;
var pmrPhaseIsTense = true;
var pmrTimerId = null;

function openPmrScreen() {
    pmrStepIdx = 0;
    pmrPhaseIsTense = true;
    var overlay = document.getElementById('pmrOverlay');
    if (!overlay) return;
    overlay.style.backgroundImage = 'linear-gradient(to bottom, rgba(7,10,22,0.58) 0%, rgba(7,10,22,0.84) 100%), url(img/bg/ocean.png)';
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    renderPmrStep();
    startPmrTimer(5);
}
window.openPmrScreen = openPmrScreen;

function closePmrScreen() {
    clearInterval(pmrTimerId);
    pmrTimerId = null;
    var overlay = document.getElementById('pmrOverlay');
    if (overlay) overlay.style.display = 'none';
    document.body.style.overflow = '';
}
window.closePmrScreen = closePmrScreen;

function renderPmrStep() {
    var step = PMR_STEPS[pmrStepIdx];
    var numEl = document.getElementById('pmrStepNum');
    var muscleEl = document.getElementById('pmrMuscle');
    var phaseEl = document.getElementById('pmrPhase');
    var instrEl = document.getElementById('pmrInstruction');
    var scene = document.querySelector('.pmr-scene');
    var dots = document.querySelectorAll('.pmr-dot');

    if (numEl) {
        numEl.innerText = step.num;
        numEl.className = 'pmr-step-num' + (pmrPhaseIsTense ? ' tense' : ' relax');
    }
    if (muscleEl) { muscleEl.innerText = step.muscle; }
    if (phaseEl) {
        const content = getLocalizedUiContent();
        phaseEl.innerText = pmrPhaseIsTense ? content.pmrPhaseTense : content.pmrPhaseRelax;
        phaseEl.className = 'pmr-phase' + (pmrPhaseIsTense ? ' tense' : ' relax');
    }
    if (instrEl) instrEl.innerText = pmrPhaseIsTense ? step.tenseText : step.relaxText;
    if (scene) scene.classList.remove('pmr-complete');

    dots.forEach(function (d, i) {
        d.className = 'pmr-dot' + (i < pmrStepIdx ? ' done' : '') + (i === pmrStepIdx ? ' active' : '');
    });
}

function startPmrTimer(seconds) {
    clearInterval(pmrTimerId);
    var remaining = seconds;
    var timerEl = document.getElementById('pmrTimer');
    if (timerEl) timerEl.innerText = remaining;
    pmrTimerId = setInterval(function () {
        remaining--;
        if (timerEl) timerEl.innerText = remaining > 0 ? remaining : '';
        if (remaining <= 0) {
            clearInterval(pmrTimerId);
            if (pmrPhaseIsTense) {
                pmrPhaseIsTense = false;
                renderPmrStep();
                startPmrTimer(7);
            } else {
                pmrStepIdx++;
                if (pmrStepIdx >= PMR_STEPS.length) {
                    showPmrComplete();
                } else {
                    pmrPhaseIsTense = true;
                    renderPmrStep();
                    startPmrTimer(5);
                }
            }
        }
    }, 1000);
}

function pmrNext() {
    clearInterval(pmrTimerId);
    if (pmrPhaseIsTense) {
        pmrPhaseIsTense = false;
        renderPmrStep();
        startPmrTimer(7);
    } else {
        pmrStepIdx++;
        if (pmrStepIdx >= PMR_STEPS.length) {
            showPmrComplete();
        } else {
            pmrPhaseIsTense = true;
            renderPmrStep();
            startPmrTimer(5);
        }
    }
}
window.pmrNext = pmrNext;

function showPmrComplete() {
    clearInterval(pmrTimerId);
    var numEl = document.getElementById('pmrStepNum');
    var muscleEl = document.getElementById('pmrMuscle');
    var phaseEl = document.getElementById('pmrPhase');
    var instrEl = document.getElementById('pmrInstruction');
    var timerEl = document.getElementById('pmrTimer');
    var btn = document.getElementById('pmrNextBtn');
    var dots = document.querySelectorAll('.pmr-dot');
    var scene = document.querySelector('.pmr-scene');

    if (scene) scene.classList.add('pmr-complete');
    if (numEl) { numEl.innerText = '\u2713'; numEl.className = 'pmr-step-num relax'; }
    if (muscleEl) muscleEl.innerText = '';
    const content = getLocalizedUiContent();
    if (phaseEl) { phaseEl.innerText = content.pmrDone; phaseEl.className = 'pmr-phase relax'; }
    if (instrEl) instrEl.innerText = content.pmrDoneText;
    if (timerEl) timerEl.innerText = '';
    if (btn) { btn.innerText = content.pmrClose; btn.onclick = closePmrScreen; }
    dots.forEach(function (d) { d.className = 'pmr-dot done'; });
}

var stopStepIdx = 0;

function openStopScreen() {
    stopStepIdx = 0;
    var overlay = document.getElementById('stopOverlay');
    if (!overlay) return;
    overlay.style.backgroundImage = 'linear-gradient(to bottom, rgba(6,8,18,0.54) 0%, rgba(6,8,18,0.82) 100%), url(img/bg/stars.png)';
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    renderStopStep();
}
window.openStopScreen = openStopScreen;

function closeStopScreen() {
    var overlay = document.getElementById('stopOverlay');
    if (overlay) overlay.style.display = 'none';
    document.body.style.overflow = '';
}
window.closeStopScreen = closeStopScreen;

function renderStopStep() {
    var step = STOP_STEPS[stopStepIdx];
    var letterEl = document.getElementById('stopLetter');
    var wordEl = document.getElementById('stopWord');
    var instrEl = document.getElementById('stopInstruction');
    var btn = document.getElementById('stopNextBtn');
    var dots = document.querySelectorAll('.stop-dot');
    var scene = document.querySelector('.stop-scene');

    if (letterEl) { letterEl.innerText = step.letter; letterEl.style.animation = 'none'; letterEl.offsetHeight; letterEl.style.animation = ''; }
    if (wordEl) { wordEl.innerText = step.word; wordEl.style.animation = 'none'; wordEl.offsetHeight; wordEl.style.animation = ''; }
    if (instrEl) { instrEl.innerText = step.text; instrEl.style.animation = 'none'; instrEl.offsetHeight; instrEl.style.animation = ''; }
    if (btn) {
    const lang = getCurrentLanguage();

    btn.innerText = (stopStepIdx < 3)
        ? t('done_arrow')
        : (
            lang === 'zh'
                ? '完成'
                : lang === 'en'
                    ? 'Finish'
                    : 'Завершить'
        );

        btn.onclick = stopNext;
    }
    if (scene) scene.classList.remove('stop-complete');

    dots.forEach(function (d, i) {
        d.className = 'stop-dot' + (i < stopStepIdx ? ' done' : '') + (i === stopStepIdx ? ' active' : '');
    });
}

function stopNext() {
    stopStepIdx++;
    if (stopStepIdx >= STOP_STEPS.length) {
        showStopComplete();
        return;
    }
    renderStopStep();
}
window.stopNext = stopNext;

function showStopComplete() {
    var letterEl = document.getElementById('stopLetter');
    var wordEl = document.getElementById('stopWord');
    var instrEl = document.getElementById('stopInstruction');
    var btn = document.getElementById('stopNextBtn');
    var dots = document.querySelectorAll('.stop-dot');
    var scene = document.querySelector('.stop-scene');

    if (scene) scene.classList.add('stop-complete');
    if (letterEl) { letterEl.innerText = '\u2713'; letterEl.style.animation = 'none'; }
    const content = getLocalizedUiContent();
    if (wordEl) wordEl.innerText = content.stopDone.word;
    if (instrEl) instrEl.innerText = content.stopDone.text;
    if (btn) { btn.innerText = content.stopDone.button; btn.onclick = closeStopScreen; }
    dots.forEach(function (d) { d.className = 'stop-dot done'; });
}

/* === Crisis Plan === */
function saveSosPlan() {
    const text = document.getElementById('sosPlanText')?.value || '';
    localStorage.setItem('sosCrisisPlan', text);
}
function loadSosPlan() {
    const el = document.getElementById('sosPlanText');
    if (el) el.value = localStorage.getItem('sosCrisisPlan') || '';
}
window.saveSosPlan = saveSosPlan;

/* === Notifications === */
let _notifTimers = [];

function openNotifModal() {
    const s = JSON.parse(localStorage.getItem('notifSettings') || '{}');
    document.getElementById('notifMorning').checked = s.morning || false;
    document.getElementById('notifMorningTime').value = s.morningTime || '09:00';
    document.getElementById('notifEvening').checked = s.evening || false;
    document.getElementById('notifEveningTime').value = s.eveningTime || '21:00';
    populateTtsVoiceControls();
    openModal('notifModal');
    scheduleTtsPreviewPreloads(true);
}
window.openNotifModal = openNotifModal;

function saveNotifSettings() {
    const s = {
        morning: document.getElementById('notifMorning').checked,
        morningTime: document.getElementById('notifMorningTime').value,
        evening: document.getElementById('notifEvening').checked,
        eveningTime: document.getElementById('notifEveningTime').value,
    };
    const ttsSettings = {
        ruVoice: document.getElementById('ttsVoiceRu')?.value || 'ru-RU-SvetlanaNeural',
        enVoice: document.getElementById('ttsVoiceEn')?.value || 'en-US-JennyNeural',
        zhVoice: document.getElementById('ttsVoiceZh')?.value || 'zh-CN-XiaoxiaoNeural'
    };
    const previousTtsSettings = getTtsSettings();
    const ttsVoiceChanged = (
        previousTtsSettings.ruVoice !== ttsSettings.ruVoice
        || previousTtsSettings.enVoice !== ttsSettings.enVoice
        || previousTtsSettings.zhVoice !== ttsSettings.zhVoice
    );
    localStorage.setItem('notifSettings', JSON.stringify(s));
    localStorage.setItem('ttsSettings', JSON.stringify(ttsSettings));
    if (ttsVoiceChanged) invalidateTtsEnabledPromptCache();
    scheduleTtsEnabledPromptPreload();
    scheduleNotifications(s);
    closeModal('notifModal');
    // Update bell icon to show active state
    const bell = document.getElementById('notifSidebarBtn');
    if (bell) bell.style.color = (s.morning || s.evening) ? 'var(--accent)' : '';
}
window.saveNotifSettings = saveNotifSettings;

function scheduleNotifications(s) {
    _notifTimers.forEach(t => clearTimeout(t));
    _notifTimers = [];
    if (!('Notification' in window)) return;
    const proceed = () => {
        if (Notification.permission !== 'granted') return;
        function scheduleAt(timeStr, message) {
            const [h, m] = timeStr.split(':').map(Number);
            const now = new Date();
            const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0);
            if (target <= now) target.setDate(target.getDate() + 1);
            const delay = target - now;
            _notifTimers.push(setTimeout(() => {
                const notif = getLocalizedUiContent().notifications;
                new Notification(notif.title, { body: message });
                scheduleAt(timeStr, message);
            }, delay));
        }
        const notif = getLocalizedUiContent().notifications;
        if (s.morning) scheduleAt(s.morningTime, notif.morning);
        if (s.evening) scheduleAt(s.eveningTime, notif.evening);
    };
    if (Notification.permission === 'default') {
        Notification.requestPermission().then(proceed);
    } else {
        proceed();
    }
}

function startBreathingFromAI() {
    openModal('sosModal');
    switchSosTab(0);

    if (!breatheTimer) {
        toggleBreathing();
    }

    const lang = getCurrentLanguage();

    let practiceLabel;
    let sentence;

    if (lang === 'zh') {
        practiceLabel = '呼吸练习';
        sentence = '🌬️ 我已经为你启动了{link}。请按照屏幕上的提示进行练习。';
    } else if (lang === 'en') {
        practiceLabel = 'breathing practice';
        sentence = '🌬️ I started a {link} for you. Follow the on-screen instructions.';
    } else {
        practiceLabel = 'Дыхательную практику';
        sentence = '🌬️ Я запустил(а) для вас {link}. Следуйте инструкциям на экране.';
    }

    const btnMessage = document.getElementById('messages');
    const div = document.createElement('div');

    div.className = 'msg assistant';

    div.innerHTML = `
        <div class="msg-avatar">
            <i data-lucide="sparkles" style="width:18px;"></i>
        </div>
        <div class="msg-content">
            <p>
                ${sentence.replace(
                    '{link}',
                    `<a href="#" onclick="openModal('sosModal'); return false;" style="color:var(--accent);text-decoration:underline;">${practiceLabel}</a>`
                )}
            </p>
        </div>
    `;

    if (btnMessage) {
        btnMessage.appendChild(div);

        if (window.lucide) {
            window.lucide.createIcons();
        }

        btnMessage.scrollTop = btnMessage.scrollHeight;
    }
}

window.startBreathingFromAI = startBreathingFromAI;
refreshLocalizedExercises();

// --- Article Library ---
const ARTICLE_CATALOG = [
    {
        kicker: 'Статья 1',
        title: 'Что такое депрессия — данные ВОЗ и NIMH',
        excerpt: 'Базовый обзор депрессии: распространённость, факторы риска, подходы к лечению и практические шаги поддержки.',
        sources: ['WHO', 'NIMH'],
        body: [
            'По данным ВОЗ, депрессия остаётся одним из самых распространённых психических расстройств в мире и затрагивает около 5,7% взрослого населения планеты. Женщины сталкиваются с ней чаще мужчин.',
            'ВОЗ подчёркивает, что депрессия возникает не по одной причине, а на фоне сложного взаимодействия социальных, психологических и биологических факторов. Риск повышается после тяжёлых жизненных событий: потери работы, утраты близких, травматического опыта.',
            'National Institute of Mental Health указывает, что при более лёгких формах депрессии первым шагом обычно становится психотерапия. Если только терапия не даёт достаточного эффекта, к ней позже могут добавляться медикаменты. При умеренной и тяжёлой депрессии лекарства, как правило, подключают сразу.',
            'ВОЗ отдельно отмечает, что существуют эффективные методы помощи при лёгкой, умеренной и тяжёлой депрессии, а часть кратких психологических интервенций может применяться даже специалистами без глубокой психотерапевтической подготовки.',
            'Ключевые публикации: WHO Comprehensive Mental Health Action Plan 2013–2030; NIMH Depression Publication (NIH); Global Burden of Disease Study 2021.'
        ],
        bullets: [
            'Выделяйте хотя бы 30 минут в день на физическую активность, даже если это просто ходьба.',
            'Старайтесь держать регулярный режим сна и питания.',
            'Не изолируйтесь: поддерживайте контакт с близкими и говорите о своём состоянии.',
            'Избегайте алкоголя, никотина и запрещённых веществ.',
            'По возможности отложите крупные жизненные решения до стабилизации состояния.'
        ]
    },
    {
        kicker: 'Статья 2',
        title: 'Когнитивная терапия депрессии — наследие Аарона Бека',
        excerpt: 'Как Аарон Бек заложил основу КПТ и почему работа с автоматическими мыслями меняет течение депрессии.',
        sources: ['Beck Institute', 'PMC', 'StatPearls'],
        body: [
            'Аарон Темкин Бек, американский психиатр и профессор Университета Пенсильвании, считается «отцом когнитивной терапии». В 1960-х годах он разработал подход, который позже стал когнитивно-поведенческой терапией.',
            'Работая с депрессивными пациентами, Бек заметил, что в основе их эмоционального состояния часто лежат устойчивые негативные убеждения о потере, неудаче и собственной несостоятельности. Эти убеждения проявляются через автоматические мысли, возникающие быстро и воспринимаемые как факты.',
            'Одно из ключевых понятий Бека — когнитивная триада депрессии: негативный взгляд на себя, на мир и на будущее. Когда человек смотрит на всё через эту схему, его настроение и поведение начинают поддерживать депрессивный цикл.',
            'В 1977 году было опубликовано одно из первых крупных клинических исследований, где когнитивная терапия сравнивалась с антидепрессантами. Это стало важной точкой для признания разговорной терапии как доказательного метода лечения депрессии.',
            'Ключевые публикации: Beck, A.T. et al. (1979). Cognitive Therapy of Depression; Rush, A.J., Beck, A.T. et al. (1977). Cognitive Therapy and Research, 1, 17–37.'
        ],
        bullets: [
            'Замечайте автоматические негативные мысли, а не принимайте их сразу за истину.',
            'Проверяйте мысль вопросами: какие есть факты за и против?',
            'Ищите когнитивные искажения: катастрофизацию, сверхобобщение, чтение мыслей.',
            'Формулируйте более сбалансированную альтернативу вместо жёсткого самокритичного вывода.'
        ]
    },
    {
        kicker: 'Статья 3',
        title: 'Выученная беспомощность и «выученный оптимизм» — Мартин Селигман',
        excerpt: 'Почему чувство «от меня ничего не зависит» связано с депрессией и как работает более реалистичный атрибутивный стиль.',
        sources: ['PMC', 'Positive Psychology Center'],
        body: [
            'Мартин Селигман вместе со Стивеном Майером в 1967 году описал феномен выученной беспомощности. Они показали, что при повторяющихся неконтролируемых негативных событиях человек или животное могут «обучиться» убеждению, что их действия ничего не меняют.',
            'Селигман рассматривал выученную беспомощность как лабораторную модель клинической депрессии. Особенно важным оказалось то, как человек объясняет себе плохие события.',
            'Пессимистический атрибутивный стиль трактует неудачи как постоянные, личные и всеобъемлющие. Оптимистический стиль видит их как временные, ограниченные и не определяющие всю личность. Именно этот сдвиг объяснения помогает снижать уязвимость к депрессии.',
            'Идея выученного оптимизма позже оформилась в практику оспаривания пессимистических убеждений. В книге Learned Optimism Селигман предложил технику ABC: Adversity, Belief, Consequence — событие, убеждение, последствие.',
            'Ключевые публикации: Seligman, M.E.P. & Maier, S.F. (1967). Journal of Experimental Psychology, 74, 1–9; Seligman, M.E.P. (1990). Learned Optimism; Abramson, L.Y., Seligman, M.E.P. & Teasdale, J.D. (1978). Reformulated Learned Helplessness.'
        ],
        bullets: [
            'Замечайте, как вы объясняете себе неудачу.',
            'Спросите себя: это точно навсегда, везде и только из-за меня?',
            'Ищите более ограниченное и реалистичное объяснение события.',
            'Отделяйте факт неприятности от глобального вывода о собственной ценности.'
        ]
    },
    {
        kicker: 'Статья 4',
        title: 'Физическая активность как лечение депрессии — мета-анализы',
        excerpt: 'Что показывают крупные мета-анализы: ходьба, бег, йога и силовые тренировки реально уменьшают симптомы депрессии.',
        sources: ['JAMA Psychiatry', 'BMJ', 'American Journal of Psychiatry'],
        body: [
            'Мета-анализ Pearce et al. в JAMA Psychiatry включил 15 проспективных исследований и более 2 миллионов человеко-лет наблюдений. Люди, выполнявшие рекомендованный объём физической активности, имели на 25% ниже риск развития депрессии по сравнению с малоактивными.',
            'Даже половина от рекомендованного объёма активности была связана с заметной пользой: риск снижался примерно на 18%. Это важно, потому что вход в движение может начинаться не с «идеального режима», а с очень малого шага.',
            'Сетевой мета-анализ Noetel et al. в BMJ в 2024 году показал, что ходьба, бег трусцой, йога и силовые тренировки дают умеренное снижение симптомов депрессии по сравнению с обычным лечением. Авторы рассматривают эти формы нагрузки как полноценный элемент помощи наряду с психотерапией и медикаментами.',
            'Предполагаемые механизмы включают усиление нейрогенеза, влияние на гиппокамп, снижение воспалительных маркеров и активацию систем, связанных с естественной регуляцией стресса и удовольствия.',
            'Ключевые публикации: Pearce, M. et al. (2022). JAMA Psychiatry, 79(6), 550–559; Noetel, M. et al. (2024). BMJ, 384, e075847; Schuch, F.B. et al. (2018). American Journal of Psychiatry, 175(7), 631–648.'
        ],
        bullets: [
            'Начинайте с малого: даже 15 минут ходьбы в день уже полезны.',
            'Постепенно наращивайте активность до 150 минут умеренной нагрузки в неделю.',
            'Выбирайте формат, который реально переносим и приятен: ходьба, йога, плавание, силовые тренировки.',
            'Смотрите на движение как на лечение, а не как на экзамен на силу воли.'
        ]
    },
    {
        kicker: 'Статья 5',
        title: 'Майндфулнесс-когнитивная терапия (MBCT) — профилактика рецидивов депрессии',
        excerpt: 'Почему MBCT снижает риск новых эпизодов депрессии и как идея «мысли — это не факты» помогает выходить из руминации.',
        sources: ['Segal, Williams & Teasdale', 'PMC', 'NICE'],
        body: [
            'MBCT была разработана Зинделем Сигалом, Марком Уильямсом и Джоном Тисдейлом при поддержке Джона Кабат-Зинна. Подход сочетает практики осознанности и когнитивную терапию для профилактики рецидивов депрессии.',
            'Ключевая идея MBCT — помочь человеку замечать ухудшение настроения раньше и не сливаться автоматически с привычными депрессивными паттернами мышления. Осознанность даёт позицию наблюдателя, а когнитивная часть помогает по-новому относиться к мыслям.',
            'Мета-анализы показывают, что у людей с тремя и более депрессивными эпизодами в прошлом MBCT может заметно снижать риск рецидива по сравнению с обычным лечением. NICE в Великобритании включал MBCT в рекомендации как метод профилактики повторных эпизодов.',
            'Классическая программа длится 8 недель и включает групповые встречи, домашнюю практику, сканирование тела, сидячую медитацию, мягкую йогу и обучение распознаванию ранних сигналов ухудшения настроения.',
            'Ключевой принцип MBCT звучит просто: мысли — это не факты. Когда человек учится видеть мысль как ментальное событие, а не как приказ или доказательство, круг руминации ослабевает.',
            'Ключевые публикации: Segal, Z.V., Williams, J.M.G., & Teasdale, J.D. (2002). Mindfulness-Based Cognitive Therapy for Depression; Teasdale, J.D. et al. (2000). Journal of Consulting and Clinical Psychology, 68, 615–623; Kabat-Zinn, J. (1990). Full Catastrophe Living.'
        ],
        bullets: [
            'Отслеживайте ранние сигналы ухудшения настроения до сильного провала.',
            'Практикуйте короткие моменты осознанности, а не только длинные медитации.',
            'Тренируйте позицию наблюдения: мысль пришла, но это ещё не факт.',
            'Возвращайте внимание в тело, дыхание и текущий момент, когда начинается руминация.'
        ]
    },
    {
        kicker: 'Статья 6',
        title: 'Сон и депрессия — двусторонняя связь',
        excerpt: 'Почему бессонница может быть не только симптомом депрессии, но и фактором, который повышает риск нового эпизода.',
        sources: ['Neuroscience Research', 'Journal of Clinical Sleep Medicine', 'PMC'],
        body: [
            'Нарушения сна считаются одним из самых частых симптомов депрессии, но современные данные показывают, что связь идёт в обе стороны. У людей с депрессией часто наблюдаются изменения архитектуры сна, включая сокращение латентности REM-фазы и снижение дельта-мощности в фазе медленного сна.',
            'Недостаток сна сам по себе создаёт физиологический и психологический стресс, который ухудшает эмоциональную регуляцию и повышает риск психических расстройств. Поэтому бессонницу всё чаще рассматривают не только как следствие депрессии, но и как её предиктор.',
            'Лонгитюдные исследования показывают, что бессонница является независимым фактором риска для развития новых и повторных эпизодов депрессии у людей разного возраста. Это важно для профилактики: сон может быть ранним сигналом ухудшения состояния.',
            'Систематические обзоры подтверждают двустороннюю связь между бессонницей, тревогой и депрессией. Один из обсуждаемых механизмов связан с воспалительным путём: нарушения сна активируют симпатическую нервную систему и усиливают провоспалительные процессы.',
            'Ключевые публикации: Yasugaki, S. et al. (2023). Neuroscience Research, 211, 57–64; Fang, H. et al. (2019). J Clin Sleep Med, 15(3), 405–411; Baglioni, C. et al. (2011). J Affect Disord, 135(1-3), 10–19.'
        ],
        bullets: [
            'Поддерживайте стабильное время отхода ко сну и пробуждения.',
            'Уберите экраны хотя бы за час до сна.',
            'Следите за бессонницей как за важным маркером состояния, а не как за мелочью.',
            'При сочетании депрессии и инсомнии учитывайте CBT-I как терапию первой линии.'
        ]
    },
    {
        kicker: 'Статья 7',
        title: 'Социальные связи и одиночество — Джулианна Холт-Ланстад',
        excerpt: 'Почему одиночество связано не только с настроением, но и с долгосрочным риском депрессии и ухудшением здоровья.',
        sources: ['World Psychiatry', 'Perspectives on Psychological Science', 'Harvard T.H. Chan School'],
        body: [
            'Джулианна Холт-Ланстад, профессор психологии и нейронауки Университета Бригама Янга, посвятила значительную часть исследований влиянию социальной изоляции и одиночества на психическое и физическое здоровье.',
            'Современные данные показывают устойчивую связь между социальной изоляцией, чувством одиночества и депрессией на разных этапах жизни. Чем выше уровень качественной социальной связанности, тем ниже риск выраженных депрессивных симптомов.',
            'В обзоре 2024 года в World Psychiatry был показан важный результат: у людей, которые часто испытывают одиночество, вероятность развития новой депрессии более чем вдвое выше по сравнению с теми, кто редко или никогда не чувствует себя одиноким.',
            'Мета-аналитические работы Холт-Ланстад и коллег также показали, что социальная изоляция, одиночество и проживание в одиночку связаны с повышением риска преждевременной смерти. При этом прочные социальные связи, наоборот, заметно повышают шансы на выживание.',
            'Ключевые публикации: Holt-Lunstad, J. (2024). World Psychiatry, 23(3), 312–332; Holt-Lunstad, J. et al. (2015). Perspectives on Psychological Science, 10(2), 227–237; US Surgeon General\'s Advisory (2023).'
        ],
        bullets: [
            'Поддерживайте регулярный контакт хотя бы с одним близким человеком.',
            'Ищите групповые активности: волонтёрство, хобби, спорт, клубы по интересам.',
            'Ставьте акцент на качество связи, а не на количество контактов.',
            'Относитесь к социальной изоляции как к фактору риска, а не просто к особенности характера.'
        ]
    },
    {
        kicker: 'Статья 8',
        title: 'Питание и депрессия — исследование SMILES',
        excerpt: 'Как первое крупное РКИ показало, что улучшение рациона может заметно ослаблять симптомы клинической депрессии.',
        sources: ['BMC Medicine', 'Food & Mood Centre'],
        body: [
            'Феличе Джака, профессор Университета Дикина и основательница Food & Mood Centre, стала одним из ключевых исследователей в области нутрициональной психиатрии. Исследование SMILES было первым рандомизированным контролируемым испытанием, специально созданным для проверки того, может ли улучшение питания помогать в лечении клинической депрессии.',
            'В течение 12 недель участники с умеренной и тяжёлой депрессией получали либо поддержку по модифицированной средиземноморской диете, либо социальную поддержку. Группа с диетической поддержкой показала более выраженное улучшение симптомов, а часть участников достигла полной ремиссии.',
            'Подход SMILES делал акцент на овощах, фруктах, цельнозерновых продуктах, бобовых, орехах, оливковом масле extra virgin, рыбе и умеренном количестве нежирного мяса. Одновременно ограничивались ультраобработанные продукты, сладости и рафинированные углеводы.',
            'Особенно важно, что участники, которые сильнее всего улучшили рацион, получили и наибольшее снижение депрессивных симптомов. Позже результаты получили поддержку в последующих исследованиях, включая HELFIMED и AMMEND.',
            'Ключевые публикации: Jacka, F.N. et al. (2017). BMC Medicine, 15, 23; Parletta, N. et al. (2019). Nutritional Neuroscience; Bayes, J. et al. (2022). American Journal of Clinical Nutrition.'
        ],
        bullets: [
            'Смещайте рацион в сторону овощей, фруктов, бобовых и цельнозерновых.',
            'Добавляйте рыбу, орехи и оливковое масло как более устойчивую основу питания.',
            'Сокращайте долю ультраобработанной пищи и избытка сахара.',
            'Смотрите на питание как на поддерживающий элемент лечения, а не как на магическое решение.'
        ]
    },
    {
        kicker: 'Статья 9',
        title: 'Ось «кишечник — мозг» и депрессия — новый рубеж науки',
        excerpt: 'Что известно о связи микробиоты, воспаления, нейромедиаторов и депрессивных симптомов.',
        sources: ['Nature Communications', 'University College Cork', 'Frontiers in Microbiology'],
        body: [
            'Ось «микробиота — кишечник — мозг» стала одним из самых быстрорастущих направлений в исследовании депрессии. Крупные когортные исследования показали связь между составом кишечной микробиоты и выраженностью депрессивных симптомов.',
            'В одном из заметных исследований, основанном на выборках из Роттердама и Амстердама, была обнаружена связь ряда микробных таксонов с депрессивными симптомами. Эти микроорганизмы вовлечены в метаболические пути, связанные с глутаматом, бутиратом, серотонином и ГАМК.',
            'Джон Крайан и его коллеги показали, что микробные сообщества у людей с депрессией отличаются от таковых у здоровых людей. В экспериментальных моделях перенос такой микробиоты влиял на поведение животных и на метаболизм триптофана, предшественника серотонина.',
            'Хотя это направление ещё развивается, уже ясно, что кишечная микробиота влияет на мозг через иммунные, метаболические и нейромедиаторные механизмы. При этом питание снова оказывается важным звеном, потому что влияет и на воспаление, и на состав микробиоты.',
            'Ключевые публикации: Radjabzadeh, D. et al. (2022). Nature Communications, 13, 7128; Cryan, J. & Dinan, T. (2012). Nature Reviews Neuroscience, 13, 701–712; Bizzozero-Peroni, B. et al. (2025).'
        ],
        bullets: [
            'Увеличивайте долю клетчатки: овощи, бобовые, цельнозерновые.',
            'Добавляйте ферментированные продукты, если они вам подходят.',
            'Ограничивайте ультраобработанную пищу и избыток сахара.',
            'Рассматривайте пробиотики как возможное дополнение, а не замену основному лечению.'
        ]
    },
    {
        kicker: 'Статья 10',
        title: 'Новейшие методы лечения — кетамин, ТМС и цифровые интервенции',
        excerpt: 'Краткий обзор современных подходов для случаев, когда стандартное лечение помогает недостаточно быстро или недостаточно сильно.',
        sources: ['NIMH', 'Clinical Pharmacology & Therapeutics', 'APA'],
        body: [
            'Для людей с резистентной депрессией, когда стандартные антидепрессанты помогают недостаточно, используются новые подходы. Один из самых заметных — кетамин и его форма эскетамин, который может давать быстрый эффект в течение часов, а не недель.',
            'Эскетамин одобрен FDA для резистентной депрессии в форме назального спрея и применяется под наблюдением медицинского персонала. Это не домашняя стратегия самопомощи, а специализированное медицинское лечение.',
            'Другой важный вектор — методы нейростимуляции, включая транскраниальную магнитную стимуляцию. Исследования показывают, что методы этого класса могут быть полезны при тяжёлой депрессии и в ряде случаев дают меньше побочных эффектов, чем более старые подходы.',
            'Отдельно развиваются цифровые интервенции: онлайн-программы когнитивной терапии, телездоровье и цифровые дополнения к психотерапии. Они не заменяют всю помощь, но могут расширять доступ к лечению и поддерживать человека между сессиями.',
            'Рекомендации APA подчёркивают, что лечение депрессии должно подбираться индивидуально. Если в течение 6–8 недель ответ на фармакотерапию остаётся недостаточным, план лечения нужно пересматривать вместе со специалистом.',
            'Ключевые публикации: Raja, S.M. et al. (2024). Clinical Pharmacology & Therapeutics, 116(5), 1314–1324; APA Clinical Practice Guideline (2019); NIMH Brain Stimulation Therapies overview.'
        ],
        bullets: [
            'При тяжёлой или резистентной депрессии обсуждайте варианты лечения только со специалистом.',
            'Не ждите месяцами без пересмотра схемы, если ответа на лечение нет.',
            'Рассматривайте цифровые интервенции как дополнение к терапии, а не как полную замену.',
            'Сохраняйте индивидуальный подход: один и тот же метод подходит не всем.'
        ]
    }
];

const ARTICLE_CATALOG_EN = [
    {
        kicker: 'Article 1',
        title: 'What Depression Is: WHO and NIMH Data',
        excerpt: 'A grounded overview of depression, including prevalence, risk factors, treatment paths, and practical support steps.',
        sources: ['WHO', 'NIMH'],
        body: [
            'According to the World Health Organization, depression remains one of the most common mental disorders worldwide and affects about 5.7% of the adult population. Women experience it more often than men.',
            'WHO emphasizes that depression does not arise from one single cause. It usually develops through a complex interaction of social, psychological, and biological factors, and the risk rises after difficult life events such as loss, trauma, or serious stress.',
            'The National Institute of Mental Health notes that for milder forms of depression, psychotherapy is often the first step. If therapy alone is not enough, medication may be added later. In moderate and severe depression, medication is often introduced earlier.',
            'WHO also stresses that effective treatments exist for mild, moderate, and severe depression, and that some brief psychological interventions can be delivered even outside highly specialized psychotherapy settings.',
            'Key publications: WHO Comprehensive Mental Health Action Plan 2013–2030; NIMH Depression Publication (NIH); Global Burden of Disease Study 2021.'
        ],
        bullets: [
            'Try to include at least 30 minutes of physical activity a day, even if it is only walking.',
            'Keep sleep and meals as regular as you reasonably can.',
            'Stay connected with close people instead of isolating yourself.',
            'Avoid alcohol, nicotine, and illicit substances when possible.',
            'If you can, delay major life decisions until your state is more stable.'
        ]
    },
    {
        kicker: 'Article 2',
        title: 'Cognitive Therapy for Depression: Aaron Beck’s Legacy',
        excerpt: 'How Aaron Beck laid the foundation for CBT and why working with automatic thoughts changes the course of depression.',
        sources: ['Beck Institute', 'PMC', 'StatPearls'],
        body: [
            'Aaron T. Beck, an American psychiatrist and professor at the University of Pennsylvania, is widely seen as the father of cognitive therapy. In the 1960s he developed the approach that later became cognitive behavioral therapy.',
            'Working with depressed patients, Beck noticed that persistent negative beliefs about loss, failure, and personal inadequacy often sat underneath their emotional suffering. These beliefs show up through automatic thoughts that feel immediate and true.',
            'One of Beck’s key ideas is the cognitive triad of depression: a negative view of the self, the world, and the future. When experience is filtered through that triad, mood and behavior begin to maintain the depressive cycle.',
            'A major clinical trial published in 1977 helped establish cognitive therapy as an evidence-based talking treatment by comparing it with antidepressant medication.',
            'Key publications: Beck, A.T. et al. (1979). Cognitive Therapy of Depression; Rush, A.J., Beck, A.T. et al. (1977). Cognitive Therapy and Research, 1, 17–37.'
        ],
        bullets: [
            'Notice automatic negative thoughts instead of accepting them as facts.',
            'Test a thought with evidence for and against it.',
            'Look for distortions such as catastrophizing, overgeneralization, and mind reading.',
            'Replace harsh conclusions with a more balanced alternative.'
        ]
    },
    {
        kicker: 'Article 3',
        title: 'Learned Helplessness and Learned Optimism: Martin Seligman',
        excerpt: 'Why the feeling that “nothing I do matters” is tied to depression and how a more realistic explanatory style helps.',
        sources: ['PMC', 'Positive Psychology Center'],
        body: [
            'Martin Seligman and Steven Maier described learned helplessness in 1967. They showed that repeated uncontrollable negative events can teach a person or animal that their actions make no difference.',
            'Seligman treated learned helplessness as a laboratory model of clinical depression. A crucial factor turned out to be how a person explains bad events to themselves.',
            'A pessimistic explanatory style treats setbacks as permanent, personal, and global. A more optimistic style sees them as temporary, limited, and not equal to the whole self. That shift can reduce vulnerability to depression.',
            'In Learned Optimism, Seligman translated this into practice through the ABC model: adversity, belief, consequence.',
            'Key publications: Seligman, M.E.P. & Maier, S.F. (1967). Journal of Experimental Psychology, 74, 1–9; Seligman, M.E.P. (1990). Learned Optimism; Abramson, L.Y., Seligman, M.E.P. & Teasdale, J.D. (1978). Reformulated Learned Helplessness.'
        ],
        bullets: [
            'Watch how you explain setbacks to yourself.',
            'Ask whether this really means always, everywhere, and all because of me.',
            'Look for a more limited and realistic explanation.',
            'Separate an unpleasant event from a global judgment about your worth.'
        ]
    },
    {
        kicker: 'Article 4',
        title: 'Physical Activity as a Depression Treatment: Meta-Analyses',
        excerpt: 'What large meta-analyses show: walking, jogging, yoga, and strength training can meaningfully reduce depressive symptoms.',
        sources: ['JAMA Psychiatry', 'BMJ', 'American Journal of Psychiatry'],
        body: [
            'The Pearce et al. meta-analysis in JAMA Psychiatry included 15 prospective studies and more than 2 million person-years of follow-up. People who reached the recommended amount of activity had about a 25% lower risk of developing depression than inactive people.',
            'Even half of the recommended level of activity was linked to meaningful benefit. This matters because starting to move does not require an ideal routine from day one.',
            'The 2024 network meta-analysis by Noetel et al. in BMJ found that walking, jogging, yoga, and strength training all produced moderate reductions in depression symptoms compared with usual care.',
            'Possible mechanisms include changes in neurogenesis, the hippocampus, inflammation, and natural stress-regulation systems.',
            'Key publications: Pearce, M. et al. (2022). JAMA Psychiatry, 79(6), 550–559; Noetel, M. et al. (2024). BMJ, 384, e075847; Schuch, F.B. et al. (2018). American Journal of Psychiatry, 175(7), 631–648.'
        ],
        bullets: [
            'Start small: even 15 minutes of walking a day matters.',
            'Build gradually toward about 150 minutes of moderate activity per week.',
            'Choose a form you can realistically tolerate or enjoy.',
            'Treat movement as part of care, not as a test of discipline.'
        ]
    },
    {
        kicker: 'Article 5',
        title: 'Mindfulness-Based Cognitive Therapy (MBCT) and Relapse Prevention',
        excerpt: 'Why MBCT lowers relapse risk and how the idea that “thoughts are not facts” weakens rumination.',
        sources: ['Segal, Williams & Teasdale', 'PMC', 'NICE'],
        body: [
            'MBCT was developed by Zindel Segal, Mark Williams, and John Teasdale with support from Jon Kabat-Zinn. It combines mindfulness practice with cognitive therapy for relapse prevention.',
            'The core aim is to help a person notice mood deterioration earlier and stop fusing automatically with familiar depressive thought patterns. Mindfulness provides an observing position, while the cognitive component helps reshape the relationship to thoughts.',
            'Meta-analyses suggest that for people with three or more prior depressive episodes, MBCT can lower relapse risk meaningfully compared with usual care.',
            'The classic program lasts 8 weeks and includes group sessions, home practice, body scans, seated meditation, gentle yoga, and recognition of early warning signs.',
            'Key publications: Segal, Z.V., Williams, J.M.G., & Teasdale, J.D. (2002). Mindfulness-Based Cognitive Therapy for Depression; Teasdale, J.D. et al. (2000). Journal of Consulting and Clinical Psychology, 68, 615–623; Kabat-Zinn, J. (1990). Full Catastrophe Living.'
        ],
        bullets: [
            'Notice early mood shifts before a larger downturn.',
            'Practice short moments of mindfulness, not only long meditations.',
            'Train the stance that a thought is a mental event, not a fact.',
            'Bring attention back to the body and present moment when rumination starts.'
        ]
    },
    {
        kicker: 'Article 6',
        title: 'Sleep and Depression: A Two-Way Relationship',
        excerpt: 'Why insomnia may be both a symptom of depression and a factor that raises the risk of a new episode.',
        sources: ['Neuroscience Research', 'Journal of Clinical Sleep Medicine', 'PMC'],
        body: [
            'Sleep disturbances are among the most frequent symptoms of depression, but current evidence suggests the relationship works both ways. Depression often changes sleep architecture, while poor sleep itself worsens emotional regulation and stress load.',
            'Longitudinal research shows that insomnia is an independent risk factor for first and recurrent depressive episodes across age groups.',
            'This means sleep problems are not just background noise. They may be an early warning sign of worsening mental health.',
            'Systematic reviews also support a bidirectional link between insomnia, anxiety, and depression, with inflammation being one possible pathway.',
            'Key publications: Yasugaki, S. et al. (2023). Neuroscience Research, 211, 57–64; Fang, H. et al. (2019). J Clin Sleep Med, 15(3), 405–411; Baglioni, C. et al. (2011). J Affect Disord, 135(1-3), 10–19.'
        ],
        bullets: [
            'Keep bedtime and wake time as stable as possible.',
            'Remove screens for at least one hour before sleep.',
            'Treat insomnia as an important marker, not a trivial side issue.',
            'When insomnia and depression overlap, CBT-I is worth considering as a first-line treatment.'
        ]
    },
    {
        kicker: 'Article 7',
        title: 'Social Connection and Loneliness: Julianne Holt-Lunstad',
        excerpt: 'Why loneliness is linked not only to mood, but also to long-term depression risk and poorer health outcomes.',
        sources: ['World Psychiatry', 'Perspectives on Psychological Science', 'Harvard T.H. Chan School'],
        body: [
            'Julianne Holt-Lunstad, a professor of psychology and neuroscience at Brigham Young University, has done major work on how social isolation and loneliness affect mental and physical health.',
            'Current evidence shows a stable link between isolation, loneliness, and depression across the lifespan. Stronger and more meaningful social connection is associated with lower depressive risk.',
            'A 2024 review in World Psychiatry showed that people who often feel lonely have more than twice the risk of developing a new depression compared with those who rarely or never feel lonely.',
            'Her meta-analytic work also suggests that social isolation and loneliness are linked to higher mortality risk, while strong social ties improve survival odds.',
            'Key publications: Holt-Lunstad, J. (2024). World Psychiatry, 23(3), 312–332; Holt-Lunstad, J. et al. (2015). Perspectives on Psychological Science, 10(2), 227–237; US Surgeon General\'s Advisory (2023).'
        ],
        bullets: [
            'Keep regular contact with at least one close person.',
            'Look for group-based activities such as volunteering, hobbies, or sport.',
            'Focus on the quality of connection, not only the number of contacts.',
            'Treat isolation as a real risk factor rather than just a personality trait.'
        ]
    },
    {
        kicker: 'Article 8',
        title: 'Nutrition and Depression: The SMILES Trial',
        excerpt: 'How the first major randomized trial showed that improving diet can meaningfully reduce clinical depression symptoms.',
        sources: ['BMC Medicine', 'Food & Mood Centre'],
        body: [
            'Felice Jacka, a professor at Deakin University and founder of the Food & Mood Centre, became one of the leading researchers in nutritional psychiatry. The SMILES trial was the first randomized controlled study designed specifically to test whether improving diet could help treat clinical depression.',
            'Over 12 weeks, participants with moderate to severe depression received either support for a modified Mediterranean-style diet or social support. The diet-support group showed stronger symptom improvement, and some participants reached remission.',
            'The SMILES pattern emphasized vegetables, fruit, whole grains, legumes, nuts, olive oil, fish, and moderate lean meat, while reducing ultra-processed foods, sweets, and refined carbohydrates.',
            'An important result was that the people who improved their diet the most also showed the greatest drop in depressive symptoms.',
            'Key publications: Jacka, F.N. et al. (2017). BMC Medicine, 15, 23; Parletta, N. et al. (2019). Nutritional Neuroscience; Bayes, J. et al. (2022). American Journal of Clinical Nutrition.'
        ],
        bullets: [
            'Shift your diet toward vegetables, fruit, legumes, and whole grains.',
            'Use fish, nuts, and olive oil as a steadier base for meals.',
            'Reduce ultra-processed foods and excess sugar.',
            'See nutrition as one supportive part of treatment, not as magic.'
        ]
    },
    {
        kicker: 'Article 9',
        title: 'The Gut-Brain Axis and Depression: A New Scientific Frontier',
        excerpt: 'What current research suggests about microbiota, inflammation, neurotransmitters, and depressive symptoms.',
        sources: ['Nature Communications', 'University College Cork', 'Frontiers in Microbiology'],
        body: [
            'The microbiota-gut-brain axis has become one of the fastest-growing areas in depression research. Large cohort studies suggest links between gut microbial composition and the severity of depressive symptoms.',
            'Studies in major Dutch cohorts found associations between several microbial taxa and depressive symptoms. These organisms are involved in pathways related to glutamate, butyrate, serotonin, and GABA.',
            'John Cryan and colleagues showed that the microbiota of people with depression differs from that of healthy individuals. Experimental transfer studies also suggest downstream effects on behavior and tryptophan metabolism.',
            'This field is still developing, but it is already clear that the gut can influence the brain through immune, metabolic, and neurotransmitter pathways. Nutrition matters here as well because it affects both inflammation and microbial composition.',
            'Key publications: Radjabzadeh, D. et al. (2022). Nature Communications, 13, 7128; Cryan, J. & Dinan, T. (2012). Nature Reviews Neuroscience, 13, 701–712; Bizzozero-Peroni, B. et al. (2025).'
        ],
        bullets: [
            'Increase fiber intake through vegetables, legumes, and whole grains.',
            'Add fermented foods if they suit you.',
            'Limit ultra-processed foods and excess sugar.',
            'Think of probiotics as a possible add-on, not a replacement for treatment.'
        ]
    },
    {
        kicker: 'Article 10',
        title: 'Newer Treatments: Ketamine, TMS, and Digital Interventions',
        excerpt: 'A brief look at modern options for cases where standard treatment is not fast enough or not effective enough.',
        sources: ['NIMH', 'Clinical Pharmacology & Therapeutics', 'APA'],
        body: [
            'For treatment-resistant depression, when standard antidepressants do not help enough, newer options are available. One of the most visible examples is ketamine and its form esketamine, which can act within hours rather than weeks.',
            'Esketamine is FDA-approved for treatment-resistant depression as a nasal spray administered under medical supervision. It is not a home self-help strategy but a specialized intervention.',
            'Another important direction is neurostimulation, including transcranial magnetic stimulation. Research suggests these methods can be useful in severe depression and may produce fewer side effects than some older approaches.',
            'Digital interventions are also developing quickly, including online cognitive therapy programs, telehealth, and app-based support between sessions. They do not replace all care, but they can expand access and continuity.',
            'APA guidance emphasizes that depression treatment should be individualized. If medication response remains insufficient after about 6 to 8 weeks, the treatment plan should be reviewed with a clinician.',
            'Key publications: Raja, S.M. et al. (2024). Clinical Pharmacology & Therapeutics, 116(5), 1314–1324; APA Clinical Practice Guideline (2019); NIMH Brain Stimulation Therapies overview.'
        ],
        bullets: [
            'Discuss severe or treatment-resistant depression options only with a clinician.',
            'Do not wait for months without reassessing a treatment plan that is not helping.',
            'Use digital interventions as support, not as a complete replacement.',
            'Keep an individualized view: the same method will not fit everyone.'
        ]
    }
];

const ARTICLE_CATALOG_ZH = [
    {
        kicker: '文章 1',
        title: '什么是抑郁症——WHO 与 NIMH 的研究概览',
        excerpt: '对抑郁症的基础介绍，包括患病情况、风险因素、治疗路径以及实际可采取的支持措施。',
        sources: ['WHO', 'NIMH'],
        body: [
            '根据世界卫生组织（WHO）的资料，抑郁症仍然是全球最常见的精神障碍之一，大约影响全球 5.7% 的成年人，女性受到影响的比例高于男性。',
            'WHO 强调，抑郁症通常并不是由单一原因造成的，而是社会、心理和生物因素复杂相互作用的结果。在经历失去亲人、创伤或严重压力等困难生活事件后，风险可能会上升。',
            '美国国家精神卫生研究所（NIMH）指出，对于较轻的抑郁症状，心理治疗通常可以作为第一步。如果单独接受心理治疗效果不足，之后可能会加入药物治疗；对于中度或重度情况，药物治疗往往会更早纳入治疗方案。',
            'WHO 同时指出，对于轻度、中度和重度抑郁症，都存在有效的治疗方法。一些简短的心理干预甚至可以在高度专业化的心理治疗环境之外实施。',
            '主要参考资料：WHO《2013–2030 年综合精神卫生行动计划》；NIMH 抑郁症资料（NIH）；Global Burden of Disease Study 2021。'
        ],
        bullets: [
            '尽量每天安排至少 30 分钟身体活动，即使只是散步也可以。',
            '在现实可行的范围内，保持相对规律的睡眠和饮食。',
            '尽量保持与亲近的人联系，而不是长期把自己孤立起来。',
            '如果可能，减少或避免酒精、尼古丁以及非法药物。',
            '如果条件允许，可以把重大的人生决定推迟到自己的状态更加稳定之后。'
        ]
    },
    {
        kicker: '文章 2',
        title: '抑郁症的认知疗法——Aaron Beck 的重要贡献',
        excerpt: '了解 Aaron Beck 如何奠定认知行为疗法的基础，以及处理自动化思维为什么可能改变抑郁症状的发展过程。',
        sources: ['Beck Institute', 'PMC', 'StatPearls'],
        body: [
            'Aaron T. Beck 是美国精神科医生、宾夕法尼亚大学教授，被广泛认为是认知疗法的重要奠基者。20 世纪 60 年代，他发展出后来逐渐形成认知行为疗法（CBT）的治疗方法。',
            '在与抑郁患者工作的过程中，Beck 注意到，关于失去、失败和个人能力不足的持续负面信念，往往隐藏在情绪痛苦背后。这些信念常常通过自动化思维表现出来，而这些想法出现得很快，也很容易被当成事实。',
            'Beck 的一个重要理论是“抑郁认知三联征”：对自己、对世界以及对未来持负面的看法。当一个人的经历长期通过这三个角度进行解释时，情绪和行为可能进一步维持抑郁循环。',
            '1977 年发表的一项重要临床研究将认知疗法与抗抑郁药物进行了比较，这项研究帮助推动了认知疗法作为循证谈话治疗方式的发展。',
            '主要参考资料：Beck, A.T. 等（1979），Cognitive Therapy of Depression；Rush, A.J., Beck, A.T. 等（1977），Cognitive Therapy and Research, 1, 17–37。'
        ],
        bullets: [
            '留意自动出现的负面想法，而不是立刻把它们当作事实。',
            '尝试分别寻找支持和反对某个想法的证据。',
            '注意灾难化、过度概括、读心术等常见认知偏差。',
            '尝试用更加平衡的替代想法，代替过于严厉或绝对化的结论。'
        ]
    },
    {
        kicker: '文章 3',
        title: '习得性无助与“习得性乐观”——Martin Seligman',
        excerpt: '为什么“无论我做什么都没有用”的感觉与抑郁有关，以及更加现实的解释方式可能带来什么帮助。',
        sources: ['PMC', 'Positive Psychology Center'],
        body: [
            'Martin Seligman 和 Steven Maier 在 1967 年提出了“习得性无助”现象。他们发现，当一个人或动物反复经历无法控制的负面事件时，可能逐渐形成“自己的行动不会产生任何改变”的认知。',
            'Seligman 曾把习得性无助视为研究临床抑郁的一种实验模型。研究中一个重要因素，是一个人如何向自己解释负面事件。',
            '悲观的解释方式往往会把挫折看成永久性的、完全由自己造成的，并且会影响生活的所有方面；更加乐观而现实的解释方式，则倾向于把问题看成暂时的、有限的，并且不会用一次失败定义整个人。这种解释方式的变化可能降低对抑郁的易感性。',
            '在《Learned Optimism》中，Seligman 将这一理念进一步发展为实际方法，并使用 ABC 模型：Adversity（逆境）、Belief（信念）、Consequence（结果）。',
            '主要参考资料：Seligman, M.E.P. & Maier, S.F.（1967），Journal of Experimental Psychology, 74, 1–9；Seligman, M.E.P.（1990），Learned Optimism；Abramson, L.Y., Seligman, M.E.P. & Teasdale, J.D.（1978），Reformulated Learned Helplessness。'
        ],
        bullets: [
            '留意自己通常怎样解释失败和挫折。',
            '问问自己：这件事真的意味着“永远如此、所有事情都如此，而且完全是我的问题”吗？',
            '尝试寻找更加有限、具体而现实的解释。',
            '把一次不愉快的事件，与对自己整体价值的评价区分开来。'
        ]
    },
    {
        kicker: '文章 4',
        title: '身体活动与抑郁——大型荟萃分析告诉了我们什么',
        excerpt: '大型研究显示，步行、慢跑、瑜伽和力量训练都可能帮助减少抑郁症状。',
        sources: ['JAMA Psychiatry', 'BMJ', 'American Journal of Psychiatry'],
        body: [
            'Pearce 等人在 JAMA Psychiatry 发表的荟萃分析纳入了 15 项前瞻性研究，总随访时间超过 200 万人年。达到推荐身体活动量的人，与缺乏活动的人相比，之后出现抑郁的风险大约低 25%。',
            '即使只达到推荐活动量的一半，也与有意义的益处相关。这一点很重要，因为开始运动并不要求从第一天就建立所谓“完美”的运动计划。',
            'Noetel 等人在 2024 年 BMJ 发表的网络荟萃分析发现，与常规照护相比，步行、慢跑、瑜伽以及力量训练都与抑郁症状中等程度的下降有关。',
            '可能的作用机制包括促进神经发生、影响海马功能、调节炎症，以及影响人体自身的压力调节系统。',
            '主要参考资料：Pearce, M. 等（2022），JAMA Psychiatry, 79(6), 550–559；Noetel, M. 等（2024），BMJ, 384, e075847；Schuch, F.B. 等（2018），American Journal of Psychiatry, 175(7), 631–648。'
        ],
        bullets: [
            '从小量活动开始，即使每天只散步 15 分钟也有意义。',
            '逐渐增加到每周大约 150 分钟中等强度活动。',
            '选择一种自己能够长期承受、甚至愿意进行的运动方式。',
            '把运动看作自我照护的一部分，而不是对意志力的考试。'
        ]
    },
    {
        kicker: '文章 5',
        title: '正念认知疗法（MBCT）与抑郁复发预防',
        excerpt: '为什么 MBCT 可能降低复发风险，以及“想法并不等于事实”这一理念如何帮助减少反刍思维。',
        sources: ['Segal, Williams & Teasdale', 'PMC', 'NICE'],
        body: [
            '正念认知疗法（MBCT）由 Zindel Segal、Mark Williams 和 John Teasdale 在 Jon Kabat-Zinn 的支持下发展而来。它把正念练习与认知疗法结合起来，主要用于帮助预防抑郁复发。',
            '它的核心目标之一，是帮助一个人更早觉察情绪状态的变化，并减少自动陷入熟悉的抑郁性思维模式。正念提供一种“观察者”的位置，而认知部分则帮助重新调整人与自身想法之间的关系。',
            '荟萃分析显示，对于过去经历过三次或更多抑郁发作的人，与常规照护相比，MBCT 可能有意义地降低再次复发的风险。',
            '经典 MBCT 项目通常持续 8 周，包括小组课程、家庭练习、身体扫描、坐姿冥想、温和瑜伽，以及学习识别情绪恶化的早期信号。',
            '主要参考资料：Segal, Z.V., Williams, J.M.G., & Teasdale, J.D.（2002），Mindfulness-Based Cognitive Therapy for Depression；Teasdale, J.D. 等（2000），Journal of Consulting and Clinical Psychology, 68, 615–623；Kabat-Zinn, J.（1990），Full Catastrophe Living。'
        ],
        bullets: [
            '在情绪明显下降之前，尽量识别较早出现的变化信号。',
            '练习短暂的正念时刻，而不一定只进行长时间冥想。',
            '训练这样的观察角度：一个想法只是心理活动，并不自动等于事实。',
            '当反刍开始时，把注意力重新带回身体和当前时刻。'
        ]
    },
    {
        kicker: '文章 6',
        title: '睡眠与抑郁——双向关系',
        excerpt: '为什么失眠既可能是抑郁的一种表现，也可能增加之后出现抑郁发作的风险。',
        sources: ['Neuroscience Research', 'Journal of Clinical Sleep Medicine', 'PMC'],
        body: [
            '睡眠问题是抑郁中非常常见的症状之一，但目前的证据显示，这种关系可能是双向的。抑郁可能改变睡眠结构，而睡眠不足本身也可能削弱情绪调节能力并增加身体和心理压力。',
            '纵向研究显示，在不同年龄群体中，失眠都是首次出现以及再次出现抑郁发作的独立风险因素之一。',
            '这意味着睡眠问题并不只是无关紧要的背景现象，它有时可能成为心理状态发生变化的早期警示信号。',
            '系统综述同样支持失眠、焦虑和抑郁之间存在双向联系，而炎症反应可能是其中一种潜在机制。',
            '主要参考资料：Yasugaki, S. 等（2023），Neuroscience Research, 211, 57–64；Fang, H. 等（2019），J Clin Sleep Med, 15(3), 405–411；Baglioni, C. 等（2011），J Affect Disord, 135(1-3), 10–19。'
        ],
        bullets: [
            '尽可能保持相对稳定的入睡和起床时间。',
            '睡前至少一小时尽量减少屏幕使用。',
            '把持续失眠视为一个值得关注的信号，而不是无关紧要的小问题。',
            '当失眠与抑郁同时存在时，可以与专业人士讨论 CBT-I（失眠认知行为疗法）等一线干预方式。'
        ]
    },
    {
        kicker: '文章 7',
        title: '社会联系与孤独感——Julianne Holt-Lunstad 的研究',
        excerpt: '为什么孤独不仅与情绪有关，也可能与长期抑郁风险和身体健康结果相关。',
        sources: ['World Psychiatry', 'Perspectives on Psychological Science', 'Harvard T.H. Chan School'],
        body: [
            'Julianne Holt-Lunstad 是 Brigham Young University 的心理学与神经科学教授，她长期研究社会隔离和孤独感如何影响心理与身体健康。',
            '现有研究显示，在不同年龄阶段，社会隔离、孤独感与抑郁之间存在稳定关联。更强、更有意义的社会联系通常与较低的抑郁风险相关。',
            'World Psychiatry 在 2024 年发表的一篇综述显示，经常感到孤独的人，与很少或从不感到孤独的人相比，之后出现新的抑郁问题的风险超过两倍。',
            'Holt-Lunstad 的荟萃分析研究还显示，社会隔离与孤独感和更高的死亡风险相关，而稳定、良好的社会联系则与更好的长期健康结果有关。',
            '主要参考资料：Holt-Lunstad, J.（2024），World Psychiatry, 23(3), 312–332；Holt-Lunstad, J. 等（2015），Perspectives on Psychological Science, 10(2), 227–237；US Surgeon General Advisory（2023）。'
        ],
        bullets: [
            '尽量与至少一位亲近的人保持规律联系。',
            '寻找具有群体参与性质的活动，例如志愿服务、兴趣爱好或体育活动。',
            '更多关注关系的质量，而不仅仅是联系人数量。',
            '把长期社会隔离视为值得关注的健康风险因素，而不只是性格特点。'
        ]
    },
    {
        kicker: '文章 8',
        title: '饮食与抑郁——SMILES 随机对照试验',
        excerpt: '这项重要随机试验探索了改善饮食结构是否能够帮助减轻临床抑郁症状。',
        sources: ['BMC Medicine', 'Food & Mood Centre'],
        body: [
            'Deakin University 教授、Food & Mood Centre 创始人 Felice Jacka 是营养精神病学领域的重要研究者之一。SMILES 是首批专门用于研究改善饮食是否能够帮助治疗临床抑郁的随机对照试验。',
            '在 12 周研究期间，中度到重度抑郁参与者分别接受改良地中海式饮食支持或社会支持。接受饮食支持的一组整体症状改善更加明显，其中部分参与者达到了缓解状态。',
            'SMILES 所采用的饮食模式强调蔬菜、水果、全谷物、豆类、坚果、橄榄油、鱼类以及适量瘦肉，同时减少超加工食品、甜食和精制碳水化合物。',
            '研究中的一个重要结果是，饮食改善幅度最大的人，抑郁症状下降的程度也更明显。',
            '主要参考资料：Jacka, F.N. 等（2017），BMC Medicine, 15, 23；Parletta, N. 等（2019），Nutritional Neuroscience；Bayes, J. 等（2022），American Journal of Clinical Nutrition。'
        ],
        bullets: [
            '逐渐增加蔬菜、水果、豆类和全谷物在饮食中的比例。',
            '适当加入鱼类、坚果和橄榄油等食物。',
            '减少超加工食品以及过量添加糖。',
            '把饮食看作治疗与自我照护中的辅助因素，而不是所谓“神奇解决方案”。'
        ]
    },
    {
        kicker: '文章 9',
        title: '“肠道—大脑轴”与抑郁——正在发展的研究领域',
        excerpt: '目前的研究如何理解肠道菌群、炎症、神经递质以及抑郁症状之间可能存在的联系。',
        sources: ['Nature Communications', 'University College Cork', 'Frontiers in Microbiology'],
        body: [
            '“微生物群—肠道—大脑轴”已经成为抑郁研究中发展非常迅速的方向之一。大型队列研究显示，肠道微生物组成可能与抑郁症状严重程度之间存在关联。',
            '一些基于荷兰大型队列的研究发现，多个微生物分类群与抑郁症状存在统计关联。这些微生物涉及谷氨酸、丁酸、血清素以及 GABA 等相关代谢通路。',
            'John Cryan 及其同事的研究发现，抑郁人群的肠道微生物群与健康人群存在一定差异。实验性的微生物移植研究也提示，它可能进一步影响行为以及色氨酸代谢。',
            '这一研究领域仍然处于发展过程中，但目前已经有证据显示，肠道可能通过免疫、代谢以及神经递质相关通路影响大脑。饮食在其中同样重要，因为它既可能影响炎症，也会影响肠道微生物组成。',
            '主要参考资料：Radjabzadeh, D. 等（2022），Nature Communications, 13, 7128；Cryan, J. & Dinan, T.（2012），Nature Reviews Neuroscience, 13, 701–712；Bizzozero-Peroni, B. 等（2025）。'
        ],
        bullets: [
            '通过蔬菜、豆类和全谷物增加膳食纤维摄入。',
            '如果自己的身体能够适应，可以适当加入发酵食品。',
            '减少超加工食品以及过量糖分。',
            '把益生菌看作可能的辅助方式，而不是替代主要治疗的方法。'
        ]
    },
    {
        kicker: '文章 10',
        title: '较新的治疗方式——氯胺酮、TMS 与数字干预',
        excerpt: '了解在标准治疗起效不足或效果有限时，目前已经应用或正在发展的部分现代治疗方式。',
        sources: ['NIMH', 'Clinical Pharmacology & Therapeutics', 'APA'],
        body: [
            '对于治疗抵抗性抑郁，也就是常规抗抑郁药物效果不足的情况，目前存在一些较新的治疗选择。其中较受关注的是氯胺酮及其衍生形式艾司氯胺酮，它们可能在数小时内产生作用，而不是像部分传统药物那样需要数周。',
            '艾司氯胺酮已经获得美国 FDA 批准，可用于治疗抵抗性抑郁，并以鼻喷剂形式在医疗专业人员监督下使用。它并不是一种可以自行在家使用的自助治疗方式，而属于专业医疗干预。',
            '另一个重要方向是神经刺激技术，包括经颅磁刺激（TMS）。研究显示，这类方法可能对部分重度抑郁患者有帮助，并且在某些情况下可能比部分较早的治疗方式产生更少的副作用。',
            '数字化心理干预也在快速发展，例如在线认知治疗项目、远程医疗以及在治疗间隔期间使用的应用程序支持。这些方式不能替代所有专业治疗，但可能帮助提高心理服务的可及性与连续性。',
            'APA 的相关指导强调，抑郁治疗需要根据个人情况制定。如果药物治疗大约 6 到 8 周后仍然效果不足，应与专业人员重新评估当前治疗方案。',
            '主要参考资料：Raja, S.M. 等（2024），Clinical Pharmacology & Therapeutics, 116(5), 1314–1324；APA Clinical Practice Guideline（2019）；NIMH Brain Stimulation Therapies overview。'
        ],
        bullets: [
            '涉及重度或治疗抵抗性抑郁的治疗选择，应与专业医疗人员讨论。',
            '如果当前治疗长期没有帮助，不要数月都不重新评估治疗方案。',
            '把数字化干预视为专业治疗的辅助方式，而不是完全替代。',
            '保持个体化视角：同一种治疗方法并不一定适合所有人。'
        ]
    }
];

function getArticleCatalog() {
    const lang = getCurrentLanguage();

    if (lang === 'zh') {
        return ARTICLE_CATALOG_ZH;
    }

    if (lang === 'en') {
        return ARTICLE_CATALOG_EN;
    }

    return ARTICLE_CATALOG;
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function openArticleLibrary() {
    renderArticleList();
    document.getElementById('articleListContainer').style.display = 'block';
    document.getElementById('articleReaderContainer').style.display = 'none';
    openModal('articleModal');
}
window.openArticleLibrary = openArticleLibrary;

function closeArticleLibraryModal() {
    closeArticleReader();
    closeModal('articleModal');
}
window.closeArticleLibraryModal = closeArticleLibraryModal;

function renderArticleList() {
    const grid = document.getElementById('articleListGrid');
    if (!grid) return;
    const catalog = getArticleCatalog();

    let html = '';
    catalog.forEach((article, index) => {
        html += `
            <div class="article-card" onclick="openArticleReader(${index})">
                <div class="article-card-kicker">${escapeHtml(article.kicker)}</div>
                <div class="article-card-title">${escapeHtml(article.title)}</div>
                <div class="article-card-excerpt">${escapeHtml(article.excerpt)}</div>
                <div class="article-card-sources">
                    ${article.sources.map(source => `<span class="article-source-chip">${escapeHtml(source)}</span>`).join('')}
                </div>
            </div>
        `;
    });

    grid.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
}

function openArticleReader(index) {
    const article = getArticleCatalog()[index];
    if (!article) return;
    window._articleReaderIndex = index;

    document.getElementById('articleListContainer').style.display = 'none';
    document.getElementById('articleReaderContainer').style.display = 'block';
    document.getElementById('articleReaderKicker').innerText = article.kicker;
    document.getElementById('articleReaderTitle').innerText = article.title;
    document.getElementById('articleReaderSources').innerHTML = article.sources
        .map(source => `<span class="article-source-chip">${escapeHtml(source)}</span>`)
        .join('');

    let bodyHtml = article.body.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('');
    if (article.bullets && article.bullets.length) {
        bodyHtml += `<ul>${article.bullets.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
    }
    document.getElementById('articleReaderBody').innerHTML = bodyHtml;

    if (window.lucide) window.lucide.createIcons();
}
window.openArticleReader = openArticleReader;

function closeArticleReader() {
    const list = document.getElementById('articleListContainer');
    const reader = document.getElementById('articleReaderContainer');
    if (list) list.style.display = 'block';
    if (reader) reader.style.display = 'none';
    window._articleReaderIndex = null;
}
window.closeArticleReader = closeArticleReader;

// --- Video Library ---
const VIDEO_CATALOG = [
    { title: 'Почему вас мучает тревога?', title_en: 'Why Anxiety Feels So Overwhelming', author: 'Правое полушарие Интроверта', id: 'WB662esfVpk', duration: '12:18' },
    { title: 'КПТ самостоятельно! | Как работает терапия', title_en: 'CBT on Your Own: How Therapy Works', author: 'Психолог Шастин Егор', id: 'sfRyNk0oouE', duration: '20:53' },
    { title: 'Что такое КПТ? (ABC модель)', title_en: 'What CBT Is (ABC Model)', author: 'ПостПсихология', id: 'rm0tH1oVIXg', duration: '46:23' },
    { title: 'Релаксация по Джекобсону (Практика)', title_en: 'Jacobson Relaxation (Practice)', author: 'Александр Усольцев', id: '_4XzfyFxDTg', duration: '6:00' },
    { title: 'Тревога vs Тревожность (Научпок)', title_en: 'Anxiety vs Anxiousness', author: 'Научпок', id: 'TTCVrYONffw', duration: '6:00' },
    { title: 'Психотерапия при панических атаках', title_en: 'Psychotherapy for Panic Attacks', author: 'Клиника Доктор САН', id: 'Hh-pud7_Uug', duration: '16:12' },
    { title: 'Медитация осознанности Mindfulness', title_en: 'Mindfulness Meditation', author: 'toki well-being', id: 'Juo-8PtSaLI', duration: '12:36' },
    { title: 'Техники против катастрофизации', title_en: 'Techniques Against Catastrophizing', author: 'initium - психологи', id: 'WDTl4qtw94Q', duration: '16:41' }
];

const VIDEO_CATALOG_EN = [
    { title: 'What Is Depression?', author: 'TED-Ed', id: 'z-IR48Mb3W0', duration: '4:29' },
    { title: 'How Does Cognitive Behavioral Therapy Work?', author: 'Psych Hub', id: 'ZdyOwZ4_RnI', duration: '4:55' },
    { title: 'ABC Model of Cognitive Behavioral Therapy', author: 'Therapist Aid', id: 'WRRdSm4ZjX4', duration: '3:52' },
    { title: 'What Is Anxiety Really?', author: 'Therapy in a Nutshell', id: 'db3K8b3ftaY', duration: '12:00' },
    { title: 'How to Stop a Panic Attack: The Anti-Struggle Technique', author: 'Therapy in a Nutshell', id: '2CQpyA485wc', duration: '8:15' },
    { title: 'Progressive Muscle Relaxation: An Essential Anxiety Skill', author: 'Therapy in a Nutshell', id: 'SNqYG95j_UQ', duration: '9:05' },
    { title: '20 Minute Guided Meditation for Reducing Anxiety and Stress', author: 'The Mindful Movement', id: 'MIr3RsUWrdo', duration: '20:16' },
    { title: 'Catastrophizing: How to Stop Making Yourself More Anxious', author: 'Therapy in a Nutshell', id: 'bS2LPNlO07s', duration: '17:22' }
];

const VIDEO_CATALOG_ZH = [
    {
        title: '什么是抑郁症？',
        author: 'TED-Ed',
        id: 'z-IR48Mb3W0',
        duration: '4:29'
    },
    {
        title: '认知行为疗法（CBT）是如何起作用的？',
        author: 'Psych Hub',
        id: 'ZdyOwZ4_RnI',
        duration: '4:55'
    },
    {
        title: '认知行为疗法中的 ABC 模型',
        author: 'Therapist Aid',
        id: 'WRRdSm4ZjX4',
        duration: '3:52'
    },
    {
        title: '焦虑究竟是什么？',
        author: 'Therapy in a Nutshell',
        id: 'db3K8b3ftaY',
        duration: '12:00'
    },
    {
        title: '如何应对惊恐发作：停止对抗技巧',
        author: 'Therapy in a Nutshell',
        id: '2CQpyA485wc',
        duration: '8:15'
    },
    {
        title: '渐进式肌肉放松：缓解焦虑的基础技巧',
        author: 'Therapy in a Nutshell',
        id: 'SNqYG95j_UQ',
        duration: '9:05'
    },
    {
        title: '20分钟引导冥想：缓解焦虑与压力',
        author: 'The Mindful Movement',
        id: 'MIr3RsUWrdo',
        duration: '20:16'
    },
    {
        title: '灾难化思维：如何减少越想越焦虑',
        author: 'Therapy in a Nutshell',
        id: 'bS2LPNlO07s',
        duration: '17:22'
    }
];

function getVideoCatalog() {
    const lang = getCurrentLanguage();

    if (lang === 'zh') {
        return VIDEO_CATALOG_ZH;
    }

    if (lang === 'en') {
        return VIDEO_CATALOG_EN;
    }

    return VIDEO_CATALOG;
}

function openVideoLibrary() {
    renderVideoList();
    document.getElementById('videoListContainer').style.display = 'block';
    document.getElementById('videoPlayerContainer').style.display = 'none';
    document.getElementById('videoIframe').src = '';

    // Open the modal explicitly
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}
window.openVideoLibrary = openVideoLibrary;

function closeVideoLibraryModal() {
    closeModal('videoModal');
    document.getElementById('videoIframe').src = '';
}
window.closeVideoLibraryModal = closeVideoLibraryModal;

function renderVideoList() {
    const grid = document.getElementById('videoListGrid');
    if (!grid) return;

    let html = '';
    getVideoCatalog().forEach(vid => {
        // Use i.ytimg.com as it often bypasses local file restrictions better than img.youtube.com
        let thumbUrl = `https://i.ytimg.com/vi/${vid.id}/mqdefault.jpg`;
        html += `
            <div onclick="playVideo('${vid.id}')" style="display:flex; gap:16px; background:var(--bg); border:1px solid var(--border); border-radius:12px; padding:12px; cursor:pointer; transition:all 0.2s; align-items:center;" onmouseover="this.style.borderColor='var(--gray)'" onmouseout="this.style.borderColor='var(--border)'">
                <div style="position:relative; width:120px; height:70px; border-radius:8px; overflow:hidden; flex-shrink:0; background:var(--panel); display:flex; align-items:center; justify-content:center;">
                    <img src="${thumbUrl}" style="width:100%; height:100%; object-fit:cover; opacity:0.8; transition: opacity 0.3s;" onerror="this.style.opacity='0';">
                    <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.2);">
                        <i data-lucide="play" style="width:24px; color:rgba(255,255,255,0.8); fill:rgba(255,255,255,0.2);"></i>
                    </div>
                </div>
                <div style="flex:1; min-width:0;">
                    <div style="font-size:14px; font-weight:600; color:var(--text); margin-bottom:6px; line-height:1.4; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${vid.title}</div>
                    <div style="display:flex; align-items:center; gap:12px; font-size:12px; color:var(--gray);">
                        <span style="display:flex; align-items:center; gap:4px;"><i data-lucide="user" style="width:12px; opacity:0.6;"></i> ${vid.author}</span>
                        <span style="display:flex; align-items:center; gap:4px;"><i data-lucide="clock" style="width:12px; opacity:0.6;"></i> ${vid.duration}</span>
                    </div>
                </div>
            </div>
        `;
    });
    grid.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
}

function playVideo(youtubeId) {
    document.getElementById('videoListContainer').style.display = 'none';
    const playerContainer = document.getElementById('videoPlayerContainer');
    playerContainer.style.display = 'block';
    const iframe = document.getElementById('videoIframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&origin=${window.location.origin}`;
}
window.playVideo = playVideo;

function closeVideoPlayer() {
    document.getElementById('videoListContainer').style.display = 'block';
    document.getElementById('videoPlayerContainer').style.display = 'none';
    document.getElementById('videoIframe').src = '';
}
window.closeVideoPlayer = closeVideoPlayer;
