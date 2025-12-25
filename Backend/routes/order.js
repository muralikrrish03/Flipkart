const express = require('express');
const { createrOrder, getOrder } = require('../controller/orderController');
const router = express.Router();


router.route('/order').post(createrOrder)
router.route('/orders').get(getOrder)

module.exports=router