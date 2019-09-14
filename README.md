# galaxy-express

[![Build Status](https://travis-ci.com/apecranium/galaxy-express.svg?branch=master)](https://travis-ci.com/apecranium/galaxy-express)

express api using mongodb+mongoose and written in typescript

this app is mostly an exercise to demonstrate different things i'm learning in 2019 (e.g. typescript, mongo), and not for production anywhere. please feel free to reach out if you find anything interesting.

**install:**
```shell
yarn
```

**start database:**
```shell
mongod --dbpath="./data"
```

**for hot restart with nodemon and ts-node:**
```shell
yarn dev
```

**to compile and run:**
```shell
yarn start
```

**to create an entity:**
```shell
curl -X "POST" http://localhost:8081/api/entities -H "Content-Type: application/json" -d '{\"name\":\"Margaret\"}'
```

**to get entities:**
```shell
curl http://localhost:8081/api/entities
```

**todo:**
- ~~authentication using jwt~~
- automated tests
- ~~refactor services to use data transfer objects~~
- ~~refactor/expand error handler~~
- explore postgres+typeorm as database layer
