const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "First name is required"]
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    contactNumber: {
        type: String,
        required: [true, "Contact number is required"]
    },
    address: {
        type: String,
        required: [true, "Address is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    userole: {
        type: String,
        default: 'user'
    }
});

userSchema.pre("save", async function(next) {
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});


module.exports = mongoose.model('User', userSchema);