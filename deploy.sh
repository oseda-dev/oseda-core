#!/bin/bash
set -e
echo "Starting deployment..."

ssh aws << 'EOF'


echo "Killing old Node processes..."
sudo kill $(pgrep node)
sudo kill $(pgrep npm)

set -e

# --- BUILD COURSES ---
cd ~/oseda-lib/courses

echo "Building courses with npx vite..."
for dir in */; do
    if [ -f "$dir/package.json" ]; then
        echo "Installing and building $dir"
        cd "$dir"
        npm install
        npx vite build
        cd ..
    else
        echo "Skipping $dir - no package.json"
    fi
done

cd $HOME

echo "Removing old oseda-core..."
rm -rf oseda-core

echo "Cloning latest oseda-core..."
git clone git@github.com:oseda-dev/oseda-core.git

# link Apache config (force overwrite)
sudo ln -sfn /home/ubuntu/oseda-core/net/oseda.conf /etc/apache2/sites-available/oseda.conf

echo "Enabling site & reloading Apache..."
sudo a2ensite oseda.conf
sudo systemctl reload apache2

# --- START BACKEND (serves SPA + API) ---
cd oseda-core
echo "Installing backend dependencies..."
cd backend
npm install

echo "Installing frontend dependencies & building frontend..."
cd ../frontend
npm install
npm run build

echo "Starting backend..."
cd ../
nohup ./run.sh prod > oseda.log 2>&1 &

EOF

echo "Deployment finished."
