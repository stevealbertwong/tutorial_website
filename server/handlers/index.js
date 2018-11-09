// router handlers that async calls mongo server
module.exports = {
  ...require('./auth'),
  ...require('./mc'),
};

// 500 error handler
module.exports.error = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    error: {
      message: err.message || 'Something went wrong.',
    },
  });
};
