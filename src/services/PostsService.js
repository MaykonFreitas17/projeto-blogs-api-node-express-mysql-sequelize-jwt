// const Sequelize = require('sequelize');
// const config = require('../database/config/config');

// const sequelize = new Sequelize(config.development);

const { BlogPost, PostCategory, Category, User } = require('../database/models');

const postValidate = require('../middlewares/postValidation');

const validCategoryByIds = async (ids) => {
  const error = ids.map(async (id) => {
    const category = await Category.findOne({ where: { id } });
    if (category === null) return true;
    return false;
  });

  const result = await Promise.all(error);
  if (result.includes(true)) return false;
  return true;
};

const createPost = async (id, post, transaction) => {
  try {
    const blogPost = await BlogPost.create(
      { title: post.title, content: post.content, userId: id },
    );

    await post.categoryIds.map(async (categoryId) => {
      PostCategory.create({ postId: blogPost.id, categoryId });
    });

    return blogPost;
  } catch (err) {
    await transaction.rollback();
    return { code: 500, message: err.message };
  }
};

const create = async (user, post) => {
  // const transaction = await sequelize.transaction();
  const validate = postValidate(post);
  const validCategories = await validCategoryByIds(post.categoryIds);
  const { code, message } = validate;
  
  if (code && message) return validate;
  if (!validCategories) return { code: 400, message: '"categoryIds" not found' };

  const { id } = await User.findOne({ where: { email: user.email } });
  const newPost = await createPost(id, post);
  // await transaction.commit();
  return newPost;
};

module.exports = { create };