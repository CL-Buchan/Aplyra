import os
import httpx
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException

from models import LetterRequest, LetterResponse

load_dotenv(".env.local")

router = APIRouter()

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

@router.post("/generate/letter", response_model=LetterResponse)
async def generate_letter(body: LetterRequest):
    api_key = os.environ.get("OPENROUTER_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="OPENROUTER_API_KEY is not set")
    
    prompt = "Generate me an improved cover letter from the following uploaded documentation, utilising the job description and previously written cover letter provided. Keep the tone professional and concise throughout, limiting the use of filler words. The cover letter is: " + body.cv_text + ". The job description is: " + body.job_description

    with open("prompts/career_specialist.txt") as f:
        system_prompt = f.read()

    payload = {
        "model": os.environ.get("OPENROUTER_MODEL"),
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ],
    }

    async with httpx.AsyncClient(timeout=60) as client:
        response = await client.post(
            OPENROUTER_URL,
            json=payload,
            headers={"Authorization": f"Bearer {api_key}"},
        )

    if response.status_code != 200:
        raise HTTPException(status_code=502, detail=f"OpenRouter error: {response.text}")

    data = response.json()
    print(data)
    
    try:
        letter = data["choices"][0]["message"]["content"]
    except (KeyError, IndexError):
        raise HTTPException(status_code=502, detail=f"Unexpected OpenRouter response: {response.text}")

    return LetterResponse(letter=letter)
