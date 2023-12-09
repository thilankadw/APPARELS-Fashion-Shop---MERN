const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User id is required"],
  },
  productId: {
    type: String,
    required: [true, "Product id is required"],
  },
  productName: {
    type: String,
    required: [true, "Product name is required"],
  },
  productSize: {
    type: String,
    required: [true, "Size is required"],
  },
  productQuantity: {
    type: Number,
    default: 1,
    required: [true, "Quantity is required"]
  },
  productPrice: {
    type: Number,
    required: [true, "Price is required"]
  }
});

module.exports = mongoose.model("shoppingcart", cartSchema);