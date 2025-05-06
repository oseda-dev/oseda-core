#!/bin/bash


cd ..
cd oseda-lib
git pull
touch temp_file.txt


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
