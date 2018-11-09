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



## Starts Node Server n Mongo Server

```
npm init    ## create package.json

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


nodemon --exec babel-node src/index.js  ## dev

babel src -d dist       ## when code gets updated
node dist/index.js      ## production


```


## Starts Client server
```
npm install -g create-react-app

create-react-app client         ## init standard React project files e.g. package.json, /src, /public 

react-scripts build     ## transpile all React files into 1 JS file bundle.js

npm start       ## cross-env PORT=4100 react-scripts start

```


## Deployment
```
mongod   

cd /server
npm start           ## nodemon index.js
node seed.js        ## seed mongo DB

cd /client      
npm start           ## cross-env PORT=4100 react-scripts start

```

## Docker Deployment
```
ssh EC2

scp docker-compose.yml nginx.conf

git clone repo               ## /client + /server

## compile frontend first, then docker-compose web, nginx to serve static assets w "shared volume" ??

cd /client
react-scripts build         ## auto output to /build
surge                       ## ?? web server w domain name

react-scripts build; mv ./build/index.html ./build/200.html; echo overt-health.surge.sh > build/CNAME; surge                 ## after build, rename html, save domain name into CNAME file, then upload static assets to web server w domain name

OR alternatively
build static files into existing nginx image
then no need to worry about volume when docker swarm


cd /server
babel src -d dist           ## tranlate right node syntax
docker build -t steven/server:latest ## Dockerfile build fs
docker push steven/image:latest     ## docker cloud
docker compose up           ## update image to registry image



## when updated code or Dockerfile -> rebuild fs
babel src -d dist
docker build -t image


chmod 777 /files

```


## My Deployment
```
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

### TODO: 
- register docker cloud
- nginx.conf