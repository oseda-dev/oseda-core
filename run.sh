#!/bin/bash

cd backend
./run-backend.sh &

cd ..

cd frontend
./run-frontend.sh
