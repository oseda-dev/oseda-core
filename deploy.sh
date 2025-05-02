#!/bin/bash

# assuming running from oseda core and you have this in another repo relative to this one
OSEDA_LIB_DIR="../oseda-lib"

if [ "$1" = "--send-repos" ]; then
    echo "Pushing library to github server"
    cd "$OSEDA_LIB_DIR"
    # will push with you local git setup
    git add --all
    git commit -m "$(date)"
    git push
fi

echo "sshing..."
set -e

# hope your conf has this exact setup lol
ssh aws << 'EOF'

kill $(pgrep node)
kill $(pgrep npm)

cd oseda-lib
cd courses
git pull

for dir in */; do
    cd "$dir"
    npm install
    npx vite build
    cd ..
done

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
