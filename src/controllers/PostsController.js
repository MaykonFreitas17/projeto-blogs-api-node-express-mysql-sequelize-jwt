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

module.exports = { create };