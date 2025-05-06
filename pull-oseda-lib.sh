#!/bin/bash


cd $HOME
cd oseda-lib
git pull
cd courses


#
# cd oseda-lib
# cd courses
# git pull

# # TODO remove this when send-repo is fixedg
for dir in */; do
    cd "$dir"
    npm install
    npx vite build
    cd ..
done

cd $HOME
# complete restart server to push new course material :/
# this is currently ripped from the deploy script

kill $(pgrep node)
kill $(pgrep npm)



cd oseda-core

cd backend
npm install
nohup ./run-backend.sh > backend.log 2>&1 &
cd ..

cd frontend
npm install
nohup ./run-frontend-actually.sh > frontend.log 2>&1 &
