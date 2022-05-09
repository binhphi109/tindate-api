# tinder-api

## Author

Binh-Phi Nguyen
binhphi109@gmail.com

## Table of Contents

- [Installation](#installation)
- [Features](#features)

## Installation

You can either run it manually or using Docker commands to spawns up all the stack components.

#### Manually

1. Go to `tinder-api`
2. Update `.env` file to your MongoDb connection.
3. Run the following commands:
   1. `npm install`
   2. `nodemon`

You can now access to API-Endpoints through [http://localhost:3000/](http://localhost:3000/).

#### Docker

Run the following commands: `docker-compose up`

You can now access to API-Endpoints through

- [http://localhost:3000/](http://localhost:3000/).

## Postman collection

You can use find sample requests in the `postman` folder.

## Features

- [x] Discover
- [x] Like/Pass User
- [x] Like List
- [x] Match List
