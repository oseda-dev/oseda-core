#!/bin/bash
set -e

# hope your conf has this exact setup lol
ssh aws << 'EOF'


kill $(pgrep node)
kill $(pgrep npm)

cd oseda-lib
git pull

for dir in */; do
    cd "$dir"
    npm install
    npx run build
    cd ..
done

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
