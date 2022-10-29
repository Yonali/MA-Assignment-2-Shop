const User = require('../Models/userModel');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
const Filters = require('../Utils/filters');
const FileUpload = require('../Utils/fileUpload');
const multer = require('multer');


/**Upload a profile picture */

const multerStorage = FileUpload.setPath('public/img/users')
const multerFilter = FileUpload.FileTypeFilter('image')

const upload = multer({
  storage: multerStorage ,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');



/**All users apis */



//update user
exports.updateMe = catchAsync(async (req, res, next) => {

  // Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  //If update photo it will updated
  if (req.file) filteredBody.photo = req.file.filename;

  // Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});


//delete my account
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user._id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});

/**End of the user apis */


/**Some conditions */

//filter and return column that needed to be updated
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};