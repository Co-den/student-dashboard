/**
 * requireRole('admin') or requireRole('instructor','admin')
 * Usage: router.post('/', auth, requireRole('instructor'), controller.create)
 */
module.exports = function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Auth required' });
    if (allowedRoles.length === 0) return next();
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: insufficient privileges' });
    }
    next();
  };
};
