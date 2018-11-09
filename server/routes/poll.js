/**
 * certain handler() requires header token authenticated
 * i.e. user has to login w password to CRUD DB
 */
const router = require('express').Router();
const handle = require('../handlers');
// middleware to verify token in header when router parsing http
const auth = require('../middleware/auth');

// api/polls/
router
  .route('/')
  .get(handle.showPolls) // if "GET" method
  .post(auth, handle.createPoll); // if "POST" method

// api/polls/user
router.get('/user', auth, handle.usersPolls);

// api/polls/:id
router
  .route('/:id') // specific post id
  .get(handle.getPoll)
  .post(auth, handle.vote)
  .delete(auth, handle.deletePoll);

module.exports = router;
