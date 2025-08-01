FROM node:18-alpine AS base
LABEL org.opencontainers.image.source https://github.com/dump-hr/internship-app

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/out/full/apps/api/prisma ./apps/api/prisma
RUN yarn install --immutable && yarn cache clean

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN yarn turbo run build --filter=api...

FROM base AS runner
WORKDIR /app
EXPOSE 3000
HEALTHCHECK CMD curl -f http://localhost:3000/api/healthz || exit 1
RUN apk add --no-cache curl openssl

# Don't run production as root
RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1001 nestjs
USER nestjs
COPY --from=installer --chown=nestjs:nestjs /app .
COPY --chown=nestjs:nestjs apps/web/dist ./apps/web/dist

CMD node apps/api/dist/src/main.js
