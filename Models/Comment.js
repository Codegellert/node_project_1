const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema ({
    email: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now 
    },
});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;