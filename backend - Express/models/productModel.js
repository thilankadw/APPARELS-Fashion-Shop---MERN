const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product name is required"],
  },
  productCategory: {
    type: String,
    required: [true, "Product name is required"],
  },
  productSizes: {
    type: Array,
    required: [true, "Size is required"],
  },
  productColor: {
    type: String,
    required: [true, "Color is required"],
  },
  productAvailableQuantity: {
    type: Number,
    required: [true, "Available quantity is required"],
  },
  productRegularPrice: {
    type: Number,
    required: [true, "Product regular price is required"],
  },
  productSalePrice: {
    type: String,
  },
  productDescription: {
    type: String,
  },
  productBrandName: {
    type: String,
  },
  producSKU: {
    type: String,
  },
  isProductAvailable: {
    type: Boolean,
    default: true
  },
  productImages: {
    type: Array,
    required: true,  
  }, 
  productAddedDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);