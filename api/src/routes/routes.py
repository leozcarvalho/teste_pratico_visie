from src.database.database import *

def get_db():
    try:
        db = SessionLocal()
        db.expire_all()
        yield db
    except:
        db.rollback()
        raise
    finally:
        db.close()

from sqlalchemy.orm import Session
from typing import List, Union

from fastapi import Body, Depends, HTTPException, Request, APIRouter
from fastapi.responses import JSONResponse
from typing import Optional