const express = require('express');
const authController = require('../Controllers/authController');
const userController = require('../Controllers/userController');
const router = express.Router();

router.post('/signup',userController.uploadUserPhoto, authController.signup);
router.post('/signing', authController.login);
router.post('/forget-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);
router.patch('/update-password', authController.protect, authController.updatePassword);
router.get('/current-user', authController.protect, authController.currentUser);
router.get('/logout', authController.protect, authController.logout);

module.exports = router;