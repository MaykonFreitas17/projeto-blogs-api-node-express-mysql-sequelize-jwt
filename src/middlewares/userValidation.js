const userSchema = require('../schemas/userSchema');

const userValidate = (user) => {
  const isValid = userSchema.validate(user);
  const { error } = isValid;
  if (error) {
    const [code, message] = error.message.split('|');
    return { code: Number(code), message };
  }

  return isValid.value;
};

// const user = {
//   displayName: 'Brett',
//   email: 'brett@email.com',
//   password: '123456',
//   image: 'http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png',
// };

// console.log(userValidate(user));

module.exports = userValidate;