const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    shippingEmail: {
        type: String,
        required: true
    },
    shippingDetails: {
        firstName: {
            type: String,
            required: [true, "First name is required"]
        },
        lastName: {
            type: String,
        },
        apartment: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: [true, "Street is required"]
        },
        city: {
            type: String,
            required: [true, "City is required"]
        },
        country: {
            type: String,
            required: [true, "Country is required"]
        },
        postalCode: {
            type: String,
            required: [true, "Postal code is required"]
        },
    },
    productList: [{
        productId: {
            type: String,
            required: true
        },
        productName: {
            type: String,
            required: true
        },
        productPrice: {
            type: Number,
            required: true
        },
        productQuantity: {
            type: Number,
            required: true
        },
        productSize: {
            type: String,
            required: true
        },   
    }],  // Array of products
    shippingMethod: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Order", orderSchema);
