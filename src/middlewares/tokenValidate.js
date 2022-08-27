require('dotenv').config();

const jwt = require('jsonwebtoken');

// const { User } = require('../database/models');

const tokenValidate = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decored = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decored;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = tokenValidate;