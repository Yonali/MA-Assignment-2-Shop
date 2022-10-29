const express = require('express');
const bankCartController = require('../Controllers/banckCardController');
const authController = require("../Controllers/authController");
const router = express.Router();


router.post('/', authController.protect,bankCartController.save);
router.delete('/:id', authController.protect,bankCartController.removeCart);

module.exports = router;