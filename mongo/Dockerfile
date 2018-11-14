FROM node:latest
## install mongo -> https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
RUN sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
RUN echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
RUN sudo apt-get update
RUN sudo apt-get install -y mongodb-org

WORKDIR /app
COPY package-lock.json .
COPY package.json .
COPY seed.js .
RUN npm install
RUN node seed.js
CMD mongod
# CMD ["/usr/bin/mongod", "--config", "/etc/mongodb.conf"] 


# FROM ubuntu
# ## install node
# RUN apt-get install -y python-software-properties python python-setuptools ruby rubygems
# RUN add-apt-repository ppa:chris-lea/node.js
# RUN echo "deb http://us.archive.ubuntu.com/ubuntu/ precise universe" >> /etc/apt/sources.list
# RUN apt-get update
# RUN apt-get install -y nodejs 
# ## install mongo
# RUN apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
# RUN echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | tee -a /etc/apt/sources.list.d/10gen.list
# RUN apt-get -y update
# RUN apt-get -y install mongodb-10gen