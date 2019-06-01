# ts-express

express api using mongodb+mongoose and written in typescript

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
yarn run dev
```

**to compile and run:**
```shell
yarn run start
```

**to create an entity:**
```shell
curl -X "POST" http://localhost:8080/api/entities -H "Content-Type: application/json" -d '{\"name\":\"Margaret\"}'
```

**to get entities:**
```shell
curl http://localhost:8080/api/entities
```

**todo:**
- authentication using jwt
- automated tests
- refactor services to use data transfer objects
- refactor/expand error handler
