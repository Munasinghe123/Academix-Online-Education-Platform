const { register, login, addCourseProvider, getAllUsers } = require('../controllers/UserController');
const express = require('express')
const router = express.Router();

const verifyToken = require('../middleWare/AuthMiddleWare')
const verifyRole = require('../middleWare/RoleMiddleWare');


router.post('/register', register);
router.post('/login', login)

router.post('/addCourseProvider', verifyToken, verifyRole("admin"), addCourseProvider)
router.get('/getAllUsers', verifyToken, verifyRole("admin"), getAllUsers)
module.exports = router
