import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];

  if (token) {
    jwt.verify(token, "your_jwt_secret", (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.userId = decoded.userId;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export default authenticate;
