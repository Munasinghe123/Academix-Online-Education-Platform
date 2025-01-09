const { register, login, addCourseProvider } = require('../controllers/UserController');
const express = require('express')
const router = express.Router();

const verifyToken = require('../middleWare/AuthMiddleWare')
const verifyRole = require('../middleWare/RoleMiddleWare');


router.post('/register', register);
router.post('/login', login)
router.post('/addCourseProvider', verifyToken, verifyRole("admin"), addCourseProvider)

module.exports = router
