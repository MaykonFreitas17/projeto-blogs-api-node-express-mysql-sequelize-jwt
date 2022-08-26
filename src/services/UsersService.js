const { User } = require('../database/models');
const userValidate = require('../middlewares/userValidation');

const login = async (email, password) => {
  if (email === '' || password === '') {
    return { code: 400, message: 'Some required fields are missing' };
  }

  const users = await User.findAll({ where: { email, password } });
  if (users.length === 0) return { code: 400, message: 'Invalid fields' };

  return true;
};

const create = async (user) => {
  const { email } = user;

  const validate = userValidate(user);
  const { code, message } = validate;
  if (code && message) return validate;

  const userWithEmail = await User.findOne({ where: { email } });
  if (userWithEmail) return { code: 409, message: 'User already registered' };

  await User.create(user);
  return true;
};

module.exports = {
  login,
  create,
};