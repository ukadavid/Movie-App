FROM node:18-alpine AS build

WORKDIR /app

COPY . .

RUN yarn

RUN yarn add typescript

RUN yarn tsc

FROM node:18-alpine AS app

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY package.json .

COPY package-lock.json .

RUN yarn --production

COPY bin ./bin

COPY .env ./env

COPY public ./public

COPY views ./views

COPY movieDatabase.sqlite ./movieDatabase.sqlite

CMD ["node", "bin/www"]

EXPOSE 3000