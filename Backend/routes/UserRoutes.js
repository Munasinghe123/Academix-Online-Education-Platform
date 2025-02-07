const { register, login, logoutUser, refreshAccessToken, addCourseProvider, getAllUsers, getUserById, UpdateProfile, deleteUser } = require('../controllers/UserController');
const express = require('express')
const router = express.Router();

const verifyToken = require('../middleWare/AuthMiddleWare')
const verifyRefreshToken = require('../middleWare/VerifyRefreshTokens')
const verifyRole = require('../middleWare/RoleMiddleWare');
const upload = require('../middleWare/MutlerConfig');

router.post('/login', login)
router.post('/logout', logoutUser)
router.post('/register', upload.single('photo'), register);

router.post('/refresh', verifyRefreshToken,refreshAccessToken);

router.post('/addCourseProvider', verifyToken, verifyRole("admin"), upload.single('photo'), addCourseProvider)
router.get('/getAllUsers', verifyToken, verifyRole("admin"), getAllUsers)
router.get('/getUserById/:id', verifyToken, verifyRole("admin", "student", "courseProvider"), getUserById)

router.put('/Updateprofile/:id', verifyToken, verifyRole("admin", "student", "courseProvider"), upload.single('photo'), UpdateProfile)

router.delete('/deleteUser/:id', verifyToken, verifyRole("admin", "student", "courseProvider"), deleteUser);
module.exports = router
