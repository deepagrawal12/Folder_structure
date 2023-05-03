#!/usr/bin/env groovy
def ServiceName
def repoenv
def pipelinename
def DTRRepo

pipeline {
  agent any

  tools {nodejs "Node 16.16.x"}

  stages {
    stage('Checking out Code') {
      steps {
         checkout scm
      }
    }

    stage('Install dependencies & Build Angular') {
      steps {
         script{
          pipelinename=sh(returnStdout: true, script: "echo ${JOB_NAME} | cut -d '/'  -f1 ").trim()
          ServiceName="${pipelinename}"
          sh 'npm ci'
          
          if ( env.BRANCH_NAME == 'master' ) {
            sh 'ng build --c production --deploy-url="/simactivation/"'
          }
          else {
            repoenv=sh(returnStdout: true, script: "echo ${env.BRANCH_NAME} | cut -d '-' -f2 ").trim()
            sh "ng build --c ${repoenv} --outputHashing=all --deploy-url='/simactivation/'"
          }
	        DTRRepo='dtp'
         }
      }
    }

    stage('Sonar') {
      steps {
          script{
              def scannerHome = tool 'Sonar Scanner';
            
              if ( env.BRANCH_NAME == 'master' || env.BRANCH_NAME.startsWith("env-")){
                  withSonarQubeEnv {
                    sh "'${scannerHome}/bin/sonar-scanner' -Dsonar.projectName='${ServiceName}' -Dsonar.projectKey='${ServiceName}'"
                  }
              }
          }
        }
      }		
  // need to review with DTP scrum master
  // stage("Quality Gate") {
  //     steps {
  //         timeout(time: 1, unit: 'HOURS') {
  //             // Parameter indicates whether to set pipeline to UNSTABLE if Quality Gate fails
  //             // true = set pipeline to UNSTABLE, false = don't
  //             waitForQualityGate abortPipeline: true
  //         }
  //     }
  // }

    stage('Push to DTR'){
      steps {
          script{
            if ( env.BRANCH_NAME == 'master' || env.BRANCH_NAME.startsWith("env-")){
                 if ( env.BRANCH_NAME == 'master' ) {
                                  repoenv="prod"
                        }
                 else {
                                  repoenv=sh(returnStdout: true, script: "echo ${env.BRANCH_NAME} | cut -d '-' -f2 ").trim()
                         }

              ServiceName="${pipelinename}-${repoenv}"
              docker.withRegistry("${DTR_URL}",'Docker_Creds') {
              def customImage = docker.build("${DTRRepo}/${ServiceName}:v1.0.${env.BUILD_ID}")
              /* Push the container to the custom Registry */
              customImage.push()
              customImage.push('latest')
             }
           }
          }

        }
    }
}
   post {
            failure {
                mail to: 'OBEDPEGITUser@TechMahindra.com',
                     subject: "Failed Pipeline: ${ServiceName}" ,
                     body: "Something is wrong with ${env.BUILD_URL}  With Branch ${env.BRANCH_NAME}"
            }
            success {
                mail to: 'OBEDPEGITUser@TechMahindra.com',
                     subject: "Success Pipeline: ${ServiceName}",
                     body: "Check the Pipeline at ${env.BUILD_URL} With Branch ${env.BRANCH_NAME}"
            }
        }
}

