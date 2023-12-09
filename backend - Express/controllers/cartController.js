const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

module.exports.AddToCart = async (req, res, next) => {
  
  try {  
    const { userId, productId, productName, productSize, productQuantity, productPrice } = req.body;

    const productExist = await Cart.findOne({ userId, productId});

    if(productExist) {
        return res.json({message: "You have already added this product to cart.", isAlreadyAdded: true})
    }

    const addedProduct = await Cart.create({ userId, productId, productName, productSize, productQuantity, productPrice });

    if(addedProduct){
        return res.json({message: "Successfully added to cart", isSuccess: true,});
    }

  }catch (error) {
    console.error(error);
  }  
  
};

module.exports.ViewCartItems = async (req, res, next) => {

  try {
    const userId = req.params.id;

    const cartItems = await Cart.find({ userId });

    const productIds = cartItems.map(cartItem => cartItem.productId);

    const getProductImages = async (productId) => {
      const product = await Product.findById(productId);
      return product ? product.productImages[0] : [];
    };

    const fetchProductImages = async () => {
      try {
          const imagePromises = productIds.map(productId => getProductImages(productId));
          const productImages = await Promise.all(imagePromises);
          return productImages;
      } catch (error) {
          console.error('Error fetching product images:', error);
          return [];
      }
    };

    const imagesArray = await fetchProductImages();

    const cartItemList = cartItems.map((cartItem, index) => ({
      ...cartItem.toObject(),
      productImage: imagesArray[index],
    }));

    if (cartItemList.length > 0) {
      return res.json({cartItemList, isSuccess: true});
    } else {
      return res.json({ message: "No items found in the cart", success:false });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.RemoveCartItems = async ( req, res, next ) => {

  try {
    const cartItemtId = req.params.id;

    const deleteProduct = await Cart.findByIdAndDelete({ _id: cartItemtId })

    if(!deleteProduct){
      return res.json({message: 'Product Not Found', isSuccess: false})
    }

    if(deleteProduct){
      return res.status(201).json({message:'Product Removed from cart.', isSuccess:true})
    }
    
  } catch (error) {
    console.log(error)
  }

};

module.exports.UpdateQuantity = async ( req, res, next ) => {

  try {
    const cartItemId = req.params.id;

    const { productQuantity } = req.body;

    const updateQuantity = await Cart.findByIdAndUpdate( cartItemId, { productQuantity: productQuantity }, { new: true } );

    if(!updateQuantity){
      return res.json({message: "Quantity Update not successful", isSuccess: false})
    }
    if(updateQuantity){
      return res.json({message: "Quantity Update successful", isSuccess: true})
    }
  } catch(error) {
    console.log(error)
  }
};