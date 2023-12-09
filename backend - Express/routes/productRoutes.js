const { ProductCreate, Products, Product, ProductFilter, ProductImage, ProductImages } = require('../controllers/productController');
const { isAuthenticated } = require('../middleware/auth');
const router = require('express').Router()

router.post('/add', ProductCreate)
router.get('/details', Products)
router.get('/details/:id', Product)
router.get('/image/:id', ProductImage)
router.get('/images/:id', ProductImages)
router.get('details/filter', ProductFilter)

module.exports = router