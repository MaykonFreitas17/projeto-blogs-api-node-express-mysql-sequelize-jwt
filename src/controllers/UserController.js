require('dotenv').config();

const jwt = require('jsonwebtoken');

const UserService = require('../services/UsersService');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogin = await UserService.login(email, password);
    const { code, message } = userLogin;
    if (code && message) return res.status(code).json({ message });

    const jwtConfig = { expiresIn: '5min' };

    const token = jwt.sign(req.body, process.env.JWT_SECRET, jwtConfig);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const user = req.body;
    const validate = await UserService.create(user);
    const { code, message } = validate;
    if (code && message) return res.status(code).json({ message });
    const jwtConfig = { expiresIn: '5min' };
    const token = jwt.sign(req.body, process.env.JWT_SECRET, jwtConfig);
    return res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const users = await UserService.getAll();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.getById(id);
    const { code, message } = user;
    if (code && message) return res.status(code).json({ message });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  login,
  create,
  getAll,
  getById,
};