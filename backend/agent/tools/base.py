from __future__ import annotations

from typing import Any, Literal, Protocol

from pydantic import BaseModel, Field


class ToolResult(BaseModel):
    status: Literal["ok", "not_implemented", "error"]
    tool: str
    message: str
    data: dict[str, Any] = Field(default_factory=dict)


class Tool(Protocol):
    name: str
    description: str
    phase_ready: int

    def run(self, **kwargs: Any) -> ToolResult: ...


class ToolRegistry:
    def __init__(self) -> None:
        self._tools: dict[str, Tool] = {}

    def register(self, tool: Tool) -> None:
        self._tools[tool.name] = tool

    def get(self, name: str) -> Tool | None:
        return self._tools.get(name)

    def names(self) -> list[str]:
        return list(self._tools.keys())

    def run(self, name: str, **kwargs: Any) -> ToolResult:
        tool = self._tools.get(name)
        if tool is None:
            return ToolResult(
                status="error",
                tool=name,
                message=f"Unknown tool '{name}'.",
            )
        return tool.run(**kwargs)
