const { sign, verify } = require('jsonwebtoken');
require('dotenv').config();

//Generates a JWT
const createToken = user => {
  const accessToken = sign(
    { username: user.username, id: user.id },
    process.env.JWT_SECRET
  );
  return accessToken;
};

//Validates the Token
const validateToken = (req, res, next) => {
  const token = req.headers['access-token'];
  if (!token)
    return res
      .status(400)
      .json({ error: 'User not authenticated', auth: false });
  try {
    const validToken = verify(token, process.env.JWT_SECRET);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err, auth: false });
  }
};

module.exports = { createToken, validateToken };
