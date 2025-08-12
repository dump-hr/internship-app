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

Run `docker compose up` in separate terminal or follow steps below if you already have postgres server running locally.

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

### React component template

```tsx
type Props = {
  value: number;
}

export const Counter: React.FC<Props> = ({ value }) => {
  return <div>{value}</div>
}
```


## Useful resources

- [NestJS + Vite setup with Turborepo](https://youtu.be/nY0R7pslbCI)
- [NestJS Prisma setup recipe](https://docs.nestjs.com/recipes/prisma)
- [Let’s build a REST API with NestJS and Prisma](https://youtu.be/LMjj1_EK4y8)
- [TypeScript Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gUgr39Q_yD6v-bSyMwKPUI)
- [React Query Tutorial](https://www.youtube.com/watch?v=8K1N3fE-cDs)
- [React Hook Form with ZOD Tutorial](https://www.youtube.com/watch?v=dldjCPa9ZW4)
