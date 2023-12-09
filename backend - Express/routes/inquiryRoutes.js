const { CreateInquiry } = require('../controllers/inquiryController')
const { isAuthenticated } = require('../middleware/auth');
const router = require('express').Router()

router.post('/add/:id', isAuthenticated, CreateInquiry);

module.exports = router