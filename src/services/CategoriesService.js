const { Category } = require('../database/models');

const create = async (category) => {
  const { name } = category;
  if (name === undefined || name === '') {
    return { code: 400, message: '"name" is required' };
  }

  const newCategory = await Category.create(category);
  return newCategory;
};

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = { create, getAll };