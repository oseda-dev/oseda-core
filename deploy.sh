#!/bin/bash

# this will just update core codebase. The libraries should update automatically
# see action in oseda-lib

# assuming running from oseda core and you have this in another repo relative to this one
OSEDA_LIB_DIR="../oseda-lib"

echo "sshing..."
set -e

# hope your conf has this exact setup lol
ssh aws << 'EOF'

kill $(pgrep node)
kill $(pgrep npm)


cd $HOME

cd oseda-core
git pull

cd backend
npm install
nohup ./run-backend.sh > backend.log 2>&1 &
cd ..

cd frontend
npm install
nohup ./run-frontend-actually.sh > frontend.log 2>&1 &

EOF
