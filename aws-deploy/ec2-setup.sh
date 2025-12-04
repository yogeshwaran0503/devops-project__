#!/bin/bash

# EC2 Instance Setup Script
# Run this on your EC2 instance to prepare it for deployment

# Update system
sudo yum update -y

# Install Docker
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create application directory
mkdir -p /home/ec2-user/mern-app

echo "EC2 setup complete! Please log out and log back in for Docker permissions to take effect."