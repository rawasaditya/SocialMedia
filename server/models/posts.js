const mongoose = require("mongoose");
const { Schema } = mongoose;
const postSchema = new Schema({
    image: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    title: {
        type: String,
        require: true,
        trim: true,
    },
    caption: {
        type: String,
        require: true,
        trim: true,
    },
    likes: [{
        type: Schema.ObjectId, ref: "User"
    }],
    comments: [{
        text: String,
        created: { type: Date, default: Date.now },
        postedBy: {
            type: Schema.ObjectId, ref: "User"
        }
    }],
    postedBy: {
        type: Schema.ObjectId,
        ref: "User"
    }

}, { timestamps: true });

const Posts = mongoose.model('Posts', postSchema);
module.exports = Posts;