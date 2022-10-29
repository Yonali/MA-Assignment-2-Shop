const multer = require('multer');
const AppError = require('../Utils/appError');

//Set path file to save
exports.setPath = (path) => multer.diskStorage({

  destination: (req, file, next) => {
    console.log('ava')
    console.log(file)
    next(null, `${path}`);
  },
  filename: (req, file, next) => {
    const ext = file.mimetype.split('/')[1];
    next(null, `user-${Date.now()}.${ext}`);
  }
});

//Filter file type
exports.FileTypeFilter = (type) => (req, file, next) => {
  console.log('ava')
  console.log(file)
  if (file.mimetype.startsWith(`${type}`)) {
    next(null, true);
  } else {
    next(new AppError(`Not an ${type}! Please upload only images.`, 400), false);
  }
};