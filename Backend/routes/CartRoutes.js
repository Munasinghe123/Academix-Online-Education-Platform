const { addToCart } = require('../controllers/CartController')
const express = require('express')

const router = express.Router();

router.post('/addToCart', addToCart);

module.exports = router;
