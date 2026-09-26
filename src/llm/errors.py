class LLMError(RuntimeError):
    """A provider-neutral error safe to return through the chat API."""

    def __init__(
        self,
        kind: str,
        user_message: str,
        status_code: int = 503,
        retryable: bool = False,
    ):
        super().__init__(user_message)
        self.kind = kind
        self.user_message = user_message
        self.status_code = status_code
        self.retryable = retryable
