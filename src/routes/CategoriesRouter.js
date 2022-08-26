const express = require('express');

const router = express.Router();

const CategoriesController = require('../controllers/CategoriesController');
const TokenValidate = require('../middlewares/tokenValidate');

router.get('/', TokenValidate, CategoriesController.getAll);
router.post('/', TokenValidate, CategoriesController.create);

module.exports = router;