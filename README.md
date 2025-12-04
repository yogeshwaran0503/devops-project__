# MERN Stack CI/CD Pipeline

A complete DevOps project demonstrating CI/CD pipeline for MERN application using Docker, Jenkins, and AWS.

## 🚀 Features

- **Frontend**: React.js with task management
- **Backend**: Node.js/Express API with MongoDB
- **Containerization**: Docker multi-stage builds
- **CI/CD**: Jenkins automated pipeline
- **Cloud**: AWS EC2 deployment

## 📋 Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Jenkins server
- AWS EC2 instance
- Docker Hub account

## 🛠️ Local Development

```bash
# Install dependencies
npm run install-deps

# Start development servers
npm run dev
```

## 🐳 Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Access application at http://localhost:5000
```

## ⚙️ CI/CD Setup

### 1. Jenkins Configuration
- Install Docker and AWS CLI plugins
- Add credentials:
  - `docker-hub-credentials`: Docker Hub username/password
  - `aws-credentials`: AWS access keys

### 2. AWS EC2 Setup
```bash
# Run on EC2 instance
chmod +x aws-deploy/ec2-setup.sh
./aws-deploy/ec2-setup.sh
```

### 3. Update Configuration
- Replace `your-dockerhub-username` in Jenkinsfile
- Update `your-ec2-public-ip` in Jenkinsfile
- Configure GitHub webhook for automatic builds

## 🔄 Pipeline Flow

1. **Code Push** → GitHub
2. **Webhook Trigger** → Jenkins
3. **Build** → Docker Image
4. **Push** → Docker Hub
5. **Deploy** → AWS EC2

## 🌐 Architecture

```
GitHub → Jenkins → Docker Hub → AWS EC2
   ↓         ↓         ↓         ↓
 Source   Build    Registry   Deploy
```

## 📝 API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `DELETE /api/tasks/:id` - Delete task
- `GET /health` - Health check