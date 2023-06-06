#!/bin/bash

if [ "$1" = "restart" ]; then
    npm install
fi

npm run serve