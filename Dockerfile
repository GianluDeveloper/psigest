FROM node:15-alpine

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD sleep 10 ; node server.js
EXPOSE 8080


