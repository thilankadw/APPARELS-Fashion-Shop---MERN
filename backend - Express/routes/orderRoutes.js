const { CreateOrder } = require('../controllers/orderController')
const { isAuthenticated } = require('../middleware/auth');
const router = require('express').Router()

router.post('/create-order', isAuthenticated, CreateOrder);

module.exports = router