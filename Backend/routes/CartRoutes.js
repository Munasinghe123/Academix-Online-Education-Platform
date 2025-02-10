const { addToCart,getCartById } = require('../controllers/CartController')
const VerifyAccessToken = require('../middleWare/VerifyAccessToken')
const verifyRole = require('../middleWare/RoleMiddleWare')
const express = require('express')

const router = express.Router();

router.post('/addToCart',VerifyAccessToken,verifyRole("admin","student","courseProvider"), addToCart);
router.get('/getCartById/:id',VerifyAccessToken,verifyRole("admin","student","courseProvider"),getCartById);

module.exports = router;
