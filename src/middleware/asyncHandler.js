// src/middleware/asyncHandler.js
/**
 * Optional if you use express-async-errors. This wrapper is useful when you
 * prefer explicit try/catch-less handlers:
 *
 * router.get('/', asyncHandler(async (req,res)=>{ ... }));
 */
module.exports = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
