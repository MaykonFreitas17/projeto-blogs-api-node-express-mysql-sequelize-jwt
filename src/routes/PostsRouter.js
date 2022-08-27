const express = require('express');

const router = express.Router();

const tokenValidate = require('../middlewares/tokenValidate');

const PostController = require('../controllers/PostsController');

router.post('/', tokenValidate, PostController.create);

module.exports = router;