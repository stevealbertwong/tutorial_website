FROM node_mongo_installed_image:latest
WORKDIR /app
COPY package-lock.json .
COPY package.json .
COPY seed.js .
RUN npm install
RUN node seed.js
CMD mongod