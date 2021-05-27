# HSLU-Modules Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.12.

## Local DEV

Installing local Dev Environment:
1. Install Angular, npm and node.js
2. Run `ng serve` for the frontend dev server and navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
3. Clone [HSLU-Modules Backend](https://github.com/patapelada/hslumodules) Repo
4. Run `docker-compose up`. This will provide you with a Postgresql-DB and [Adminer](https://www.adminer.org/) instance to manage your database
5. Run `mvn clean install` to compile your app and install dependencies
6. Run `mvn spring-boot:run` to start the backend server. All required Data will get inserted into the database. Navigate to `https://localhost:8080/api/module` verify the result.
7. Back at `http://localhost:4200/`: there should be some Modules to play around with.


## Build 4 PROD

Run `ng build --configuration production` to build the project. The build artifacts will be stored in the `dist/` directory. Copy the content of this dir into the `src/main/resources/static` directory of the [HSLU-Modules Backend](https://github.com/patapelada/hslumodules) repository. Pushing the latest changes(into the HSLU-Modules Backend Repo) will force Heroku to rebuild the application. 

## Running unit tests

No Tests written yet! Baaaaaad....
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Also no tests written....
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
