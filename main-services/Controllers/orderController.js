const Order = require('../Models/OrdersModel');
const sendEmail = require("../Utils/email");



exports.saveOrder = async (req, res) => {
    try {
        console.log(req.body)
        let data = await Order.create(req.body)
        let message='You have an order';
        await sendEmail({
            email: req.body.email,
            subject: 'Congrats!!',
            message:message
        });
        return res.status(200).json({
            message: "Order was saved successfully",
            product: data,
        });

    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message});
    }
};

exports.getMyOrder = async (req, res) => {
    try {
        let myOrder = await Order.find({user_id:req.user._id})
        return res.status(200).json({
            product: myOrder,
        });

    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message});
    }
};