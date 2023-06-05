# Server-side FastAPI/Python app:

## Pre-Install
```sh
$ sudo apt-get install libpq-dev
$ sudo apt install libmariadb3 libmariadb-dev
```

## Install
```sh
$ pip3 install virtualenv
$ python3 -m venv env
```

## Run
```sh
$ source env/bin/activate
(env)$ pip3 install -r requirements.txt
(env)$ uvicorn main:app --reload
```
