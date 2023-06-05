from src.routes import people
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    version="0.0.1",
    title="api-teste-visie",
)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from src.exceptions import custom_exceptions
app.add_exception_handler(HTTPException, custom_exceptions.http_exception_handler)

app.include_router(people.people_routes)

@app.get("/", summary="")
def read_root():
    return {"teste-visie": "API"}