const { StatusRes } = require("./helpers/utils");
const User = require('../models/user');
const { comparePassword, hasPassword } = require('./helpers/auth');
const jwt = require("jsonwebtoken");
const Posts = require("../models/posts");
const path = require('path');
var fs = require('fs');

const jwtVerify = (token) => jwt.verify(token, process.env.JWT_SECRET);
function getRandomArbitrary(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}
const register = async (req, res) => {
    const {
        username,
        password,
        email,
        firstName,
        lastName
    } = req.body;
    if ([username, password, email, firstName, lastName].includes(undefined)) {
        const statusRes = new StatusRes(`Please fill all the fields: User Name, Password, Email, First Name, Last Name`)
        return res.status(400).json(statusRes)
    }
    const emailExists = await User.findOne({ email });
    const userExists = await User.findOne({ username });

    if (emailExists && userExists) {
        const statusRes = new StatusRes("Email and username already exits")
        return res.status(400).json(statusRes)
    } else if (emailExists) {
        const statusRes = new StatusRes("Email already exits")
        return res.status(400).json(statusRes)
    } else if (userExists) {
        const statusRes = new StatusRes("User Name already exits")
        return res.status(400).json(statusRes)
    }

    const hashPass = await hasPassword(password);
    const user = new User({
        username,
        password: hashPass,
        email,
        firstName,
        lastName
    })
    try {
        const newuser = await user.save();
        const statusRes = new StatusRes("User registered successfully", newuser)
        return res.status(200).json(statusRes);
    } catch (err) {
        const statusRes = new StatusRes(err.message)
        return res.status(400).json(statusRes);
    }
}

const login = async (req, res) => {
    const { username,
        password } = req.body;
    if (!username || !password) {
        const statusRes = new StatusRes("Provide all the details");
        return res.status(400).json(statusRes);
    }
    const user = await User.findOne({ username })
    if (user) {
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            const statusRes = new StatusRes("Password does not match");
            return res.status(400).json(statusRes);
        }
        const token = jwt.sign({
            _id: user._id,
        }, process.env.JWT_SECRET, { expiresIn: "30d" })
        user.password = undefined;
        const statusRes = new StatusRes("Logged in !!!", { user });

        res.cookie('token', token, { maxAge: 900000, httpOnly: true });

        return res.status(200).json(statusRes);
    } else {
        const statusRes = new StatusRes("User not found");
        return res.status(400).json(statusRes);
    }

}

const isAuth = async (req, res, next) => {
    const whiteList = ['/api/login', '/api/register', '/api/protected'];
    if (whiteList.includes(req.originalUrl)) {
        next();
        return
    }
    const token = req.cookies.token
    try {
        if (token) {
            const decode = jwtVerify(token);
            req.user = await User.findById(decode._id).select('-password');
            next();
            return;
        }
        const resp = new StatusRes("Not Authorized")
        // res.clearCookie("token");
        return res.status(401).json(resp);
    } catch (error) {
        const resp = new StatusRes("Not Authorized")
        // res.clearCookie("token");
        return res.status(401).json(resp);
    }
}

const protected = async (req, res) => {
    const token = req.cookies.token
    try {
        if (token) {
            const decode = jwtVerify(token);
            req.user = await User.findById(decode._id).select('-password');
            if (req.user) {
                const resp = new StatusRes("User Authenticated", req.user);
                return res.status(200).json(resp);
            }
            const resp = new StatusRes("User not found")
            return res.status(400).json(resp);
        } else {
            const resp = new StatusRes("Not Authorized")
            res.clearCookie("token");
            return res.status(401).json(resp);
        }
    } catch (error) {
        const resp = new StatusRes("Not Authorized");
        res.clearCookie("token");
        return res.status(401).json(resp);
    }
}

const logout = (req, res) => {
    res.clearCookie("token").status(401).json({ "TEST": "TEST" })
    res.end()
}

const uploadpost = async (req, res) => {
    const title = req.body.title;
    const caption = req.body.caption;
    const image = req.file.filename
    try {
        const token = req.cookies.token
        const decode = jwtVerify(token);
        const postedBy = decode._id;
        const post = new Posts({
            image,
            title,
            caption,
            postedBy
        })
        const savedPost = await post.save()
        const resp = new StatusRes("Post saved", savedPost);
        return res.status(200).json(resp);
    } catch (err) {
        const resp = new StatusRes(err.message);
        return res.status(400).json(resp);

    }
}

