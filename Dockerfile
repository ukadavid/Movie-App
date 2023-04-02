FROM node:16-alpine

WORKDIR /app

COPY . .

COPY package*.json yarn.lock ./

RUN yarn 

CMD ["node", "bin/www"]

EXPOSE 3000