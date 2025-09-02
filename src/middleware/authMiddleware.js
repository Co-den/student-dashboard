// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * protect
 * - Verifies Bearer token
 * - Loads user (without password)
 * - Attaches req.user
 */
export const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    if (!header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const token = header.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // We expect user id in payload.sub (standard JWT subject field)
    const user = await User.findById(payload.sub).select("-password");
    if (!user) return res.status(401).json({ message: "Invalid token user" });

    req.user = user; // { _id, name, email, role, ... }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

/**
 * requireRole(...roles)
 * - Use for fine-grained control: requireRole('admin'), requireRole('instructor','admin')
 */
export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Authentication required" });
  if (roles.length === 0) return next();
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden: insufficient privileges" });
  }
  next();
};

/**
 * adminOnly — convenience wrapper
 */
export const adminOnly = requireRole("admin");

/**
 * instructorOrAdmin — convenience wrapper for course authoring
 * (handy if you later want instructors to manage courses they teach)
 */
export const instructorOrAdmin = requireRole("instructor", "admin");