const getUserPosts = async (req, res) => {
    const token = req.cookies.token
    const decode = jwtVerify(token);
    try {
        const posts = await Posts.find({ postedBy: decode?._id })
            .populate('postedBy', '_id username firstName lastName photo')
            .sort({ createdAt: -1 })
            .limit(10)
        const resp = new StatusRes("Posts retrieved", posts)
        return res.status(200).json(resp)
    } catch (err) {
        const resp = new StatusRes("Something went wrong..!");
        res.status(500).json(resp)
    }
}


const getFeedPosts = async (req, res) => {
    const token = req.cookies.token
    const decode = jwtVerify(token);
    try {
        const users = await User.findById(decode?._id);

        const posts = await Posts.find({
            postedBy: {
                $in: users.following
            }
        })
            .populate('postedBy', '_id username firstName lastName photo')
            .sort({ createdAt: -1 })
            .limit(10)
        const resp = new StatusRes("Posts retrieved", posts)
        return res.status(200).json(resp)
    } catch (err) {
        const resp = new StatusRes("Something went wrong..!");
        res.status(500).json(resp)
    }
}

const likeunlike = async (req, res) => {
    const { likeUnlike, post } = req.body;
    const token = req.cookies.token;
    let decode;
    try {
        decode = jwtVerify(token);
    } catch (e) {
        const resp = new StatusRes("User not found");
        return res.status(401).json(resp);
    }

    try {
        const getpost = await Posts.findById(post)
        if (likeUnlike) {
            getpost.likes.push(decode._id)
        } else {
            const index = getpost.likes.indexOf(decode._id);
            if (index > -1) {
                getpost.likes.splice(index, 1);
            }
        }
        const updatedPost = await getpost.save();
        const resp = new StatusRes("Liked", updatedPost);
        return res.status(200).json(resp);
    } catch (err) {
        const resp = new StatusRes(err.message);
        return res.status(400).json(resp);
    }
}

const deletePost = async (req, res) => {
    const { id } = req.body;
    try {
        const post = await Posts.findByIdAndDelete(id);
        const filePath = path.join(__dirname, '..', 'static', 'posts', post.image)
        fs.unlinkSync(filePath);
        const resp = new StatusRes("Removed", post)
        return res.status(200).json(resp)
    } catch (err) {
        const resp = new StatusRes(err.message)
        return res.status(400).json(resp)
    }
}

const updateUser = async (req, res) => {
    try {
        let updatedUser = await User.findByIdAndUpdate(req.user._id, {
            ...req.body,
            photo: req?.file?.filename
        }, { new: true })
        updatedUser = {
            ...updatedUser._doc,
            password: undefined
        }
        const resp = new StatusRes("Success", updatedUser)
        return res.status(200).json(resp)
    } catch (e) {
        const resp = new StatusRes(e.message, null)
        return res.status(500).json(resp)
    }
}

const findPeople = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);
        let following = user.following;
        following.push(user._id);
        const people = await User.find({
            _id: {
                $nin: following
            }
        }).select('-password').limit(10);

        const resp = new StatusRes("success", people);
        return res.status(200).json(resp)



    } catch (e) {
        const resp = new StatusRes(e.message, null);
        return res.status(500).json(resp)
    }
}

const followUnFollow = async (req, res) => {
    try {
        const { id, follow } = req.body;
        const user = await User.findById(req.user._id);
        const toFollow = await User.findById(id);
        if (follow) {
            await user.following.push(toFollow);
            await toFollow.followers.push(user);
        } else {
            const toIndex = user.following.indexOf(toFollow);
            const userindex = toFollow.following.indexOf(user);
            if (toIndex > -1) {
                user.following.splice(toFollow, 1)
            }
            if (userindex > -1) {
                toFollow.following.splice(user, 1)
            }

        }

        await user.save();
        await toFollow.save();
        const resp = new StatusRes("success", null);
        return res.status(200).json(resp)
    } catch (e) {
        const resp = new StatusRes(e.message, null);
        return res.status(500).json(resp)
    }
}

module.exports = {
    register,
    login,
    isAuth,
    protected,
    logout,
    uploadpost,
    getUserPosts,
    likeunlike,
    deletePost,
    updateUser,
    findPeople,
    followUnFollow,
    getFeedPosts
}