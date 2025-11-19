FROM node:20-alpine AS base
LABEL org.opencontainers.image.source https://github.com/dump-hr/internship-app

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=code-runner --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install --immutable && yarn cache clean

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN yarn turbo run build --filter=code-runner...

FROM base AS runner
WORKDIR /app
EXPOSE 3003
HEALTHCHECK CMD curl -f http://localhost:3003/run/healthz || exit 1

RUN apk add --no-cache \
      curl \
      build-base \
      python3 \
      openjdk17 \
      go \
      musl-dev
RUN wget https://packages.microsoft.com/config/alpine/3.18/packages-microsoft-prod.apk \
    -O packages-microsoft-prod.apk && \
    apk add --no-cache packages-microsoft-prod.apk && \
    apk update && \
    apk add --no-cache dotnet6-sdk


# Don't run production as root
RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1001 nestjs
USER nestjs
COPY --from=installer --chown=nestjs:nestjs /app .

CMD node apps/code-runner/dist/main.js
