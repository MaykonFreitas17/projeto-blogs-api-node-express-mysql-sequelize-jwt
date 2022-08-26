require('dotenv').config();

const jwt = require('jsonwebtoken');

const UserService = require('../services/UsersService');

const login = async (req, res) => {
  const { email, password } = req.body;
  const userLogin = await UserService.login(email, password);
  const { code, message } = userLogin;
  if (code && message) return res.status(code).json({ message });

  const jwtConfig = { expiresIn: '5min' };

  const token = jwt.sign(req.body, process.env.JWT_SECRET, jwtConfig);
  return res.status(200).json({ token });
};

module.exports = {
  login,
};