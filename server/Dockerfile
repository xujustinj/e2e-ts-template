FROM node:17.3.0-alpine3.14
WORKDIR /usr/src/app
COPY package*.json tsconfig.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"]
