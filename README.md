<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# [ NEST ] PostgreSQL template

1. Clone repository
2. Install dependencies

```bash
yarn
# or
npm Install
```

3. Rename `.template.env` to `.env` and set environment variables to use
4. Run only database container

```bash
docker compose up
# or detached
docker compose up -d
```

5. Run api in dev mode

```bash
yarn start:dev
# or
npm start:dev
```

## Database connections strings

```bash
# Running only database container
jdbc:postgresql://<host>:<port>/<db_name>

# Running production container
jdbc:postgresql://0.0.0.0:<port>/<db_name>
```

## Production container

1. Build image

```bash
docker compose -f docker-compose.prod.yaml up --build
```

2. Run image

```bash
docker compose -f docker-compose.prod.yaml up
# or detached
docker compose -f docker-compose.prod.yaml up -d
```

## Stack

- Nest
- PostgreSQL
