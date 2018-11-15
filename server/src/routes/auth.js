/**
 * config Express Router object, used in app.js
 * 
 * // import from 
 * module.exports.auth = require('./auth');
 * module.exports.poll = require('./poll');
 * 
 * // export to 
 * const routes = require('./routes');
 * app.use('/api/auth', routes.auth);
 * app.use('/api/polls', routes.poll);
 * 
 */
const router = require('express').Router();
const handle = require('../handlers');

// localhost:4000/api/auth
router.get('/', handle.getUsers); // for development only
// localhost:4000/api/auth/login
router.post('/login', handle.login); // post request
// localhost:4000/api/auth/register
router.post('/register', handle.register);

module.exports = router;
