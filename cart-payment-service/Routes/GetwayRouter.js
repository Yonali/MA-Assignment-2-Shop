const GatewayController = require("../Controllers/GetwayController");
const paymentGatewayController = require("../Controllers/paymentGetway");

const router = require("express").Router();

router.post("/", paymentGatewayController.sendEmail);

module.exports = router;