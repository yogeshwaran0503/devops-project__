#!/bin/bash

# Deployment script for EC2
# This script pulls the latest Docker image and runs the container

DOCKER_IMAGE="your-dockerhub-username/mern-app:latest"
CONTAINER_NAME="mern-app"

echo "Starting deployment..."

# Pull latest image
docker pull $DOCKER_IMAGE

# Stop and remove existing container
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

# Run new container
docker run -d \
  --name $CONTAINER_NAME \
  -p 80:5000 \
  --restart unless-stopped \
  $DOCKER_IMAGE

echo "Deployment complete! Application is running on port 80."