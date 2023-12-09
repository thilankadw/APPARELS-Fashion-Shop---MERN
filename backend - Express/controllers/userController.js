const User = require("../models/userModel");
const { createAccessToken, createRefreshToken } = require("../utils/secretToken");
const bcrypt = require('bcrypt');

module.exports.Signup = async (req, res, next) => {
  
  try {
    const { firstname, lastname, email, contactNumber, address, password, userrole } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const user = await User.create({ firstname, lastname, email, contactNumber, address, password, userrole});

    if(user){
      const accessToken = createAccessToken(user);
      const refreshToken = createRefreshToken(user);

      res
      .status(201)
      .json({ message: "User signed in successfully", isRegistersuccess: true, accessToken: accessToken, refreshToken: refreshToken, userId: user._id});
    }

  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during signup', success: false });
  }

};

module.exports.Login = async (req, res, next) => {

  try {

    const { email, password } = req.body;

    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }

    const user = await User.findOne({ email });

    if(!user){
      return res.json({message:'User Not Found!!!' })  
    }

    const auth = await bcrypt.compare(req.body.password, user.password)

    if (!auth) {
      return res.json({message:'Error in auth' }) 
    }

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    console.log(accessToken)

    res
      .status(201)
      .json({ message: "User logged in successfully", isSuccess: true, refreshToken: refreshToken, accessToken: accessToken, userId: user._id });

  } catch (error) {
    console.error(error);
  }
};


module.exports.RefreshAccessToken = async (req, res, next) => {

  try {
    const { refreshToken } = req.body;

    const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);

    const newAccessToken = createAccessToken(decodedToken.user);

    res.json({ accessToken: newAccessToken });

  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(401).json({ message: "Token refresh failed", sucess: fail });
  }
};