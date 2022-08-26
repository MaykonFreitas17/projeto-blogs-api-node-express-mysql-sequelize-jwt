const categoriesService = require('../services/CategoriesService');

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await categoriesService.create({ name });
    const { code, message } = category;
    if (code && message) return res.status(code).json({ message });
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { create };