const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    username: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
    firstName: {
        type: String,
        require: true,
        trim: true,
    },
    lastName: {
        type: String,
        require: true,
        trim: true,
    },
    about: {
        type: String,
    },
    photo: String,
    following: [{
        type: Schema.ObjectId, ref: "User"
    }],
    followers: [{
        type: Schema.ObjectId, ref: "User"
    }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;