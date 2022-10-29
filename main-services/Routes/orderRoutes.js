const express = require('express');
const orderController = require('../Controllers/orderController');
const authController = require('../Controllers/authController');
const router = express.Router();

//This api-resource route for update and delete specific student
router.route('/')
    .get(authController.protect,  orderController.getMyOrder)
    .post(authController.protect,orderController.saveOrder);

module.exports = router;