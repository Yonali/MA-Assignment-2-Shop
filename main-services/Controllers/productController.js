const Product = require("../Models/productModel");
const Filters = require("../Utils/filters");
const User = require("../Models/userModel");
const FileUpload = require("../Utils/fileUpload");
const multer = require("multer");



const multerStorage = FileUpload.setPath('public/img/product')
const multerFilter = FileUpload.FileTypeFilter('image')

const upload = multer({
  storage: multerStorage ,
  fileFilter: multerFilter
});

exports.uploadProductPhoto = upload.single('photo');


// list all the products
exports.listProducts = async (req, res) => {
  try {
    const Respond = new Filters(Product.find(), req.query).filter().sort().limitFields().paginate();
    const products = await Respond.query;
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error when retrieving products" });
  }
};

// list my the products
exports.listMyProducts = async (req, res) => {
  try {
    console.log(req.user._id)
    let userID = req.user._id
    const Respond = new Filters(Product.find({user_id:userID}), req.query).filter().sort().limitFields().paginate();
    const products = await Respond.query;
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error when retrieving products" });
  }
};

// find product based on id
exports.findProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (product) return res.status(200).json(product);
    else return res.status(400).json({ message: "Product not found" });
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

// create / update a product
exports.saveProduct = async (req, res) => {
  try {
    req.body.user_id = req.user._id
    req.body.image = req.file.filename
    console.log(req.file)
    const new_product = await Product.create(req.body)
    return res.status(200).json({
      message: "Product was saved successfully",
      product: new_product._doc,
    });

  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message});
  }
};


exports.updateProduct = async (req, res) => {
  try {
    req.body.image = req.file.filename
    const updated_product = await Product.findByIdAndUpdate(req.params.id, req.body)
    return res.status(200).json({
      message: "Product was updated successfully",
      product: updated_product._doc,
    });

  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message});
  }
};



// delete a product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: "Product was deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};
