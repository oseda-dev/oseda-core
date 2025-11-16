#!/bin/bash
clear
set -e

# --- FRONTEND ---
echo "Installing frontend dependencies..."
cd frontend
npm install

echo "Building frontend..."
npm run build
cd ..

# --- BACKEND ---
echo "Installing backend dependencies..."
cd backend
npm install

# echo "Building backend..."
# npm run build

echo "Starting backend (serving frontend + API)..."
npm start
