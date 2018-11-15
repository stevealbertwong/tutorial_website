## Docker compose 
```
docker rm `docker ps -aq` 			-> -aq returns all containers IDs
docker rmi $(docker images -q)		-> rm image
docker-compose up
```

## Node Server 

```
npm init    ## create package.json

cd server/src
npm install     ## if package.json already pre-configed

npm install express     ## create package-lock.json, node_module

npm install -D nodemon

npm install dotenv body-parser cors      ## env variable, read request body, resolve cross origin request problem whn communicating with client

npm install mongoose

npm install bcryptjs
npm install jsonwebtokens
npm install slug

mongod                  ## start mongo server
npm start               ## start app server, nodemon index.js
npm seed                ## node seed.js

npm start

or alternatively 

nodemon --exec babel-node src/index.js  ## dev

babel src -d dist       ## when code gets updated
node dist/index.js      ## production

## docker 

docker build --rm --no-cache -t stevealbertwong/tutorial-appserver:latest .		## built app server image from Dockerfile

docker run -it stevealbertwong/tutorial-appserver:latest sh  ## debug

docker run --net mongo_mnet -p 3000:3000 stevealbertwong/tutorial-appserver:latest



```

## Mongo server
```
## install mongo
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4

echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list

sudo apt-get update

sudo apt-get install -y mongodb-org



## starts Mongo
mongo       ## start client i.e. commnad prompt to query mongod

mongod      ## start server without config, likely crash in linux since db file path wrong + other config issue

## start server w your custom mongod data
## when mongod runs as group mongodb instead of ubuntu(daemon, service mongo start), needs permission to write to directory
## still cannot run .. -> must load config instead just provide 1 part of config
sudo mongod --dbpath $(grep dbpath /etc/mongodb.conf) 

## db data permission issue
sudo chown mongodb:mongodb -R /var/lib/mongodb      ## make mongodb the owner 

sudo chmod 775 -R /var/lib/mongodb      ## let mongodb group write as well  

sudo mongod --config /etc/mongodb.conf      ## custom config

sudo service mongod start   ## start w config, upstart
sudo service mongod stop
sudo service mongod restart

sudo systemctl restart mongod   ## SystemD
sudo systemctl status mongod    ## check status of daemon/service
sudo journalctl -u mongod       ## view logs of daemon/service

ps -xa | grep mongod        ## shows --dbpath n --config

grep dbpath /etc/mongodb.conf       ## debug database location, /data/db or /var/lib/mongod

sudo lsof -p `ps aux | grep mongodb | head -n1 | tr -s ' ' | cut -d' ' -f 2` | grep REG
## your database files will be present on the list

mkdir -p /data/db/      ## -p: if parent does not exist, create parent as well

## docker 
https://techsparx.com/software-development/docker/damp/mongodb.html - mongo connects to mongod in same network, persist database, mongo express

https://stackoverflow.com/questions/31210973/how-do-i-seed-a-mongo-database-using-docker-compose - mongoimport 

https://github.com/fvilers/docker-mongo-seed - mongoimport 

https://blog.philipphauer.de/local-development-docker-compose-seeding-stubs/ - seed.js

https://stackoverflow.com/questions/18496940/how-to-deal-with-persistent-storage-e-g-databases-in-docker?rq=1

https://stackoverflow.com/questions/34559557/how-to-enable-authentication-on-mongodb-through-docker


docker network create mnet      ## mongo network for mongo, mongoimport, mongoexpress client -> mongod server

docker network inspect mnet

docker run --name mongod-server --net mnet -p 27017:27017 mongo
docker kill mongod-server
docker stop mongod-server
docker rm mongod-server     


docker-compose up       ## starts mongo, mongoimport quits after seeding mongo

docker build --rm --no-cache -t stevealbertwong/test-mongoseed:latest .

docker run -it --rm --net mnet mongo sh -c 'exec mongo --host mongod-server'        ## mongo sh client

docker run --name mongod-server --net mnet -p 27017:27017 mongo
docker run --net mnet -e MONGO_HOST=mongo,MONGO_PORT=27017 stevealbertwong/test-mongoseed
docker run -it --rm --net mongoseed_default mongo sh -c 'exec mongo --host mongo' ## if not specify network in docker-compose.yml
docker run -it --rm --net mongoseed_mnet mongo sh -c 'exec mongo --host mongo'


```

