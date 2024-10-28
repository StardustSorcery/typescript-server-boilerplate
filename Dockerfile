FROM node:20.18.0-bullseye-slim AS base
ENV NPM_CONFIG_UPDATE_NOTIFIER=false


######## BUILDER STAGE ########
FROM base AS builder
ARG APP

WORKDIR /project

# install dev deps
COPY ./package.json ./package-lock.json ./
RUN npm install --no-progress

# test and build
COPY . .
RUN npm run test:app:${APP}
RUN npm run build:${APP}


######## RUNNER STAGE ########
FROM base AS runner
ARG APP
ARG PORT=3000
ENV NODE_ENV=production

WORKDIR /app
RUN chown node:node /app

# tini
RUN apt-get update && apt-get install tini
ENTRYPOINT ["/usr/bin/tini", "--"]

# switch user
USER node

# install prod deps
COPY --chown=node:node ./package.json ./package-lock.json ./
RUN npm install --no-progress

# copy prod app
COPY --chown=node:node --from=builder /project/app/${APP}/build/server.js ./

# run
ENV PORT=${PORT}
ENV TZ=Asia/Tokyo

EXPOSE ${PORT}

CMD ["node", "server.js"]

