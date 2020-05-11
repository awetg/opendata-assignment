![](https://github.com/awetg/opendata-assignment/workflows/test_and_deploy/badge.svg)

# Assignment Opendata

## Overview

This project is implementation of code assignment from 3UAS. The task was to create a visualization of data supplied by assignment API. This project includes a backend that will pull data every hour and store it to mongo database and implement a single RESTful API endpoint to server the data at `/api/events`, as well as react frontend that will show visualization of the data. The project is hosted on DigitalOcean ubuntu machine and deployed automatically after successfull test and build pipeline using Github Actions. The droplet might not be online after couple of months from the start of this project, but for live demos you can check the at following urls [App URL](http://142.93.104.153) and [API URL](http://142.93.104.153:3001/api/events) or you can clone and test locally.

## Getting started

To get the backend and frontend apps running locally.

Clone repo

```sh
git clone https://github.com/awetg/opendata-assignment
cd opendata-assignment
```

Setup environmental variables refere this [section](#Deployment) on this README

Make sure you have installed Docker and docker-compose in your machine

```sh
docker-compose build
docker-compose up -d
```

Your react app should now be running on [localhost](http://localhost) and api on [localhost:3001/api/events](http://localhost:3001/api/events). Nginx is used to serve up frontend files and proxy api calls to backend container so that we can use `/api/events` to get our data on react app.

You can stop the apps using the command `docker-compose stop`

## Project Setup

### Test

- Backend covers a test of unhandled api endpoints and integration test for `/api/events/` by runnig backend and mongo db on docker container
- Frontend test covers a test for some components

### Deployment

On each successfull test and build pipeline the code will be deployed to remote server using this [appleboy/ssh-action](https://github.com/appleboy/ssh-action) action, thanks for [appleboy](https://github.com/appleboy) for creating the ssh action. After ssh-ing to the remote server below commands will be run

```sh
cd ~/dev/opendata-assignment
git pull origin master
npm install --production
docker-compose build
docker-compose up -d
```

Because of this you will need to git clone the project manually at first time on the remote server. You will also need to create `.env` file for the backend with below environmental variables. To use this deplyment setup on your Github repository you need to create ssh secret keys, refer the ssh-action document.

```json
ACCESS_TOKEN=to access assignment api if you already have token
API_EMAIL= to login to assignment api if the token expires
API_PASSWORD= to login to assignment api if the token expires
```

### Developement

The project is not set up for live reload while developing since the project was small. If you want live reload check this [gist](https://gist.github.com/ksmithut/e126f7ddb40b760487a17e8b569a77b5) to set it up, basically

- Install `nodemon` as dev dependency
- Create `Docker.dev` file referring the gist above for each app (backend and frontend)
- update `docker-compose.yml` file to use `Docker.dev` file instead of `Docker` file