## Nginx server serves React, transpile React
```
https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04

https://blog.phusion.nl/2015/01/20/docker-and-the-pid-1-zombie-reaping-problem/  - why ENTRYPOINT [nginx, -g, daemon off;]

?? 
after npm react-scripts build 
index.html build folder serves a blank page ??

## install nginx
sudo apt-get update
sudo apt-get install nginx

## reconfigure firewall to allow access to the service. 
## Nginx registers itself as a service with ufw upon installation

sudo ufw enable
sudo ufw default deny
sudo ufw app list       ## listing of application profile
sudo ufw status
sudo ufw allow 'Nginx Full'     ## http(80) n https(443) 

## config
cat /etc/nginx/nginx.conf       ## global config
/etc/nginx      ## default config fragment

## update symlink  /etc/nginx/sites-enabled/default 
ls -lthra /etc/nginx/sites-enabled/

sudo ln -sfn /home/steve/Desktop/tutorial_website/nginx/nginx.conf /etc/nginx/sites-enabled/default     ## default points at your nginx.conf

sudo ln -sfn /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
## revert back, sites-enabled/default points at sites-available/default 

## build React static assets folder
git clone [Your repository URL]
cd [Your Repository Name]
sudo npm install
sudo npm run build

## static assets folder
sudo mkdir /var/www
cd /var/www/

sudo gpasswd -a "$USER" www-data
sudo chown -R "$USER":www-data /var/www
find /var/www -type f -exec chmod 0660 {} \;
sudo find /var/www -type d -exec chmod 2770 {} \;

sudo chmod 777
cp -R ./build/ .
mv ./build/ .

## update nginx html symlink from ../../../var/www to ../../../var/www/testjs 
## s == soft link, create a new symlink, f == folder, n == update OR just delete then create a new one, i == receives prompt before overwriting
## all folder tree must have open permission => easier to just use original folder
ln -sfn  ../../../var/www/testjs html  ## create symlink called html that points to ../../../var/www/testjs
ln -sfn ../../../var/www html  ## bring back to default setting, nginx server set to serve index.html inside html in config
ls -lthr ## check symlink



NGINX MANAGEMENT

## port nginx listening on 
sudo netstat -tupln 
ps -xa | grep nginx

sudo systemctl status nginx.service
sudo systemctl stop nginx
sudo systemctl start nginx
sudo systemctl restart nginx
sudo systemctl reload nginx
sudo systemctl disable nginx
sudo systemctl enable nginx     ## run nginx on startup

sudo service nginx status

nginx –s stop Stops the daemon immediately (using the TERM signal).
nginx –s quit Stops the daemon gracefully (using the QUIT signal).
nginx –s reopen Reopens the log files.
nginx –s reload Reloads the configuration.


## journalctl => view systemd logs
## -u: filter message of interest => specific unit/service file e.g. see all logs from Nginx unit
journalctl -u nginx.service
journalctl -u nginx.service --since today
journalctl -u ssh # same as journalctrl -u ssh.service
journalctl -b -u nginx -o json-pretty


docker build --rm -t stevealbertwong/tutorial-nginx:latest . ## Dockerfile build fs

docker build --rm --no-cache -t stevealbertwong/tutorial-nginx:latest . ## rebuild not using cache

docker images
docker login
docker push stevealbertwong/tutorial-nginx:latest     ## docker cloud

sudo docker kill/stop/rm <containerID>

docker run --rm -d -p 80:80 stevealbertwong/tutorial-nginx:latest       ## run nginx

docker run -it stevealbertwong/tutorial-nginx:latest sh     ## rebuild image w no CMD/ENTRYPOINT, login to debug



## view container(even exited) log to debug
docker ps -a        ## all containers ID etc.
docker logs <containerID>

```


## Client server
```
https://github.com/nodesource/distributions/blob/master/README.md#deb
## install node

sudo apt-get update
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -         ## install from node repo, not linux repo for latest version
sudo apt-get install -y nodejs
sudo apt-get install npm
suudo apt install nodejs-legacy

sudo apt install npm    ## not necessary if Dockerfile FROM node:latest

npm install         ## install react-scripts + other node modules

npm react-scripts build     ## transpile all React files into 1 JS file bundle.js

npm run build           ## same as npm react-scripts build 

npm start       ## cross-env PORT=4100 react-scripts start



```


## Create new React project -> debug React node modules
```
npm install -g create-react-app

create-react-app client         ## init standard React project files e.g. package.json, /src, /public 
```

## Deployment without Docker
```
sudo apt install -y mongodb-server
mkdir /data/db
mongod 
# mongod --dbpath     ## your db path

cd /server
npm start           ## nodemon index.js
node seed.js        ## seed mongo DB

cd /client      
npm start           ## cross-env PORT=4100 react-scripts start

pm2 serve build     ## same as "npm start", PM2 use Serve to display index.html

```

