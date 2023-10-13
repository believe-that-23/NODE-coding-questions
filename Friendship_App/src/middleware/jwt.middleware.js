import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  // const token = req.headers['authorization'];
  const token = req.cookies.jwtToken;
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    req.token = token;
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }

  next();
};

export default jwtAuth;
