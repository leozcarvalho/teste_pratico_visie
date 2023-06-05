from fastapi import FastAPI, HTTPException
from starlette.requests import Request
from fastapi.responses import JSONResponse


def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(status_code=exc.status_code, content={"message": exc.detail, "status": "error" })
