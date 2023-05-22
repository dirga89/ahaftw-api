const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log(token);
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded; // Set the decoded payload as req.user
    next();
  });
};

module.exports = verifyToken;

