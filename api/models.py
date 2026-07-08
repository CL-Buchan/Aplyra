from pydantic import BaseModel

class LetterRequest(BaseModel):
    job_description: str
    cv_text: str

class LetterResponse(BaseModel):
    letter: str

class LetterOutput(BaseModel):
    name: str
    skills: str
    experience: str

# What /parse/document returns: the raw extracted text, ready to be sent
# on to /generate/letter as cv_text.
class ParsedDocument(BaseModel):
    filename: str
    text: str

class Job(BaseModel):
    name: str
    description: str
    location: str
    applied_date: str
    status: str