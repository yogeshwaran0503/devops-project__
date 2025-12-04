pipeline {
    agent any
    
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        DOCKER_IMAGE = 'your-dockerhub-username/mern-app'
        AWS_CREDENTIALS = credentials('aws-credentials')
        EC2_HOST = 'your-ec2-public-ip'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/YOUR_USERNAME/mern-cicd-pipeline.git'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    def image = docker.build("${DOCKER_IMAGE}:${BUILD_NUMBER}")
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        image.push()
                        image.push('latest')
                    }
                }
            }
        }
        
        stage('Deploy to AWS EC2') {
            steps {
                script {
                    sh '''
                        ssh -o StrictHostKeyChecking=no -i ~/.ssh/aws-key.pem ec2-user@${EC2_HOST} "
                            docker pull ${DOCKER_IMAGE}:latest &&
                            docker stop mern-app || true &&
                            docker rm mern-app || true &&
                            docker run -d --name mern-app -p 80:5000 ${DOCKER_IMAGE}:latest
                        "
                    '''
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}