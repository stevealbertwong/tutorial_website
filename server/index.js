/**
 * 1. app server plugin e.g. bodyparser, cors etc
 * 2. router n error handler
 * 3. 
 * 
 */
require('dotenv').config(); // so could use .env

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// ./ -> importing your own node lib LOL
const routes = require('./routes');
const handle = require('./handlers');

const app = express();
const PORT = process.env.PORT || 4000; // see .env
app.use(cors());
app.use(bodyParser.json()); // Turn http request format into JSON n make it easy to parse/use
app.use(bodyParser.urlencoded({ extended: true }));

// has to be before error handler !!!!!
app.use('/api/auth', routes.auth);
app.use('/api/mc', routes.mc);

// "not found" error handler i.e. url file path that does not have handler
app.use((req, res, next) => {
  let err = new Error('Not Found hahaha');
  err.status = 404;
  next(err);
});
// 500 "something went wrong" error handler, hit before server crashes
app.use(handle.error);


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
