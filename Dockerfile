# TODO: look into multistage builds

FROM node:17.3.0-alpine3.14
WORKDIR /usr/src/app

COPY package*.json .
COPY client/package*.json ./client/
COPY server/package*.json ./server/
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
