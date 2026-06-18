from fastapi import APIRouter
from models import LetterRequest, LetterResponse

router = APIRouter()

@router.post("/generate/letter", response_model=LetterResponse)
async def generate_letter(body: LetterRequest):
    print(body.job_description)
    print(body.cv_text)
    return { "letter": "Generated letter here" }
