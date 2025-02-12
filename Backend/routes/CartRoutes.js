const { addToCart,getCartById,deleteItem } = require('../controllers/CartController')
const VerifyAccessToken = require('../middleWare/VerifyAccessToken')
const verifyRole = require('../middleWare/RoleMiddleWare')
const express = require('express')

const router = express.Router();

router.post('/addToCart',VerifyAccessToken,verifyRole("admin","student","courseProvider"), addToCart);
router.get('/getCartById/:id',VerifyAccessToken,verifyRole("admin","student","courseProvider"),getCartById);
router.delete('/deleteItem/:id',VerifyAccessToken,verifyRole("admin","student","courseProvider"),deleteItem);

module.exports = router;
