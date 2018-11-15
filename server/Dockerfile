FROM node:latest
WORKDIR /app
COPY package-lock.json .
COPY package.json .
COPY server .
RUN npm install
ENV NODE_ENV production
EXPOSE 4000
CMD node index.js

# ARG NPM_REGISTRY
# ARG NPM_USERNAME
# RUN echo "@edge http://nl.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
#   && apk update \
#   && apk add \
#     build-base \
#     libtool \
#     autoconf \
#     automake \
#     jq \
#     openssh \
#     python \
#     libexecinfo-dev@edge \
#   && npm install -g npm-cli-login \
#   && npm-cli-login \
#     -r $NPM_REGISTRY \
#     -u $NPM_USERNAME \
#     -p $NPM_PASSWORD \
#     -e $NPM_EMAIL \
#     -s @lexica