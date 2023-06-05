from pydantic import BaseModel

class ResponseMessage(BaseModel):
    status: str
    message: str

    class Config:
        orm_mode = True

