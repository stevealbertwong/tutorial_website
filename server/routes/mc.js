/**
 * 1 file path, 1 method, 1 handler
 */
const router = require('express').Router();
const handle = require('../handlers');
const auth = require('../middleware/auth');

router
  .route('/') // if localhost:4000/api/mc/ 
  .get(handle.getAllMCs) // if "GET" method 

module.exports = router;
