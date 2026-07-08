import io

from fastapi import APIRouter, HTTPException, UploadFile
from pypdf import PdfReader

from models import ParsedDocument

router = APIRouter()

# MIME types the browser reports for each format. We validate against these
# so we fail fast with a clear error instead of crashing mid-parse.
PDF_TYPE = "application/pdf"
DOCX_TYPE = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"


@router.post("/parse/document", response_model=ParsedDocument)
async def parse_document(file: UploadFile):
    # Declaring the parameter as UploadFile tells FastAPI this endpoint
    # expects multipart/form-data with a field named "file".
    if file.content_type not in (PDF_TYPE, DOCX_TYPE):
        # 415 = Unsupported Media Type. HTTPException short-circuits the
        # request and sends this status + message back to the client.
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported file type: {file.content_type}. Upload a PDF or .docx.",
        )

    # .read() is async because the upload may still be streaming in.
    contents = await file.read()

    if file.content_type == PDF_TYPE:
        # pypdf wants a file-like object, not raw bytes, so we wrap the
        # bytes in BytesIO (an in-memory "file").
        reader = PdfReader(io.BytesIO(contents))
        text = "\n".join(page.extract_text() or "" for page in reader.pages)
    else:
        # TODO(you): .docx parsing. Very similar shape to the PDF branch:
        #   1. `from docx import Document` (the python-docx package)
        #   2. Wrap `contents` in io.BytesIO and pass it to Document(...)
        #   3. A Document has a `.paragraphs` list; each paragraph has `.text`
        #   4. Join the paragraph texts with "\n" like above
        raise HTTPException(status_code=501, detail="docx parsing not implemented yet")

    if not text.strip():
        # Scanned/image-only PDFs produce no text — tell the user rather
        # than silently generating a letter from an empty CV.
        raise HTTPException(status_code=422, detail="Could not extract any text from the document.")

    return ParsedDocument(filename=file.filename, text=text)
