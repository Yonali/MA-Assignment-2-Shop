const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const orderSchema = new Schema(
    {
        items: {
            type: Object,
        },
        user_id: {
            type: String,
            required: [true, "Please enter a user id"],
        },
        shippingMethod: {
            type: String,
        },
        shippingAddress: {
            type: Object,
        },
        totalAmount: {
            type: String
        },
        shippingFee: {
            type: String
        },
        status: {
            type: String,
            enum: ['Processing', 'Shipped', 'Delivered'],
            default: 'Processing'
        }
    },
);
const Orders = mongoose.model('Orders', orderSchema);
module.exports = Orders;
