const md5 = require("md5");
const { default: axios } = require("axios");
// const {
//     ORDER_SECRET,
//     PAYMENT_SECRET,
//     PAYMENT_NOTIFY_URL,
// } = require("../config.env");
const ORDER_SECRET = process.env.ORDER_SECRET
const PAYMENT_SECRET = process.env.PAYMENT_SECRET
const PAYMENT_NOTIFY_URL = process.env.PAYMENT_NOTIFY_URL


const Card = require("../Models/cartModel");
const {
    validatePaymentRequest,
    matchCardDetails,
} = require("../utils/GatewayValidations");
const { json } = require("express");

exports.makePayment = async (req, res) => {
    try {
        // validate request body
        const validatedDetails = validatePaymentRequest(req, res);
        if (validatedDetails.card_no) {
            // hash paras and validate if the payment details are valid
            const hash_order_code_valid = md5(
                `${ORDER_SECRET}${req.body.order_id}${req.body.transfer_amount}`
            );

            req.body.hash_order_code = hash_order_code_valid
            //check if payment details and hash matches
            if (hash_order_code_valid === req.body.hash_order_code) {
                // get card details
                const card = await Card.findOne({ card_no: req.body.card_no });

                // match credit card details
                const transferInfo = matchCardDetails(card, validatedDetails, res);
                if (transferInfo.card_no) {
                    // complete transaction
                    card.balance -= transferInfo.transfer_amount;
                    const result = await card.save();

                    // save failed
                    if (result && result.error) {
                        return res.status(400).json(result.error);
                    } else {
                        notifyServer(transferInfo.order_id, transferInfo.transfer_amount);
                        return res.status(200).json({
                            payment: "Payment was successfully",
                            status: 1,
                        });
                    }

                }


            } else {
                // if hashing fails
                return res
                    .status(400)
                    .json({ message: "Invalid payment details, refresh and try again" });
            }


        }


    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Invalid card number" });
    }
};

const notifyServer = (orderID, transfer_amount) => {
    // hash the payment data to validate at the buyer server(main)
    const hash_pay_code = md5(`${PAYMENT_SECRET}${orderID}${transfer_amount}`);
    axios
        .post(PAYMENT_NOTIFY_URL, {
            order_id: orderID,
            payment_type: "card",
            hash_pay_code,
        })
        .then((res) => {
            return json({ message: res });
        })
        .catch((err) => console.log(err));
};
