#!/bin/bash

pip3 install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000