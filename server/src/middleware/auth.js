/**
 * router to check client has authorization to access API
 * middleware that decodes token in header 'authorization'
 * 
 * certain packets has token in header 
 * only if packet 'authenticated' -> runs handler()
 * 
 * token is NOT payload, payload == other user input
 */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.headers['authorization']) {
    const token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        // res.json({
        //   success: false,
        //   message: 'Failed to authenticate token',
        // });
        next(Error('Failed to authenticate token'));
      } else {
        req.decoded = decoded;
        next(); // next() == middleware == function called before another function
      }
    });
  } else {
    // res.status(403).json({
    //   status: false,
    //   message: 'No token provided',
    // });

    next(Error('No token provided'));
  }
};
