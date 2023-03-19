# Docker file for assignment 2 fragments-ui
# Stage 0: Install base dependecies

FROM node:16.17.0@sha256:a5d9200d3b8c17f0f3d7717034a9c215015b7aae70cb2a9d5e5dae7ff8aa6ca8 AS dependencies

LABEL maintainer="Ricky Chen <rchen100@myseneca.ca>" \
description="fragments-ui web app for testing"

ENV NODE_ENV=production \
NPM_CONFIG_LOGLEVEL=warn \
NPM_CONFIG_COLOR=false \
PORT=8080

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

FROM node:16.17.0@sha256:a5d9200d3b8c17f0f3d7717034a9c215015b7aae70cb2a9d5e5dae7ff8aa6ca8 AS builder


WORKDIR /app
COPY --from=dependencies /app /app

COPY . . 

RUN npm run build

FROM nginx:1.22.0-alpine@sha256:addd3bf05ec3c69ef3e8f0021ce1ca98e0eb21117b97ab8b64127e3ff6e444ec AS deploy

COPY --from=builder /app/dist/. /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl.exe -f http://localhost/80 || exit -1



