const mongoose = require('mongoose')

const inquirySchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    userEmail: {
        type: String,
        required: [true, "Email is required"]
    },
    contactNumber: {
        type: String,
    },
    message: {
        type: String,
        required: [true, "Message is required"]
    },

});

module.exports = mongoose.model('Inquiry', inquirySchema);