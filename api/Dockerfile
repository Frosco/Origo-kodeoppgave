FROM node:14.17-alpine3.13 as typescriptBuild
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
WORKDIR /node_modules/.bin
RUN ./tsc

FROM node:14.17-alpine3.13 AS prod
WORKDIR /bike-api
COPY package.json .
COPY package-lock.json .
RUN npm ci --production
COPY --from=typescriptBuild ./bin .
CMD node server.js

EXPOSE 30