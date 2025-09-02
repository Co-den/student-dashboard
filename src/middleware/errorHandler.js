// src/middleware/errorHandler.js
module.exports = function errorHandler(err, req, res, next) {
  // Log stack in non-test environments
  if (process.env.NODE_ENV !== 'test') {
    console.error(err.stack || err);
  }

  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Provide additional error info only in development
  const payload = { error: message };
  if (process.env.NODE_ENV === 'development') {
    payload.stack = err.stack;
    payload.name = err.name;
  }

  res.status(status).json(payload);
};
