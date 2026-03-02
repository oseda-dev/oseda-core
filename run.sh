#!/bin/bash

if [ $# -ne 1 ]; then
    echo "Usage: $0 [dev|prod]"
    exit 1
fi

MODE=$1
if [[ "$MODE" != "dev" && "$MODE" != "prod" ]]; then
    echo "Invalid mode: $MODE"
    exit 1
fi

echo "======================================================"
echo "Running OSEDA in MODE: $MODE"
echo "======================================================"

# --- FRONTEND ---
echo "[1/3] Installing frontend dependencies..."
cd frontend
npm install

# this is really slow, but the way the backend works, it needs all files statically
echo "[2/3] Building frontend..."
npm run build
cd ..

# --- BACKEND ---
echo "[3/3] Installing backend dependencies..."
cd backend
npm install
cd ..

# --- APACHE SETUP IN PROD
if [[ "$MODE" == "prod" ]]; then
    echo "[4/5] Configuring Apache for prod..."
    
    # rahhh idk where this file keeps coming from, but kill it if exists
    if [ -f /etc/apache2/sites-enabled/oseda-le-ssl.conf ]; then
        sudo a2dissite oseda-le-ssl.conf
    fi

    sudo ln -sfn /home/ubuntu/oseda-core/net/oseda.conf /etc/apache2/sites-available/oseda.conf
    sudo a2ensite oseda.conf


    #  should already be enabled
    sudo a2enmod proxy proxy_http ssl rewrite

# restart server
    sudo systemctl reload apache2
fi

# --- START NODE BACKEND ---
echo "[5/5] Starting backend..."
node backend/src/index.js "$MODE"
