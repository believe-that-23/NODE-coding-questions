import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const payload = jwt.verify(token, 'your-secret-key');
    req.user = payload.user;
  } catch (err) {
    console.log(err);
    return res.status(401).send("Unauthorized");
  }

  next();
};


export function isAdmin(req, res, next) {
  if (req.user.role === 'admin') {
    return next();
  }
  res.status(403).json({ message: 'Permission denied.' });
}



