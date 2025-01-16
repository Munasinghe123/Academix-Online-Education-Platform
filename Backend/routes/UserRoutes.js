const { register, login, addCourseProvider, getAllUsers, getUserById } = require('../controllers/UserController');
const express = require('express')
const router = express.Router();

const verifyToken = require('../middleWare/AuthMiddleWare')
const verifyRole = require('../middleWare/RoleMiddleWare');
const upload = require('../middleWare/MutlerConfig');



router.post('/login', login)
router.post('/register', upload.single('photo'), register);

router.post('/addCourseProvider', verifyToken, verifyRole("admin"), upload.single('photo'), addCourseProvider)
router.get('/getAllUsers', verifyToken, verifyRole("admin"), getAllUsers)
router.get('/getUserById/:id', verifyToken, verifyRole("admin", "student", "courseProvider"), getUserById)

module.exports = router
