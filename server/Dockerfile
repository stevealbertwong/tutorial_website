FROM node:9
FROM node:latest

WORKDIR /app
COPY package-lock.json .
COPY package.json .
RUN npm install
ENV NODE_ENV production

COPY 

EXPOSE 3000
CMD node index.js