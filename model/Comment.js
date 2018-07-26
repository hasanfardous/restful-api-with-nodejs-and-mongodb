const mongoose = require('mongoose');

const comment_schema = new mongoose.Schema({
    content: {
        type: String,
        required: "Comment content is required."
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: "Field is required."
    }
});

module.exports = mongoose.model("Comment", comment_schema);