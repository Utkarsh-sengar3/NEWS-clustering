import os
from pathlib import Path

try:
    from dotenv import load_dotenv
except ImportError:
    def load_dotenv(*_args, **_kwargs) -> bool:
        return False

_BACKEND_DIR = Path(__file__).resolve().parent.parent
_PROJECT_ROOT = _BACKEND_DIR.parent

load_dotenv(_PROJECT_ROOT / ".env")
load_dotenv(_BACKEND_DIR / ".env")


def _env(name: str, default: str = "") -> str:
    value = os.getenv(name, default)
    return value.strip() if value else default


LLM_API_KEY = _env("LLM_API_KEY") or _env("OPENAI_API_KEY")
LLM_BASE_URL = _env("LLM_BASE_URL") or _env("OPENAI_BASE_URL") or "https://api.openai.com/v1"
LLM_MODEL = _env("LLM_MODEL") or "gpt-4o-mini"
NEWS_API_KEY = _env("NEWS_API_KEY")

AGENT_PHASE = "1"
MAX_HISTORY_MESSAGES = 40
MAX_CONVERSATIONS = 500


def llm_is_configured() -> bool:
    return bool(LLM_API_KEY)
