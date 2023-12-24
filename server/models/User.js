const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
    },
    password: {
        type: String,
        required: true,
    },
    displayname: {
        type: String,
        required: true,
    }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
