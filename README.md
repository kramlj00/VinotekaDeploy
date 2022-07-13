# Quick Start
This file explains how to create database locally and get eVinoteka app up and running on your local machine.

## Install dependencies
In project root run command **`npm install`** to install dependencies for backend.
With command **`cd frontend`** position yourself in folder **frontend** and run command **`npm install`** to install dependencies for frontend.

## Create Database
App is using PostgreSQL database and Sequelize ORM.
To create database, in .env file add database connection string like:
```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME
```
Then, in project root run command **`npx sequelize-cli db:create`**.

## Migrate Database
Run command **`npx sequelize-cli db:migrate`** to add tables and relations in created database.

## Seed Database
Run command **`npx sequelize-cli db:seed:all`** to add neccessary data in some tables.

## Start project
1. In project root run command **`npm start`** or **`npm run start-dev`** to start backend with nodemon.
2. Open another terminal.
3. Position yourself within **frontend** folder and run command **`npm start`** to start eVinoteka UI.
