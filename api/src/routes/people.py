from src.routes.routes import *
from src.models import people as person_model
from src.schemas import people as people_schema
from src.schemas import general as general_schemas
from src.cruds import people as people_crud

people_routes = APIRouter(
    prefix='/people',
    tags=['People']
)

@people_routes.get("", response_model=people_schema.PeopleList)
def get_people(id: Optional[int] = None, skip: Optional[int] = None,
            limit: Optional[int] = None, sort_by: Optional[str] = None, 
        order_desc: Optional[bool] = None, session: Session = Depends(get_db)):
    
    db_person, total_people = people_crud.get_people(db=session, **locals())
    return people_schema.PeopleList(people=db_person, people_count=total_people)

@people_routes.post("")
def save_person(person: people_schema.PersonIn = Body(..., embed=True),
    session: Session = Depends(get_db)):
    db_person = people_crud.add_person(db=session, person=person)
    return general_schemas.ResponseMessage(status='success', message="Nova pessoa cadastrada com sucesso")

@people_routes.put("/{person_id}")
def update_person(person_id: int, person: people_schema.PersonIn = Body(..., embed=True),
        session: Session = Depends(get_db)):
    db_person = session.query(person_model.Person).get(person_id)

    if not db_person:
        raise HTTPException(status_code=404, detail="Pessoa não cadastrada")
    
    people_crud.update_person(db=session, person_id=person_id, person=person)
    return general_schemas.ResponseMessage(status='success', message="Dados atualizados com sucesso")

@people_routes.delete("/{person_id}")
def delete_person(person_id: int, session: Session = Depends(get_db)):
    db_person = session.query(person_model.Person).get(person_id)

    if not db_person:
        raise HTTPException(status_code=404, detail="Pessoa não cadastrada")
   
    people_crud.delete_people(db=session, db_person=db_person)

    return general_schemas.ResponseMessage(status='success', message=f"Pessoa {person_id} deletada com sucesso")
