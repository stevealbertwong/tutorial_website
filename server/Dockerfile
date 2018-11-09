FROM node:latest
WORKDIR /app
COPY package-lock.json .
COPY package.json .
COPY server .
RUN npm install
ENV NODE_ENV production
EXPOSE 3000
CMD node index.js