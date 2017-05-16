pipeline {
  agent any
  stages {
    stage('') {
      steps {
        parallel(
          "dev": {
            sh 'echo 123'
            echo '0000000'
            sleep 5
            
          },
          "test": {
            echo '9999'
            
          }
        )
      }
    }
  }
}