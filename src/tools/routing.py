FORCED_TOOL_ROUTES = (
    ("get_user_sleep_history", ("睡眠", "睡觉", "睡得", "睡了", "失眠")),
    ("get_user_test_results", ("测试", "phq", "gad", "焦虑", "抑郁")),
    ("get_user_activities", ("计划", "任务", "活动")),
)

ACTIVITY_ACTION_KEYWORDS = ("添加", "新增", "加一个", "加入", "创建", "安排")
TEST_RECOMMENDATION_KEYWORDS = ("什么测试", "哪个测试", "哪种测试", "推荐", "应该做")
KNOWLEDGE_QUESTION_KEYWORDS = (
    "什么是",
    "是什么",
    "为什么",
    "为何",
    "解释",
    "介绍",
    "含义",
    "原理",
    "why",
    "how does",
)
PERSONAL_DATA_KEYWORDS = ("我的", "我最近", "结果", "分数", "得分", "记录")


def select_forced_tool(user_message: str) -> str | None:
    normalized = (user_message or "").lower()

    # A definition such as "什么是 GAD-7" belongs to the knowledge path. A
    # personal score/history request still takes the forced SQLite Tool path.
    if any(keyword in normalized for keyword in KNOWLEDGE_QUESTION_KEYWORDS) and not any(
        keyword in normalized for keyword in PERSONAL_DATA_KEYWORDS
    ):
        return None

    # Action requests must stay on automatic selection so DeepSeek can call the
    # corresponding action Tool. Data-reading requests keep the forced routes below.
    if "活动" in normalized and any(
        keyword in normalized for keyword in ACTIVITY_ACTION_KEYWORDS
    ):
        return None
    if "测试" in normalized and any(
        keyword in normalized for keyword in TEST_RECOMMENDATION_KEYWORDS
    ):
        return None

    for tool_name, keywords in FORCED_TOOL_ROUTES:
        if any(keyword in normalized for keyword in keywords):
            return tool_name
    return None
