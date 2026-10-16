"""OpenAI-compatible LLM client.

The API key stays on the server. Phase 1 does not use the LLM to generate
news answers, so a missing key is not an error.
"""

from __future__ import annotations

from typing import Any

import requests

from .config import LLM_API_KEY, LLM_BASE_URL, LLM_MODEL, llm_is_configured


class LLMClientError(Exception):
    pass


class OpenAICompatibleClient:
    def __init__(
        self,
        api_key: str | None = None,
        base_url: str | None = None,
        model: str | None = None,
        timeout: int = 30,
    ) -> None:
        self.api_key = api_key if api_key is not None else LLM_API_KEY
        self.base_url = (base_url or LLM_BASE_URL).rstrip("/")
        self.model = model or LLM_MODEL
        self.timeout = timeout

    @property
    def configured(self) -> bool:
        return bool(self.api_key)

    def chat(
        self,
        messages: list[dict[str, Any]],
        tools: list[dict[str, Any]] | None = None,
        temperature: float = 0.2,
    ) -> dict[str, Any]:
        if not self.api_key:
            raise LLMClientError(
                "LLM_API_KEY is not configured. The key must be set in the backend environment."
            )

        url = f"{self.base_url}/chat/completions"
        payload: dict[str, Any] = {
            "model": self.model,
            "messages": messages,
            "temperature": temperature,
        }
        if tools:
            payload["tools"] = tools

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        try:
            response = requests.post(
                url,
                json=payload,
                headers=headers,
                timeout=self.timeout,
            )
        except requests.exceptions.Timeout as exc:
            raise LLMClientError("LLM request timed out.") from exc
        except requests.exceptions.RequestException as exc:
            raise LLMClientError("Unable to reach the LLM provider.") from exc

        if response.status_code >= 400:
            raise LLMClientError(
                f"LLM provider returned HTTP {response.status_code}."
            )

        return response.json()


def get_llm_client() -> OpenAICompatibleClient:
    return OpenAICompatibleClient()


def llm_status() -> dict[str, Any]:
    return {
        "configured": llm_is_configured(),
        "model": LLM_MODEL if llm_is_configured() else None,
        "base_url": LLM_BASE_URL if llm_is_configured() else None,
        "used_in_phase": False,
        "phase": 1,
    }
