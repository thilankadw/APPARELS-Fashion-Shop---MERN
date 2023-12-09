const Order = require('../models/orderModel');

module.exports.CreateOrder = async (req, res, next) => {

    try {
        
        const { userId, shippingEmail, shippingDetails, productList, shippingMethod, totalAmount } = req.body;

        console.log(productList);

        const createOrder = await Order.create({ userId, shippingEmail, shippingDetails, productList, shippingMethod, totalAmount });
        
        if(createOrder){
            console.log("Order was Successful")
            return res.json({message: "Your order was successful!...", isSuccess: true,});
        }
        
    } catch (error) {
        
    }
};