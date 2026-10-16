"""Phase 1 regression checks. Run from the project root:

    python -m backend.tests.test_phase1
"""

from __future__ import annotations

import io
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from fastapi.testclient import TestClient

from backend.main import app

client = TestClient(app)


def _assert(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def test_health() -> None:
    response = client.get("/health")
    _assert(response.status_code == 200, f"/health failed: {response.text}")
    data = response.json()
    _assert(data.get("status") == "healthy", "health status mismatch")
    _assert(data.get("model_loaded") is True, "model_loaded should be true")
    _assert(data.get("clusters") == 12, "cluster count should remain 12")


def test_predict() -> None:
    text = (
        "Microsoft announced a new cloud computing platform for enterprise "
        "software developers building internet applications and security tools."
    )
    response = client.post("/predict", json={"text": text})
    _assert(response.status_code == 200, f"/predict failed: {response.text}")
    data = response.json()
    _assert("cluster" in data, "predict missing cluster")
    _assert("topic" in data, "predict missing topic")
    _assert("distance_to_centroid" in data, "predict missing distance_to_centroid")
    _assert(isinstance(data["cluster"], int), "cluster should be int")
    _assert(0 <= data["cluster"] <= 11, "cluster id out of range")


def test_extract_file_txt() -> None:
    payload = (
        "Crude oil prices climbed as energy traders watched supply reports "
        "from major producing regions and refinery operations."
    ).encode("utf-8")
    response = client.post(
        "/extract-file",
        files={"file": ("sample.txt", io.BytesIO(payload), "text/plain")},
    )
    _assert(response.status_code == 200, f"/extract-file failed: {response.text}")
    data = response.json()
    _assert("text" in data and "oil" in data["text"].lower(), "extracted text missing")


def test_extract_url_ssrf_blocked() -> None:
    response = client.post("/extract-url", json={"url": "http://127.0.0.1/"})
    _assert(response.status_code == 400, f"SSRF localhost should be blocked: {response.text}")
    response = client.post("/extract-url", json={"url": "file:///etc/passwd"})
    _assert(response.status_code == 400, f"file:// should be blocked: {response.text}")


def test_agent_chat_phase1() -> None:
    response = client.post(
        "/agent/chat",
        json={"message": "What is happening in India today?"},
    )
    _assert(response.status_code == 200, f"/agent/chat failed: {response.text}")
    data = response.json()
    _assert(data.get("conversation_id"), "conversation_id missing")
    answer = data.get("answer", "").lower()
    _assert("not implemented" in answer or "phase 1" in answer, "answer should be honest")
    _assert("invent" in answer or "will not invent" in answer, "should refuse fabrication")
    _assert(data.get("sources") == [], "must not fabricate sources")
    _assert(data.get("stories") == [], "must not fabricate stories")
    activity_tools = [item["tool"] for item in data.get("tool_activity", [])]
    _assert("search_news" in activity_tools, "search_news should be selected")
    _assert(data.get("metadata", {}).get("phase") == "1", "phase metadata missing")


def test_agent_conversation_memory() -> None:
    first = client.post(
        "/agent/chat",
        json={"message": "Show me the latest AI news."},
    )
    _assert(first.status_code == 200, first.text)
    cid = first.json()["conversation_id"]
    second = client.post(
        "/agent/chat",
        json={
            "message": "Which of these is the biggest story?",
            "conversation_id": cid,
        },
    )
    _assert(second.status_code == 200, second.text)
    _assert(second.json()["conversation_id"] == cid, "conversation_id should persist")
    _assert(second.json()["metadata"]["history_turns"] >= 4, "history should accumulate")


def test_agent_empty_message() -> None:
    response = client.post("/agent/chat", json={"message": "   "})
    _assert(response.status_code == 400, "empty message should 400")


def run_all() -> int:
    tests = [
        test_health,
        test_predict,
        test_extract_file_txt,
        test_extract_url_ssrf_blocked,
        test_agent_chat_phase1,
        test_agent_conversation_memory,
        test_agent_empty_message,
    ]
    failed = 0
    for test in tests:
        try:
            test()
            print(f"PASS  {test.__name__}")
        except Exception as exc:
            failed += 1
            print(f"FAIL  {test.__name__}: {exc}")
    print(f"\n{len(tests) - failed}/{len(tests)} passed")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(run_all())
