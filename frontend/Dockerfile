FROM node:14.17-alpine3.13 AS build
WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.20-alpine AS prod
COPY --from=build build /usr/share/nginx/html
EXPOSE 80