## docker-compose single node deployment
https://hub.docker.com/_/nginx/

```
ssh EC2

git clone repo

## compile frontend first, then docker-compose web, nginx to serve static assets w "shared volume" ??

## build static files into existing nginx image
then no need to worry about volume when docker swarm
cd ./client
sudo npm run build         ## auto output to /build
mv ./build ./nginx/build/
docker build --rm --no-cache -t stevealbertwong/tutorial-nginx:latest . 

docker-compose up


OR alternatively
surge                       ## ?? web server w domain name

react-scripts build; mv ./build/index.html ./build/200.html; echo overt-health.surge.sh > build/CNAME; surge                 ## after build, rename html, save domain name into CNAME file, then upload static assets to web server w domain name



cd /server
babel src -d dist           ## tranlate right node syntax


docker run -it --name container_name -v volume_name:/container_path ubuntu bash 

docker compose up           ## update image to registry image


## when updated code or Dockerfile -> rebuild fs
babel src -d dist
docker build --rm -t image .


chmod 777 /files

```




## Locally Built Deployment
```
## on your own linux machine
cd server/
docker build -t steven/node:latest .
docker push steven/node:latest

cd nginx/
docker build -t steven/nginx:latest .
docker push steven/nginx:latest

cd mongo/
docker build -t steven/mongo:latest .
docker push steven/mongo:latest

## on EC2
ssh EC2 
scp docker-compose.yml nginx.conf
docker compose up
```

## Single Node Deployment
```
## all steps on EC2
ssh EC2 
git clone repo

cd server/
docker build -t steven/node:latest
docker push steven/node:latest

cd nginx/
docker build -t steven/nginx:latest
docker push steven/nginx:latest

cd mongo/
docker build -t steven/mongo:latest
docker push steven/mongo:latest

docker compose up

```


## Goal
```
ssh EC2
git clone repo
docker compose up
```

**Others**

- package.json
    - "npm start" abstraction of "nodemon index.js" or "cross-env PORT=4100 react-scripts start"
    - "npm build" -> "react-scripts build"
- package-lock.json
    - express's dependencies 
- Include a .env file in the server directory with the following environment variables

```

## .env 

PORT = 4000
DATABASE = 'mongodb://localhost/<DATABASE_NAME>'
SECRET = 'ThisIsATemporarySecretKey'

## .gitignore: go to gitignore.io to create

```

### TODO: 
- register docker cloud
- frontend routing
- nginx.conf
- https, SSL 
    - keith the coder
- frontend error handling if mongo/app server not available







































# ![React + Redux Example App](project-logo.png)

> ### React + Redux codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld-example-apps) spec and API.

<a href="https://stackblitz.com/edit/react-redux-realworld" target="_blank"><img width="187" src="https://github.com/gothinkster/realworld/blob/master/media/edit_on_blitz.png?raw=true" /></a>&nbsp;&nbsp;<a href="https://thinkster.io/tutorials/build-a-real-world-react-redux-application" target="_blank"><img width="384" src="https://raw.githubusercontent.com/gothinkster/realworld/master/media/learn-btn-hr.png" /></a>

## Conduit

To get the frontend running locally:

- Clone this repo
- `npm install` to install all req'd dependencies
- `npm start` to start the local server (this project uses create-react-app)

Local web server will use port 4100 instead of standard React's port 3000 to prevent conflicts with some backends like Node or Rails. You can configure port in scripts section of `package.json`: we use [cross-env](https://github.com/kentcdodds/cross-env) to set environment variable PORT for React scripts, this is Windows-compatible way of setting environment variables.
 
Alternatively, you can add `.env` file in the root folder of project to set environment variables (use PORT to change webserver's port). This file will be ignored by git, so it is suitable for API keys and other sensitive stuff. Refer to [dotenv](https://github.com/motdotla/dotenv) and [React](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-development-environment-variables-in-env) documentation for more details. Also, please remove setting variable via script section of `package.json` - `dotenv` never override variables if they are already set.  

### Making requests to the backend API

For convenience, we have a live API server running at https://conduit.productionready.io/api for the application to make requests against. You can view [the API spec here](https://github.com/GoThinkster/productionready/blob/master/api) which contains all routes & responses for the server.

The source code for the backend server (available for Node, Rails and Django) can be found in the [main RealWorld repo](https://github.com/gothinkster/realworld).

If you want to change the API URL to a local server, simply edit `src/agent.js` and change `API_ROOT` to the local server's URL (i.e. `http://localhost:3000/api`)

