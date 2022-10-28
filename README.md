<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Dev

1. Clone repository
2. Install dependencies

```bash
yarn
# or
npm Install
```

3. Rename `.env.template` to `.env` and set environment variables to use
4. Run only database container

```bash
docker compose up
# or detached
docker compose up -d
```

5. Run api with hot reload

```bash
yarn start:dev
# or
npm start:dev
```

6. [GraphQL URL](http://localhost:3000/graphql)

```
http://localhost:3000/graphql
```

1. [Auth URL](http://localhost:3000/api/v1/auth)

```
http://localhost:3000/api/v1/auth
```

## Stack

- [Nest](https://nestjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [GraphQL](https://graphql.org/)
