const { createcourse, getAllCourses, getCourseById, updateCourse } = require('../controllers/CourseController')

const express = require('express')
const router = express.Router();

const verifyaccessToken = require('../middleWare/VerifyAccessToken')
const verifyRefreshToken = require('../middleWare/VerifyRefreshTokens')
const verifyRole = require('../middleWare/RoleMiddleWare')
const upload = require('../middleWare/MutlerConfig')

router.post('/addCourse', verifyaccessToken, verifyRole("admin", "courseProvider"), upload.single('photo'), createcourse);

router.get('/getAllCourses', getAllCourses);
router.get('/getCourseById/:id', getCourseById);

router.put('/updateCourse', verifyaccessToken,verifyRefreshToken, verifyRole("admin", "courseProvider"), upload.single('photo'), updateCourse);

module.exports = router;