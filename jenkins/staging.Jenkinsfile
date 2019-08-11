pipeline {
    agent {
        docker {
            image 'boiyaa/google-cloud-sdk-nodejs'
            args '-p 5110:5110'
        }
    }
    environment { 
        CI = 'true'
        SHERPON_MICROSERVICES_FUNCTION_NAME = 'putWebsites'
        SHERPON_STAGING_SERVICE_ACCOUNT_KEY = credentials('sherpon-staging-service-account-key') 
        SHERPON_STAGING_PROJECT_ID = credentials('sherpon-staging-project-id') 
        SHERPON_MICROSERVICES_STAGING_ENV = credentials('sherpon-microservices-staging-env') 
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh './jenkins/scripts/test.sh'
            }
        }
        stage('Deploy-staging') { 
            steps {
                sh './jenkins/scripts/staging.deploy.sh' 
            }
        }
    }
}