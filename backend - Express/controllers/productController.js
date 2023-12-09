const Product = require("../models/productModel");
const path = require('path');

module.exports.Products = async (req, res, next) => {

  try {
    const { category } = req.query;

    if (!category) {
      // If category is not provided, fetch all products
      const products = await Product.find();

      if (!products || products.length === 0) {
        
        return res.status(404).json({ message: 'Products not found.' });
      }

      return res.status(200).json({ products});

    } else {
      const products = await Product.find({ productCategory: category });

      if (!products || products.length === 0) {
        
        return res.status(404).json({ message: 'Products not found for the given category.' });
      }

      return res.status(200).json({ products});
      
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports.Product = async ( req, res, next ) =>{

  try{
    
    const productId = req.params.id;
    
    const product = await Product.findById(productId);

    if (!product) {
      console.log('Product not found.')
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.json(product);
    
  }catch (error) {
    console.error(error);
  }
};

module.exports.ProductImage = async ( req, res, next ) =>{

  try{
    const productId = req.params.id;
   
    const product = await Product.findById(productId);

    if (!product) {
      
      return res.status(404).json({ message: 'Product not found.' });
    }

    const imageName = product.productImages[0];

    console.log(imageName);

    const imagePath = path.join(__dirname, '../public/productImages', imageName);

    res.sendFile(imagePath);

  }catch (error) {
    console.error(error);
  }
};

module.exports.ProductImages = async ( req, res, next ) =>{

  try{
    const productId = req.params.id;
    
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    const imageNames = product.productImages; 
    const imagePaths = imageNames.map(imageName =>
        path.join(__dirname, '../public/productImages', imageName)
    );

    const response = {
        images: imagePaths,
        message: 'Images fetched successfully', 
        success: true,
    };
    res.json(response);

  }catch (error) {
    console.error(error);
  }
};

module.exports.ProductFilter = async ( req,res ) => {
  try {
    const {price, color, size} = req.body;
    const product = await Product.find(price, color, size);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.json(product);
    
  } catch (error) {
    console.error(error);
  }
};

module.exports.ProductCreate = async (req,res) => {
  
  try {
    let images = [];

    if (typeof req.body.productImages === "string") {
      images.push(req.body.productImages);
    } else {
      images = req.body.productImages;
    }
      
    const imagesLinks = [];
      
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    const productData = req.body;
    productData.productImages = imagesLinks;

    const product = await Product.create(productData);

    if(product){
      res
      .status(201)
      .json({ message: "Product added successfully", isSuccess: true });
    }
    
  } catch (error) {
    console.error(error);
  }
}