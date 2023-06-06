from datetime import date, datetime
from typing import Optional, List

from pydantic import BaseModel, validator

class PersonIn(BaseModel):
    nome: str
    rg: str
    cpf: str
    data_nascimento: date
    data_admissao: date
    funcao: Optional[str] = None

    class Config:
        orm_mode = True

class Person(PersonIn):
    id_pessoa: int


class PeopleList(BaseModel):
    people_count: int
    people: List[Person]

    class Config:
        orm_mode = True
