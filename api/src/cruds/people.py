from sqlalchemy.orm.session import Session
from src.models import people as person_model
from src.schemas import people as people_schema

def get_people(db: Session, **args):
    conditions = []

    db_query = db.query(person_model.Person)

    if args['id']:
        conditions.append(person_model.Person.id_pessoa == args['id'])

    db_query = db_query.filter(*conditions)

    return db_query.order_by(args['sort_by']).offset(args['skip']).limit(args['limit']).all(), db_query.count()

def add_person(db: Session, person: people_schema.PersonIn):
    db_person = person_model.Person(**person.dict())
    db.add(db_person)
    db.commit()

def update_person(db: Session, person_id: int, person: people_schema.PersonIn):
    db.query(person_model.Person)\
        .filter(person_model.Person.id_pessoa == person_id)\
        .update(person.dict())

    db.commit()

def delete_person(db: Session, db_people):
    db.delete(db_people)
    db.commit()