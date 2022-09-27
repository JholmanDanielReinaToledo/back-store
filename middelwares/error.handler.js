function logErrors (err, req, res, next) {
  console.log(err);
  next(err);
}

function errorHandler (err, req, res, next) {
  res.statatus(500).json({
    message: err.message,
    stack: err.stack,
  });
}

module.exports = { logErrors, errorHandler };
