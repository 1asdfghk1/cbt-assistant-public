import inspect
import json
import logging
import time
from copy import deepcopy
from dataclasses import dataclass, field
from typing import Awaitable, Callable

from .context import ToolContext, ToolOutput


logger = logging.getLogger(__name__)
ToolHandler = Callable[[dict, ToolContext], Awaitable[ToolOutput] | ToolOutput]


@dataclass(frozen=True)
class ToolDefinition:
    name: str
    description: str
    parameters: dict
    handler: ToolHandler = field(repr=False, compare=False)

    def to_schema(self) -> dict:
        return {
            "type": "function",
            "function": {
                "name": self.name,
                "description": self.description,
                "parameters": deepcopy(self.parameters),
            },
        }


@dataclass(frozen=True)
class ToolError:
    type: str
    message: str


@dataclass(frozen=True)
class ToolExecutionResult:
    ok: bool
    content: str
    client_events: tuple[dict, ...] = field(default_factory=tuple)
    error: ToolError | None = None


class ToolRegistry:
    def __init__(self, definitions=()):
        self._definitions: dict[str, ToolDefinition] = {}
        for definition in definitions:
            self.register(definition)

    def register(self, definition: ToolDefinition) -> None:
        if definition.name in self._definitions:
            raise ValueError(f"tool already registered: {definition.name}")
        self._definitions[definition.name] = definition

    def has_tool(self, name: str) -> bool:
        return name in self._definitions

    def get_definition(self, name: str) -> ToolDefinition | None:
        """Return a registered definition without exposing the mutable registry."""
        return self._definitions.get(name)

    def get_schemas(self) -> list[dict]:
        return [definition.to_schema() for definition in self._definitions.values()]

    @property
    def registered_names(self) -> tuple[str, ...]:
        return tuple(self._definitions)

    async def execute(
        self,
        name: str,
        arguments,
        context: ToolContext,
    ) -> ToolExecutionResult:
        started_at = time.monotonic()
        definition = self._definitions.get(name)
        if definition is None:
            return self._failure(
                name,
                "unknown_tool",
                "The requested tool is not available.",
                context,
                started_at,
            )

        try:
            parsed_arguments = self._parse_arguments(arguments)
            self._validate_arguments(parsed_arguments, definition.parameters)
        except (json.JSONDecodeError, TypeError, ValueError):
            return self._failure(
                name,
                "invalid_arguments",
                "The tool arguments were invalid.",
                context,
                started_at,
            )

        try:
            output = definition.handler(parsed_arguments, context)
            if inspect.isawaitable(output):
                output = await output
            if not isinstance(output, ToolOutput):
                raise TypeError("tool handler must return ToolOutput")
        except Exception as error:
            return self._failure(
                name,
                "tool_execution_error",
                "The tool is temporarily unavailable.",
                context,
                started_at,
                technical_error_type=type(error).__name__,
            )

        logger.info(
            "tool_execution_completed request_id=%s model=%s tool_name=%s "
            "status=success elapsed_ms=%s",
            context.request_id,
            context.model,
            name,
            round((time.monotonic() - started_at) * 1000),
        )
        return ToolExecutionResult(
            ok=True,
            content=output.content,
            client_events=output.client_events,
        )

    @staticmethod
    def _parse_arguments(arguments) -> dict:
        if arguments is None or arguments == "":
            return {}
        if isinstance(arguments, str):
            parsed = json.loads(arguments)
        elif isinstance(arguments, dict):
            parsed = dict(arguments)
        else:
            raise TypeError("tool arguments must be JSON or an object")
        if not isinstance(parsed, dict):
            raise ValueError("tool arguments must be an object")
        return parsed

    @classmethod
    def _validate_arguments(cls, arguments: dict, schema: dict) -> None:
        for required_name in schema.get("required", []):
            if required_name not in arguments:
                raise ValueError(f"missing required argument: {required_name}")

        for name, value in arguments.items():
            property_schema = schema.get("properties", {}).get(name)
            if property_schema:
                cls._validate_value(name, value, property_schema)

    @staticmethod
    def _validate_value(name: str, value, schema: dict) -> None:
        expected_type = schema.get("type")
        if expected_type == "integer" and (
            not isinstance(value, int) or isinstance(value, bool)
        ):
            raise TypeError(f"{name} must be an integer")
        if expected_type == "string" and not isinstance(value, str):
            raise TypeError(f"{name} must be a string")

        if "minimum" in schema and value < schema["minimum"]:
            raise ValueError(f"{name} is below the minimum")
        if "maximum" in schema and value > schema["maximum"]:
            raise ValueError(f"{name} exceeds the maximum")
        if "enum" in schema and value not in schema["enum"]:
            raise ValueError(f"{name} is not an allowed value")

    @staticmethod
    def _failure(
        name: str,
        error_type: str,
        safe_message: str,
        context: ToolContext,
        started_at: float,
        technical_error_type: str | None = None,
    ) -> ToolExecutionResult:
        logger.warning(
            "tool_execution_completed request_id=%s model=%s tool_name=%s "
            "status=failure error_type=%s elapsed_ms=%s",
            context.request_id,
            context.model,
            name or "unknown",
            technical_error_type or error_type,
            round((time.monotonic() - started_at) * 1000),
        )
        error = ToolError(type=error_type, message=safe_message)
        content = json.dumps(
            {
                "ok": False,
                "error": {"type": error.type, "message": error.message},
            },
            ensure_ascii=False,
        )
        return ToolExecutionResult(ok=False, content=content, error=error)
