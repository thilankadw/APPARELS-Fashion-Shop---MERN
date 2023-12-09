const { AddToCart, ViewCartItems, RemoveCartItems, UpdateQuantity } = require('../controllers/cartController')
const { isAuthenticated } = require('../middleware/auth');
const router = require('express').Router()

router.post('/add', isAuthenticated, AddToCart)
router.get('/view/cart_products/:id', isAuthenticated, ViewCartItems)
router.delete('/delete/cart_products/:id', isAuthenticated, RemoveCartItems)
router.put('/update/quantity/:id', isAuthenticated, UpdateQuantity)

module.exports = router