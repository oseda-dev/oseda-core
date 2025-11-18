#!/bin/bash
set -e

if [ $# -ne 1 ]; then
    echo "Usage: $0 [dev|prod]"
    exit 1
fi

MODE=$1

if [ "$MODE" != "dev" ] && [ "$MODE" != "prod" ]; then
    echo "Invalid mode: $MODE"
    echo "Usage: $0 [dev|prod]"
    exit 1
fi


if [[ "$MODE" == "prod" ]]; then
    sudo ln -sfn /home/ubuntu/oseda-core/net/oseda.conf /etc/apache2/sites-available/oseda.conf
fi

echo "======================================================"
echo "Running OSEDA in MODE: $MODE"
echo "======================================================"

# --- FRONTEND ---
echo "[1/3] Installing frontend dependencies..."
cd frontend
npm install

echo "[2/3] Building frontend..."
npm run build
cd ..

# --- BACKEND ---
echo "[3/3] Installing backend dependencies..."
cd backend
npm install

echo "------------------------------------------------------"
echo "Starting backend with MODE=$MODE"
echo "------------------------------------------------------"


node src/server.js "$MODE"
