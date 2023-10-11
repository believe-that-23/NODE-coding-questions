// middleware/authMiddleware.mjs
import jwt from 'jsonwebtoken';

export function authenticateJWT(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing.' });
  }

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }
    req.user = user;
    next();
  });
}

export function isAdmin(req, res, next) {
  if (req.user.role === 'admin') {
    return next();
  }
  res.status(403).json({ message: 'Permission denied.' });
}

