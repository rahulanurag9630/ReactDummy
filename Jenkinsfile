pipeline {
     agent {
         label 'reactjs2'
     }
     stages {
        stage("Build") {
            steps {
                sh " npm install"
                sh "CI=false  npm run build"
            }
        }
        stage("Deploy") {
            steps {
                sh "rsync -rav --delete build/* administrator@172.16.0.235:/var/www/html/react-pipeline/hospital-management-23114168-reactjs-pune"
                sh "echo hospital.mgmtpune.mobiloitte.io"
                
            }
        }
    }
}
