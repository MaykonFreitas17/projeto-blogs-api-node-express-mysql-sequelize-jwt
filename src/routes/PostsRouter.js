const express = require('express');

const router = express.Router();

const tokenValidate = require('../middlewares/tokenValidate');

const PostController = require('../controllers/PostsController');

router.get('/:id', tokenValidate, PostController.getById);
router.get('/', tokenValidate, PostController.getAll);
router.post('/', tokenValidate, PostController.create);
router.put('/:id', tokenValidate, PostController.update);

module.exports = router;