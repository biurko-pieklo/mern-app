const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);
