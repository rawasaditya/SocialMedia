const express = require('express');
const { register, login, protected, logout, uploadpost, getUserPosts } = require('../controllers/auth');
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
        console.log(filename);
        cb(null, filename)
    }
})

const upload = multer({ storage: storage })
router.post('/register', register);
router.post('/login', login);
router.get('/protected', protected);
router.get('/logout', logout);
router.post('/uploadpost', upload.single('image'), uploadpost);
router.get("/user-posts", getUserPosts)
module.exports = router;