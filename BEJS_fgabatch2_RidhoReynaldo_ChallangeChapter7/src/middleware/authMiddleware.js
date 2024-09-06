const { verifyToken } = require('../services/authService');

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Access denied');

  try {
    const userId = verifyToken(token);
    req.userId = userId;
    next();
  } catch {
    res.status(401).send('Invalid token');
  }
};
