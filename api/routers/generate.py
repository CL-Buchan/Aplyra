import os

import httpx
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException

from models import LetterRequest, LetterResponse

# Reads api/.env.local and puts its values into os.environ. Add a line:
#   OPENROUTER_API_KEY=sk-or-...
# (.env.local is gitignored — never commit API keys.)
load_dotenv(".env.local")

router = APIRouter()

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
# ":free" suffix = OpenRouter's free tier for this model (rate-limited, $0).
MODEL = "meta-llama/llama-3.3-70b-instruct:free"


@router.post("/generate/letter", response_model=LetterResponse)
async def generate_letter(body: LetterRequest):
    api_key = os.environ.get("OPENROUTER_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="OPENROUTER_API_KEY is not set")

    # TODO(you): write the prompt. You have body.cv_text and
    # body.job_description available. Think about what instructions get a
    # good letter: tone, length, "use only real facts from the CV", etc.
    prompt = "..."

    # OpenRouter uses the standard chat-completions format: a list of
    # messages, each with a role ("system" | "user" | "assistant").
    payload = {
        "model": MODEL,
        "messages": [
            # TODO(you): a "system" message sets the model's behaviour/persona,
            # and a "user" message carries your prompt. Try:
            #   {"role": "system", "content": "You are ..."},
            #   {"role": "user", "content": prompt},
        ],
    }

    # httpx.AsyncClient is the async equivalent of `fetch` — it lets the
    # server handle other requests while waiting for OpenRouter to respond.
    async with httpx.AsyncClient(timeout=60) as client:
        response = await client.post(
            OPENROUTER_URL,
            json=payload,
            headers={"Authorization": f"Bearer {api_key}"},
        )

    if response.status_code != 200:
        raise HTTPException(status_code=502, detail=f"OpenRouter error: {response.text}")

    data = response.json()
    # TODO(you): pull the letter text out of the response. The JSON shape is:
    #   {"choices": [{"message": {"role": "assistant", "content": "..."}}], ...}
    # Extract the content string and return it.
    letter = "..."

    return LetterResponse(letter=letter)
