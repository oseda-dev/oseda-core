#!/bin/bash
set -e

cd backend
./run-backend.sh &

cd ..

cd frontend
./run-frontend.sh
