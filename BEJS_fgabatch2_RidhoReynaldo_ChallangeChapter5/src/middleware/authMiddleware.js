const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, nasabah) => {
    if (err) return res.sendStatus(403);

    req.nasabah = nasabah; // Menetapkan payload JWT ke req.nasabah
    // console.log('Decoded nasabah:', nasabah); // Log untuk debug
    next();
  });
};

module.exports = { authenticateToken };
