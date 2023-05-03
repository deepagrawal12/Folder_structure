# simactivationui
Orange sim activation is another angular project name is simactivationui. If you bought new sim card then will activate sim card so we will use this. No use of login credentials. We used the common headerfooter in this project. Only one component is called in this project, and name is simactivation component.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on different environments ( non-prod and prod ).

###Installation 
  Prerequisite:
    - Angular version - 13.3.11
    - Angular CLI: 13.3.8
    - Node: 16.13.1

  Step 1: Clone project from Repository
    - Clone the project from the given repository [Bitbucket]
    - Enter into the project folder [cd <Project Name>]

  Step 2: Install dependencies
     - `npm install`   // for first time installation of dependancies
     - `npm ci`        // used to install all exact version dependencies or devDependencies from a 
                          package-lock. json file

  Step 3: 
    - `ng serve`


### Deployment
Ng application is built using Jenkins and is deployed on docker container.
JenkinsFile and DockerFile hold the configurations for Jenkins and docker respectively.

Environment specifc branches are maintained for deployment on verious environments.
  Development environment - env-dev
  CIT environment - env-acc
  BAT environment - env-bat
  NFR environment - env-nfr
  Production environment - master


## File structure 
App --
      | -- common (Access-denied, confirm, error and page not found etc are common component applications.)

      | -- directive (To add new behavior to the elements in the template or modify existing behavior.)    

      | -- models (Models for various services are implmented)     

      | -- pipe (This project use the custom pipe for to number validation.)

      | -- services  (Auth service for authorization) 
      
      | -- simactivation (Simactivation is a main component. All data is dynamic and build using the
                          formbuilder. At last get review the data from backend. Sim data is activated by sending jwt token in the header.)

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
