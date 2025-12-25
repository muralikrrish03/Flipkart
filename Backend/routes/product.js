const express = require('express');
const {getAll, getSingleProduct, getDelete, getPost} = require('../controller/productController');
const { accesssRole } = require('../middleware/Access');
const { isAuthenticated } = require('../middleware/authenticate');
const router = express.Router();


router.route('/products').get(getAll).post(isAuthenticated,accesssRole("admin","manager"),getPost);
router.route('/product/:id').get(getSingleProduct).delete(getDelete)

module.exports = router;

