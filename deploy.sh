#!/bin/bash
set -e

# hope your conf has this exact setup lol
ssh aws << 'EOF'

cd oseda-lib
git pull
cd ..

cd oseda-core
git pull

cd backend
npm install
nohup ./run-backend.sh &
cd ..

cd frontend
npm install
nohup ./run-frontend-actually.sh &

EOF
