#!/bin/bash

# this will just update core codebase. The libraries should update automatically
# see action in oseda-lib

# assuming running from oseda core and you have this in another repo relative to this one
OSEDA_LIB_DIR="oseda-lib"

echo "sshing..."
set -e

# hope your conf has this exact setup lol
ssh aws << 'EOF'

pgrep node | xargs kill
pgrep npm | xargs kill



cd oseda-lib/courses

echo "Building courses with npx vite build..."
for dir in */; do
# only run if package json exists, in theory it always should but who knows
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

# -f force override old one
sudo ln -sfn /home/ubuntu/oseda-core/net/oseda.conf /etc/apache2/sites-available/oseda.conf

rm -rf oseda-core

git clone git@github.com:oseda-dev/oseda-core.git

cd oseda-core

nohup ./run.sh &

EOF
