#!/bin/bash

# Production Deployment Script for Project Submission Portal

echo "Starting deployment process..."

# Install dependencies
echo "Installing backend dependencies..."
npm install

echo "Installing frontend dependencies..."
cd client || npm install

# Build frontend for production
echo "Building frontend for production..."
npm run build

# Create logs directory if it doesn't exist
mkdir -p logs

# Stop existing PM2 processes
echo "Stopping existing PM2 processes..."
pm2 stop all || true
pm2 delete all || true

# Start application with PM2
echo "Starting application with PM2..."
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system reboot
pm2 startup

echo "Deployment completed successfully!"
echo "Application is running on port 6002"
echo "Check logs with: pm2 logs"
echo "Monitor with: pm2 monit"
