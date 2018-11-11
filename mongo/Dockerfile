FROM node_mongo_installed_image:latest
WORKDIR /app
COPY package-lock.json .
COPY package.json .
COPY seed.js .
RUN npm install
RUN node seed.js
CMD mongod
# CMD ["/usr/bin/mongod", "--config", "/etc/mongodb.conf"] 


FROM ubuntu

## install node
RUN apt-get install -y python-software-properties python python-setuptools ruby rubygems
RUN add-apt-repository ppa:chris-lea/node.js
RUN echo "deb http://us.archive.ubuntu.com/ubuntu/ precise universe" >> /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y nodejs 

## install mongo
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
RUN echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | tee -a /etc/apt/sources.list.d/10gen.list
RUN apt-get -y update
RUN apt-get -y install mongodb-10gen