FROM node:14.18.2-slim as build

WORKDIR /app

COPY ./package.json ./yarn.lock /app/
COPY . /app/

RUN yarn --frozen-lockfile

RUN yarn install

CMD ["yarn", "start"]

