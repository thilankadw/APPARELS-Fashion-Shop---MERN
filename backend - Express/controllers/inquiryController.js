const Inquiry = require('../models/inquiryModel');

module.exports.CreateInquiry = async (req, res, next) => {

  try {  
    const userId = req.params.id;

    const { userName, userEmail, contactNumber, message } = req.body;

    const createdInquiry = await Inquiry.create({ userId, userName, userEmail, contactNumber, message });

    if(createdInquiry){
        return res.json({message: "Your message was successfully received.", isSuccess: true,});
    }else{
        return res.json({message: "Unbale to send the message. Please try again.", isSuccess: false,});
    }

  }catch (error) {
    console.error(error);
  }  
  
};

