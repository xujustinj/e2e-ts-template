# crudely sets up a Docker image with a production build of this client

# TODO: look into https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

FROM node:17.3.0-alpine3.14
WORKDIR /usr/src/app

COPY package*.json tsconfig.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
