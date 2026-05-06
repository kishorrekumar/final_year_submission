#!/bin/bash

set -e

# Production Deployment Script for Project Submission Portal

echo "Starting deployment process..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build frontend for production
echo "Building frontend for production..."
npm run build

# Create logs directory if it doesn't exist
mkdir -p logs

# Stop existing PM2 processes for this app only
echo "Stopping existing PM2 processes for this app..."
pm2 delete project-submission-frontend || true
pm2 delete project-submission-backend || true

# Start application with PM2
echo "Starting application with PM2..."
pm2 start ecosystem.config.cjs --env production

# Save PM2 configuration
pm2 save

echo "Deployment completed successfully!"
echo "Frontend is running on port 6003"
echo "Backend is running on port 6002"
echo "Check logs with: pm2 logs"
echo "Monitor with: pm2 monit"
