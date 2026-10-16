from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, Field


class AgentChatRequest(BaseModel):
    message: str = Field(..., min_length=1, description="User message in natural language.")
    conversation_id: str | None = Field(
        default=None,
        description="Existing conversation id. Omit to start a new conversation.",
    )
    context: dict[str, Any] = Field(default_factory=dict)


class ToolActivityItem(BaseModel):
    tool: str
    status: Literal["ok", "not_implemented", "error", "skipped"]
    summary: str


class AgentSource(BaseModel):
    title: str | None = None
    url: str | None = None
    source: str | None = None
    published_at: str | None = None


class AgentStory(BaseModel):
    title: str
    source_count: int | None = None
    sources: list[AgentSource] = Field(default_factory=list)


class VerificationAssessment(BaseModel):
    verdict: str | None = None
    evidence_strength: str | None = None
    claim: str | None = None
    supporting_evidence: list[str] = Field(default_factory=list)
    contradicting_evidence: list[str] = Field(default_factory=list)
    sources_checked: list[AgentSource] = Field(default_factory=list)
    explanation: str | None = None
    is_assessment: bool = True


class AgentChatResponse(BaseModel):
    answer: str
    conversation_id: str
    sources: list[AgentSource] = Field(default_factory=list)
    stories: list[AgentStory] = Field(default_factory=list)
    verification: VerificationAssessment | dict[str, Any] | None = None
    clusters: list[dict[str, Any]] = Field(default_factory=list)
    tool_activity: list[ToolActivityItem] = Field(default_factory=list)
    metadata: dict[str, Any] = Field(default_factory=dict)


class ConversationMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str
