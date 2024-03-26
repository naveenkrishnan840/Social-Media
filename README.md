# Getting Started with Social Media Networking Application

# What are the tech used 
# Frontend - Javascript, React, 
# Backend - Python, Django
# Backend - SQLITE

## Available Scripts to ru application with Docker 

Inside main directory Social-Media

To build dockerize the application
### `docker compose build`
And run individual container

Backend docker
### `docker compose run social_media_backend`

Frontend docker
### `docker compose run social_media_frontend`

This Scripts at a time build & run tow container (frontend & backend)
### `docker compose up --build`

Up the container
### `docker compose up`

Stop the container
### `docker compose stop`

Frontend libraies
mention in package.json

main Url to RUn the application
### `http://localhost:3000/signin`

Backend URl api call to the get records

### `http://127.0.0.1:8081/`


Run locally frontend 
Inside social_media_frontend
### `npm install`
### `npm start`

Run locally backend 
Inside social_media_backend directory
first actviate env 
### `.venv/Scripts/activate`

Inside social_media_project directory
### `python manage.py makemigrations`
### `python manage.py migrate`
### `python manage.py runserver 8081`

Deactivate the env
Inside social_media_backend directory
### `deactivate`


Logic Behind backend:
Two table are used 
tbl_users, tbl_friend_request_status

