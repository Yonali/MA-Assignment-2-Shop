const { model, Schema } = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const mongoose = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a valid product name"],
    },
    image: {
      type: String,
        required: [true, "Please enter a valid product name"],
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      enum: ['A', 'B','C','D'],
      required: [true, "Please enter a valid product category"],
    },
    price: {
      type: Number,
      required: [true, "Please enter a valid product price"],
    },
    sku: {
      type: String,
      required: [true, "Please enter a valid product sku"],
    },
    size: {
      type: String,
      required: [true, "Please enter a valid product size"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter a valid product name"],
    },
    user_id: {
      type: String,
      required: [true, "Please enter a user id"],
    },
  },
  { timestamps: true }
);
autoIncrement.initialize(mongoose.connection);

productSchema.plugin(autoIncrement.plugin, {
    model: "product", // collection or table name in which you want to apply auto increment
    field: "id", // field of model which you want to auto increment
    startAt: 0, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
});
productSchema.index({ name: "text", description: "text" });

module.exports = model("product", productSchema);
