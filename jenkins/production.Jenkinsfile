pipeline {
    agent {
        docker {
            image 'boiyaa/google-cloud-sdk-nodejs'
            args '-p 5111:5111'
        }
    }
    environment { 
        CI = 'true'
        SHERPON_MICROSERVICES_FUNCTION_NAME = 'putWebsites'
        SHERPON_PRODUCTION_SERVICE_ACCOUNT_KEY = credentials('sherpon-production-service-account-key') 
        SHERPON_PRODUCTION_PROJECT_ID = credentials('sherpon-production-project-id') 
        SHERPON_MICROSERVICES_PRODUCTION_ENV = credentials('sherpon-microservices-production-env') 
    }
    stages {
        stage('Deploy-production') { 
            steps {
                sh './jenkins/scripts/production.deploy.sh' 
            }
        }
    }
}