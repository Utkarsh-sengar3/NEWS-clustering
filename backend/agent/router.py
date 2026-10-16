from fastapi import APIRouter, HTTPException

from .orchestrator import get_orchestrator
from .schemas import AgentChatRequest, AgentChatResponse

router = APIRouter(prefix="/agent", tags=["agent"])


@router.post("/chat", response_model=AgentChatResponse)
def agent_chat(request: AgentChatRequest) -> AgentChatResponse:
    if not request.message or not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    if len(request.message) > 20000:
        raise HTTPException(
            status_code=400,
            detail="Message is too long. Please shorten the request.",
        )

    return get_orchestrator().handle(request)
