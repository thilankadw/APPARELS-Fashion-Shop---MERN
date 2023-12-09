const ErrorHandler = require('../utils/ErrorHandler')
const catchAsyncErrors = require('./catchAsyncErrors')
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports.isAuthenticated = catchAsyncErrors(async(req,res,next) => {

    const token = req.header('Authorization');

    if(!token){
        console.log('Please login to continue!')
        return res.status(401).json({message: "Please login to continue!", success: false})
    }

    jwt.verify(token.replace('Bearer ', ''), process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {                                                                                          
        if (err) {
            console.log("error")  
            return res.status(401).json({ message: 'Please login to continue!', success: false });
        }
        
        next();
    });
});
