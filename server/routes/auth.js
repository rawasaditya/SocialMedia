const express = require('express');
const { followUnFollow, findPeople, register, login, protected, logout, uploadpost, getUserPosts, likeunlike, deletePost, updateUser } = require('../controllers/auth');
const router = express.Router();
const multer = require('multer');
const jwt = require('jsonwebtoken');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'static', 'posts'))
    },
    filename: function (req, file, cb) {
        const token = req.cookies.token
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const ext = (file.originalname.split(".")).at(-1);
        const unique = Date.now();
        const userid = decode._id;
        const filename = `${unique}_${userid}_.${ext}`;
        cb(null, filename)
    }
})

const userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'static', 'users'))
    },
    filename: function (req, file, cb) {
        const token = req.cookies.token
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const ext = (file.originalname.split(".")).at(-1);
        const userid = decode._id;
        const filename = `${userid}_.${ext}`;
        cb(null, filename)
    }
})

const upload = multer({ storage: storage })
const uploadUserProfile = multer({
    storage: userStorage
})


router.post('/register', register);
router.post('/login', login);
router.get('/protected', protected);
router.get('/logout', logout);
router.post('/uploadpost', upload.single('image'), uploadpost);
router.get("/user-posts", getUserPosts);
router.post('/likeunlike', likeunlike);
router.post('/deletePost', deletePost);
router.post('/updateUser', uploadUserProfile.single('photo'), updateUser);
router.get('/find-people', findPeople);
router.post('/follow-unFollow', followUnFollow);
module.exports = router;