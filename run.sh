#!/bin/bash

docker compose -f docker-compose.yml -f docker-compose.yml down
docker compose -f docker-compose.yml -f docker-compose.yml build
docker compose -f docker-compose.yml -f docker-compose.yml up