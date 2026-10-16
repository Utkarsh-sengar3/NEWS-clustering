from __future__ import annotations

from typing import Any

from .base import ToolRegistry, ToolResult
from .news_provider import NewsSearchQuery, get_news_provider


class PlaceholderTool:
    phase_ready = 99

    def __init__(self, name: str, description: str, future_phase: int) -> None:
        self.name = name
        self.description = description
        self.phase_ready = future_phase

    def run(self, **kwargs: Any) -> ToolResult:
        return ToolResult(
            status="not_implemented",
            tool=self.name,
            message=(
                f"The '{self.name}' capability is not implemented yet "
                f"(planned for a later NewsLens agent phase). "
                "No headlines, sources, or statistics were generated."
            ),
            data={"planned_phase": self.phase_ready, "arguments": _safe_args(kwargs)},
        )


class SearchNewsTool(PlaceholderTool):
    """Uses the NewsSearchProvider interface so Phase 2 can swap in RSS/API."""

    def __init__(self, name: str, description: str) -> None:
        super().__init__(name, description, future_phase=2)

    def run(self, **kwargs: Any) -> ToolResult:
        provider = get_news_provider()
        query = NewsSearchQuery(
            text=kwargs.get("query") or kwargs.get("text"),
            topic=kwargs.get("topic"),
            location=kwargs.get("location"),
            time_range=kwargs.get("time_range"),
        )
        payload = provider.search(query)
        return ToolResult(
            status="not_implemented",
            tool=self.name,
            message=(
                "Live news search is not implemented in Phase 1. "
                "NewsLens will not invent headlines, sources, or dates. "
                "A real RSS or news-API provider can be attached through "
                "NewsSearchProvider in Phase 2."
            ),
            data={
                "planned_phase": 2,
                "provider": payload.get("provider"),
                "articles": payload.get("articles", []),
                "query": payload.get("query"),
            },
        )


def _safe_args(kwargs: dict[str, Any]) -> dict[str, Any]:
    cleaned: dict[str, Any] = {}
    for key, value in kwargs.items():
        if key.lower() in {"text", "article", "claim", "body"}:
            raw = str(value)
            cleaned[key] = raw[:200] + ("…" if len(raw) > 200 else "")
        else:
            cleaned[key] = value
    return cleaned


_TOOL_SPECS: list[tuple[str, str, int]] = [
    ("search_news_by_location", "Search live news for a location.", 2),
    ("search_news_by_topic", "Search live news for a topic.", 2),
    ("search_news_by_time", "Search live news for a time range.", 2),
    ("search_news_by_location_and_time", "Search live news by location and time.", 2),
    ("search_news_by_topic_location_time", "Search live news by topic, location, and time.", 2),
    ("fetch_article", "Fetch a public article by URL.", 5),
    ("extract_article", "Extract article text from a URL or document.", 5),
    ("summarize_article", "Summarize an article without fabricating facts.", 5),
    ("analyze_article", "Analyze an article using available NewsLens tools.", 5),
    ("classify_topic", "Assign an AG News historical cluster via the existing model.", 5),
    ("analyze_article_with_existing_model", "Run TF-IDF + SVD + K-Means assignment.", 5),
    ("get_cluster_info", "Return historical AG News cluster metadata.", 5),
    ("get_cluster_terms", "Return top terms for a historical cluster.", 5),
    ("get_cluster_examples", "Return example articles for a historical cluster.", 5),
    ("find_similar_articles", "Find similar articles using embeddings.", 7),
    ("find_similar_stories", "Find related live or stored stories.", 7),
    ("cluster_news_articles", "Cluster current live-news stories (not AG News K=12).", 6),
    ("deduplicate_news", "Group near-duplicate live coverage of one event.", 6),
    ("get_trending_topics", "Compute trends from retrieved live news only.", 6),
    ("get_news_statistics", "Compute counts from retrieved live news only.", 6),
    ("compare_articles", "Compare two or more articles neutrally.", 8),
    ("compare_sources", "Compare how sources cover the same event.", 8),
    ("detect_outdated_article", "Flag recycled or outdated reporting.", 8),
    ("extract_claims", "Extract checkable claims from text.", 8),
    ("verify_claim", "Evidence-based verification assessment (not a fake/real label).", 8),
    ("find_supporting_evidence", "Search independent sources for support.", 8),
    ("find_contradicting_evidence", "Search independent sources for contradiction.", 8),
    ("get_model_metrics", "Return documented unsupervised clustering metrics.", 5),
    ("compare_models", "Return the documented classical vs semantic comparison.", 5),
    ("get_methodology", "Return project methodology summary.", 5),
]


def build_default_registry() -> ToolRegistry:
    registry = ToolRegistry()
    registry.register(
        SearchNewsTool(
            "search_news",
            "Search live current news. Does not use the static AG News dataset.",
        )
    )
    for name, description, phase in _TOOL_SPECS:
        if name.startswith("search_news"):
            registry.register(SearchNewsTool(name, description))
        else:
            registry.register(PlaceholderTool(name, description, phase))
    return registry
