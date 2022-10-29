const BCart = require('../Models/BankCartModel');
const catchAsync = require('../Utils/catchAsync');



exports.save = catchAsync(async (req, res, next) => {
  try {
    const data = req.body
    data.user_id = req.user._id
    const new_cart = await BCart.create(data)
    res.status(200).json({
      status: 'success',
      data: {
        user: new_cart
      }
    });
  } catch (e) {
    res.status(400).json({
      status: 'error',
      data: {
        user: e.message
      }
    });
  }
});




exports.removeCart = catchAsync(async (req, res, next) => {
  try {
    await BCart.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status: 'success',
      data: {
        message: "cart remove successfully"
      }
    });
  } catch (e) {

  }
});