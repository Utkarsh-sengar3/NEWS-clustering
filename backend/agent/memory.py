from __future__ import annotations

from collections import OrderedDict
from datetime import datetime, timezone
from threading import Lock
from typing import Protocol
from uuid import uuid4

from .config import MAX_CONVERSATIONS, MAX_HISTORY_MESSAGES
from .schemas import ConversationMessage


class ConversationRecord:
    def __init__(self, conversation_id: str):
        self.conversation_id = conversation_id
        self.messages: list[ConversationMessage] = []
        self.created_at = datetime.now(timezone.utc)
        self.updated_at = self.created_at

    def append(self, role: str, content: str) -> None:
        self.messages.append(ConversationMessage(role=role, content=content))
        if len(self.messages) > MAX_HISTORY_MESSAGES:
            self.messages = self.messages[-MAX_HISTORY_MESSAGES:]
        self.updated_at = datetime.now(timezone.utc)


class ConversationStore(Protocol):
    def get_or_create(self, conversation_id: str | None) -> ConversationRecord: ...

    def get(self, conversation_id: str) -> ConversationRecord | None: ...


class InMemoryConversationStore:
    """Process-local conversation memory. Not shared across workers."""

    def __init__(self) -> None:
        self._lock = Lock()
        self._conversations: OrderedDict[str, ConversationRecord] = OrderedDict()

    def get_or_create(self, conversation_id: str | None) -> ConversationRecord:
        with self._lock:
            cid = (conversation_id or "").strip() or str(uuid4())
            record = self._conversations.get(cid)
            if record is None:
                record = ConversationRecord(cid)
                self._conversations[cid] = record
                self._evict_if_needed()
            else:
                self._conversations.move_to_end(cid)
            return record

    def get(self, conversation_id: str) -> ConversationRecord | None:
        with self._lock:
            return self._conversations.get(conversation_id)

    def _evict_if_needed(self) -> None:
        while len(self._conversations) > MAX_CONVERSATIONS:
            self._conversations.popitem(last=False)


_store: InMemoryConversationStore | None = None


def get_conversation_store() -> InMemoryConversationStore:
    global _store
    if _store is None:
        _store = InMemoryConversationStore()
    return _store
