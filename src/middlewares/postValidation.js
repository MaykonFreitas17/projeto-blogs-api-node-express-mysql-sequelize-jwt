const postSchema = require('../schemas/postSchema');

const postValidate = (post) => {
  const isValid = postSchema.validate(post);
  const { error } = isValid;
  if (error) {
    const [code, message] = error.message.split('|');
    return { code: Number(code), message };
  }

  return isValid.value;
};

const post = {
  title: '',
  content: 'The whole text for the blog post goes here in this key',
  categoryIds: [1, 2],
};

console.log(postValidate(post));

module.exports = postValidate;