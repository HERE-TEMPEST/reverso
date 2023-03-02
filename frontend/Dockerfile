FROM node:14.18.2-slim as build

WORKDIR /app

COPY ./package.json ./yarn.lock ./lerna.json /app/

# Dependencies
COPY ./packages/frontend /app/packages/frontend
COPY ./packages/typings /app/packages/typings

RUN yarn --frozen-lockfile

RUN yarn install

RUN yarn lerna bootstrap

RUN yarn lerna exec yarn run build --parallel --scope=@iis/frontend --include-dependencies

FROM node:14.18.2-slim

WORKDIR /app

COPY --from=build /app/packages/frontend/node_modules /app/packages/frontend/node_modules
COPY --from=build /app/packages/frontend/build /app/packages/frontend/build
COPY --from=build /app/packages/frontend/main.js /app/packages/frontend/
COPY --from=build /app/packages/typings /app/packages/typings
COPY --from=build /app/node_modules /app/node_modules

CMD ["node", "packages/frontend/main"]

