from __future__ import annotations

from typing import Any

from .config import AGENT_PHASE
from .llm import get_llm_client, llm_status
from .memory import ConversationStore, get_conversation_store
from .schemas import AgentChatRequest, AgentChatResponse, ToolActivityItem
from .tools import ToolRegistry, build_default_registry
from .tools.base import ToolResult


_NEWS_HINTS = (
    "news",
    "headline",
    "happening",
    "happened",
    "today",
    "yesterday",
    "this week",
    "latest",
    "breaking",
    "in india",
    "in delhi",
    "election",
)
_VERIFY_HINTS = ("verify", "fake", "true", "false", "trustworthy", "claim", "disinfo")
_SIMILAR_HINTS = ("similar", "related stor")
_TREND_HINTS = ("trend", "biggest", "changed since", "what changed")
_ANALYZE_HINTS = ("summarize", "analyze this", "classify", "cluster")
_PROJECT_HINTS = ("silhouette", "methodology", "model metric", "tf-idf")


def infer_tool_names(message: str) -> list[str]:
    text = message.lower()
    selected: list[str] = []

    if any(h in text for h in _VERIFY_HINTS):
        selected.append("verify_claim")
    if any(h in text for h in _SIMILAR_HINTS):
        selected.append("find_similar_stories")
    if any(h in text for h in _TREND_HINTS):
        selected.append("get_trending_topics")
    if any(h in text for h in _ANALYZE_HINTS):
        selected.append("analyze_article_with_existing_model")
    if any(h in text for h in _PROJECT_HINTS):
        selected.append("get_model_metrics")
    if any(h in text for h in _NEWS_HINTS) or not selected:
        selected.insert(0, "search_news")

    # Preserve order while dropping duplicates
    seen: set[str] = set()
    unique: list[str] = []
    for name in selected:
        if name not in seen:
            seen.add(name)
            unique.append(name)
    return unique[:4]


class AgentOrchestrator:
    def __init__(
        self,
        registry: ToolRegistry | None = None,
        store: ConversationStore | None = None,
    ) -> None:
        self.registry = registry or build_default_registry()
        self.store = store or get_conversation_store()
        self.llm = get_llm_client()

    def handle(self, request: AgentChatRequest) -> AgentChatResponse:
        message = request.message.strip()
        record = self.store.get_or_create(request.conversation_id)
        record.append("user", message)

        tool_names = infer_tool_names(message)
        tool_results: list[ToolResult] = []
        activity: list[ToolActivityItem] = []

        activity.append(
            ToolActivityItem(
                tool="query_understanding",
                status="ok",
                summary=f"Selected tools: {', '.join(tool_names)}",
            )
        )

        for name in tool_names:
            result = self.registry.run(name, query=message, context=request.context)
            tool_results.append(result)
            activity.append(
                ToolActivityItem(
                    tool=result.tool,
                    status=result.status,
                    summary=result.message,
                )
            )

        answer = self._compose_answer(message, tool_results)
        record.append("assistant", answer)

        return AgentChatResponse(
            answer=answer,
            conversation_id=record.conversation_id,
            sources=[],
            stories=[],
            verification=None,
            clusters=[],
            tool_activity=activity,
            metadata={
                "phase": AGENT_PHASE,
                "orchestrator": "deterministic_phase1",
                "llm": llm_status(),
                "history_turns": len(record.messages),
                "tools_available": self.registry.names(),
            },
        )

    def _compose_answer(self, message: str, results: list[ToolResult]) -> str:
        unimplemented = [r for r in results if r.status == "not_implemented"]
        errors = [r for r in results if r.status == "error"]

        lines = [
            "I am the NewsLens agent (Phase 1 foundation).",
            "I will not invent headlines, sources, dates, quotes, or verification verdicts.",
            "",
            f'Your request: "{message}"',
            "",
        ]

        if unimplemented:
            lines.append(
                "The tools needed for this request are registered but not implemented yet:"
            )
            for result in unimplemented:
                lines.append(f"- {result.tool}: {result.message}")
            lines.extend(
                [
                    "",
                    "Live news search, verification, and current-news clustering will arrive in later phases.",
                    "The existing TF-IDF + SVD + K-Means pipeline is unchanged and is still available via POST /predict.",
                ]
            )

        if errors:
            lines.append("")
            lines.append("Some tools returned errors:")
            for result in errors:
                lines.append(f"- {result.tool}: {result.message}")

        return "\n".join(lines).strip()


_orchestrator: AgentOrchestrator | None = None


def get_orchestrator() -> AgentOrchestrator:
    global _orchestrator
    if _orchestrator is None:
        _orchestrator = AgentOrchestrator()
    return _orchestrator
