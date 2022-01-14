# TODO: look into multistage builds

FROM node:17.3.0-alpine3.14
WORKDIR /usr/src/app

COPY package*.json .
COPY client/package*.json ./client/
COPY common/config/package*.json ./common/config/
COPY server/package*.json server/tsconfig.json ./server/
RUN npm install

# treat the common packages as static
COPY common ./common
RUN npm run --workspace=common/config build
