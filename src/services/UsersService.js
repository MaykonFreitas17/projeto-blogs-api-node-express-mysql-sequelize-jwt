const { User } = require('../database/models');

const login = async (email, password) => {
  if (email === '' || password === '') {
    return { code: 400, message: 'Some required fields are missing' };
  }

  const users = await User.findAll({ where: { email, password } });
  if (users.length === 0) return { code: 400, message: 'Invalid fields' };

  return true;
};

module.exports = {
  login,
};