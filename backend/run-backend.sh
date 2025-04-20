#!/bin/bash
set -e

npm install

echo "Running backend..."

npm run build

npm run start
