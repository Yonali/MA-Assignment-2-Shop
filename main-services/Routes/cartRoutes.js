const express = require('express');
const cartController = require('../Controllers/cartController');
const authController = require('../Controllers/authController');
const router = express.Router();

//This api-resource route for update and delete specific student
router.route('/')
  .get(authController.protect,  cartController.getCart)
  // .post(authController.protect, cartController.addToCart)
  .patch(authController.protect,cartController.storeToCart);

// //This api-resource route for update and delete specific student
// router.route('/:id')
//   .get(authController.protect,authController.restrictTo('owner'), productController.findProduct)
//   .patch(authController.protect,authController.restrictTo('owner'), productController.updateProduct)
//   .delete(authController.protect,authController.restrictTo('owner'), productController.deleteProduct)



module.exports = router;