<h1 align="center">DUMP Internship App</h1>

DUMP Internship companion app

## Development

#### Dependencies

- Node.js >=18 and yarn
- PostgreSQL >= 15

#### Install dependencies

```
yarn
```

#### Setup environment

Create `.env.local` file that can override configuration options from `.env` in web/api apps.

Required variables for `api`:
- `DATABASE_URL`

#### Run database migrations

```
yarn prisma migrate dev
```

#### Run database seed

```
yarn prisma db seed
```

#### Run app

```
yarn dev
```

App is now accessible on <http://localhost:5173/>. API routes are prefixed with `/api`.

## Cookbook

#### Add new dependency

example: add `react-hot-toast` library to `web` app

```
yarn workspace web add react-hot-toast
```

## Useful resources

- [NestJS + Vite setup with Turborepo](https://youtu.be/nY0R7pslbCI)
- [NestJS Prisma setup recipe](https://docs.nestjs.com/recipes/prisma)
- [Let’s build a REST API with NestJS and Prisma](https://youtu.be/LMjj1_EK4y8)