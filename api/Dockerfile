FROM python:3

WORKDIR /api

COPY ./requirements.txt /api/requirements.txt

RUN pip3 install -r requirements.txt

RUN apt-get update && apt-get install \ 
    -y --no-install-recommends \
    build-essential 