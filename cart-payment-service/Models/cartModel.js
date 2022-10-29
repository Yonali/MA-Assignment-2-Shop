const { model, Schema } = require("mongoose");

const bankCartSchema = new Schema(
    {
        card_no: { type: Number, required: [true, "Please enter a card no"], },
        user_id: { type: String, required: true },
        card_cvc: { type: Number, required: [true, "Please enter a card cvc"], },
        card_holder_name: { type: String, required: [true, "Please enter a card holder name"], },
        balance: { type: Number, default: 10000 },
    },
    { timestamps: true }
);

module.exports = model("Bank_Cart", bankCartSchema);