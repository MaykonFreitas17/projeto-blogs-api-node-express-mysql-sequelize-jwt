const express = require('express');

const router = express.Router();

const UserController = require('../controllers/UserController');
const tokenValidate = require('../middlewares/tokenValidate');

router.get('/', tokenValidate, UserController.getAll);
router.get('/:id', tokenValidate, UserController.getById);
router.post('/', UserController.create);

module.exports = router;