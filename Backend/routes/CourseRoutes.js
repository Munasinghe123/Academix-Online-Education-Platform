const { createcourse } = require('../controllers/CourseController')

const express = require('express')
const router = express.Router();

const verifyRole = require('../middleWare/RoleMiddleWare')
const verifyToken = require('../middleWare/AuthMiddleWare')
const upload = require('../middleWare/MutlerConfig')

router.post('/addCourse', verifyToken, verifyRole("admin", "courseProvider"), upload.single('photo'), createcourse);


module.exports = router;