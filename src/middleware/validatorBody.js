/**
 * validateBody(['name','email']) — ensures required keys exist and are non-empty.
 * For complex validation swap-in joi/zod/express-validator.
 */
module.exports = function validateBody(required = []) {
  return (req, res, next) => {
    const missing = [];
    required.forEach((key) => {
      const v = req.body?.[key];
      if (v === undefined || v === null || (typeof v === 'string' && v.trim() === '')) {
        missing.push(key);
      }
    });
    if (missing.length) {
      return res.status(400).json({ error: `Missing required field(s): ${missing.join(', ')}` });
    }
    next();
  };
};
