"""News search provider interface.

Phase 1 does not fetch live news. RSS and commercial APIs should implement
NewsSearchProvider later without changing the agent/tool calling contract.
"""

from __future__ import annotations

from typing import Any, Protocol


class NewsSearchQuery:
    def __init__(
        self,
        text: str | None = None,
        topic: str | None = None,
        location: str | None = None,
        time_range: str | None = None,
        extra: dict[str, Any] | None = None,
    ) -> None:
        self.text = text
        self.topic = topic
        self.location = location
        self.time_range = time_range
        self.extra = extra or {}


class NewsSearchProvider(Protocol):
    name: str

    def search(self, query: NewsSearchQuery) -> dict[str, Any]:
        """Return articles with headline, source, published_at, and url when available."""
        ...


class UnconfiguredNewsProvider:
    """Stand-in until Phase 2 wires a real RSS or news API backend."""

    name = "unconfigured"

    def search(self, query: NewsSearchQuery) -> dict[str, Any]:
        return {
            "provider": self.name,
            "implemented": False,
            "articles": [],
            "query": {
                "text": query.text,
                "topic": query.topic,
                "location": query.location,
                "time_range": query.time_range,
            },
        }


def get_news_provider() -> NewsSearchProvider:
    return UnconfiguredNewsProvider()
