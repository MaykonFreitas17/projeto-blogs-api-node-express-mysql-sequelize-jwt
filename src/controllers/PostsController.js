const PostService = require('../services/PostsService');

const create = async (req, res) => {
  try {
    const post = req.body;
    const newPost = await PostService.create(req.user, post);
    const { code, message } = newPost;
    if (code && message) return res.status(code).json({ message });
    return res.status(201).json(newPost);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const posts = await PostService.getAll();
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostService.getById(id);
    const { code, message } = post;
    if (code && message) return res.status(code).json({ message });
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { create, getAll, getById };