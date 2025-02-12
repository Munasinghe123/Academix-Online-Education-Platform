const { register, login, logoutUser, refreshAccessToken, addCourseProvider, getAllUsers, getUserById, UpdateProfile, deleteUser } = require('../controllers/UserController');
const express = require('express')
const router = express.Router();

const verifyccessToken = require('../middleWare/VerifyAccessToken')
const verifyRefreshToken = require('../middleWare/VerifyRefreshTokens')
const verifyRole = require('../middleWare/RoleMiddleWare');
const upload = require('../middleWare/MutlerConfig');

router.post('/login', login)
router.post('/logout', logoutUser)
router.post('/register', upload.single('photo'), register);

router.post('/refresh', verifyRefreshToken,refreshAccessToken);

router.post('/addCourseProvider', verifyccessToken, verifyRole("admin"), upload.single('photo'), addCourseProvider)
router.get('/getAllUsers', verifyccessToken, verifyRole("admin"), getAllUsers)
router.get('/getUserById/:id', verifyccessToken, verifyRole("admin", "student", "courseProvider"), getUserById)

router.put('/Updateprofile/:id', verifyccessToken, verifyRole("admin", "student", "courseProvider"), upload.single('photo'), UpdateProfile)

router.delete('/deleteUser/:id', verifyccessToken, verifyRole("admin", "student", "courseProvider"), deleteUser);
module.exports = router
