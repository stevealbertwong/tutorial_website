/**
 * index.js
 * const routes = require('./routes');
 * app.use('/api/auth', routes.auth);
 * app.use('/api/polls', routes.poll);
 */

 // index.js -> const routes = require('./routes');
module.exports.auth = require('./auth');
module.exports.mc = require('./mc');
