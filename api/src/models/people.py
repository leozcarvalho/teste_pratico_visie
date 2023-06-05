from datetime import datetime

from sqlalchemy import Column, Date, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.mysql import TINYINT

from src.database.database import Base

class Person(Base):
    __tablename__ = 'pessoas'

    id_pessoa = Column(TINYINT(255), primary_key=True, autoincrement=True)
    nome = Column(String(100), nullable=False)
    rg = Column(String(100), nullable=False)
    cpf = Column(String(100), nullable=False)
    data_nascimento = Column(Date, nullable=False)
    data_admissao = Column(Date, nullable=False)
    funcao = Column(String(100))