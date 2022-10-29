const express = require('express');
const productController = require('../Controllers/productController');
const authController = require('../Controllers/authController');
const userController = require("../Controllers/userController");
const router = express.Router();


router.route('/')
  .get(authController.protect, productController.listProducts)


router.route('/updateME')
    .post(authController.protect, userController.updateMe)

router.route('/deleteME')
    .delete(authController.protect, userController.deleteMe)

module.exports = router;