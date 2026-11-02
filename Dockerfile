ARG NODE_VERSION=26
ARG PNPM_VERSION=12
FROM ghcr.io/pnpm/pnpm:${PNPM_VERSION} AS base
ARG NODE_VERSION
RUN pnpm runtime set node ${NODE_VERSION} -g

WORKDIR /app

RUN ulimit -c unlimited

FROM base AS build

COPY package.json pnpm-lock.yaml ./

RUN pnpm ci

COPY . .

RUN pnpm run build

RUN pnpm prune --omit=dev

FROM base AS deploy
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY docker/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
