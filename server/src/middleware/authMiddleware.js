/**
 * JWT Authentication & Role Verification Middleware
 */

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tamil-scheme-navigator-jwt-secret-key-2026';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
    if (err) {
      req.user = null;
    } else {
      req.user = decodedUser;
    }
    next();
  });
}

export function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required. Please login.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid or expired session. Please login again.' });
    }
    req.user = decodedUser;
    next();
  });
}

export function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    if (req.user && req.user.role === 'ADMIN') {
      next();
    } else {
      res.status(403).json({ success: false, message: 'Admin access required.' });
    }
  });
}

export { JWT_SECRET };
