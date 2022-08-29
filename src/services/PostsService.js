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

const customUser = (user) => {
  const userFormat = {
    id: user.id,
    displayName: user.displayName,
    email: user.email,
    image: user.image,
  };
  return userFormat;
};

const getAll = async () => {
  const allPosts = BlogPost.findAll({ include: [{ model: User, as: 'user' }] })
  .then(async (posts) => {
    const result = posts.map(async (post) => {
      const { id, title, content, userId, published, updated } = post;
      const postCategories = await PostCategory.findAll({ where: { postId: id } });
      const categoriesList = postCategories.map(async (category) => {
        const { categoryId } = category;
        return Category.findAll({ where: { id: categoryId } });
      });
      const c = await Promise.all(categoriesList);
      const user = customUser(post.user);
      return { id, title, content, userId, published, updated, user, categories: c[0] };
    });
    return Promise.all(result);
  });
  return allPosts;
};

const getById = async (id) => {
  const postById = BlogPost.findOne({
    where: { id }, include: [{ model: User, as: 'user' }],
  })
  .then(async (post) => {
    if (!post) return { code: 404, message: 'Post does not exist' };
    const { title, content, userId, published, updated } = post;
    const postCategories = await PostCategory.findAll({ where: { postId: id } });
    const categories = postCategories.map(async (category) => {
      const { categoryId } = category;
      return Category.findAll({ where: { id: categoryId } });
    });
    const c = await Promise.all(categories);
    const user = customUser(post.user);
    return { id: post.id, title, content, userId, published, updated, user, categories: c[0] };
  });
  return postById;
};

const validateUpdate = async (id, token, title, content) => {
  const { user } = await getById(id);
  console.log(token);
  if (user.email !== token.email) {
    return { code: 401, message: 'Unauthorized user' };
  }

  if (title === '' || content === '') {
    return { code: 400, message: 'Some required fields are missing' };
  }

  return true;
};

const update = async (id, token, title, content) => {
  const validate = await validateUpdate(id, token, title, content);
  const { code, message } = validate;
  console.log(validate);
  if (code && message) return validate;

  await BlogPost.update(
    { title, content },
    { where: { id } },
  );

  return getById(id);
};

module.exports = { create, getAll, getById, update };