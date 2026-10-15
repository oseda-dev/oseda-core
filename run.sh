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

echo "Running OSEDA in MODE: $MODE"

# frontend stuff
echo "Installing frontend dependencies..."
cd frontend
npm install

# this is really slow, but the way the backend works, it needs all files statically
echo "Building frontend..."
npm run build
cd ..

# backend stuff
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

# setup apache if in production
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

echo " Starting backend..."
node backend/src/index.js "$MODE"
