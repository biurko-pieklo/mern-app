const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

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

userSchema.statics.register = async function(username, password) {
    if (!username || !password) {
        throw Error('Username and password cannot be empty');
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough');
    }

    const exists = await this.findOne({ username });

    if (exists) {
        throw Error('This username is taken :(');
    }

    const hash = await bcrypt.hash(password, 5);

    const user = await this.create({ username, password: hash, displayname: username });

    return user;
}

userSchema.statics.login = async function(username, password) {
    if (!username || !password) {
        throw Error('Username and password cannot be empty');
    }

    const user = await this.findOne({ username });

    if (!user) {
        throw Error('Incorrect username :(');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Incorrect password :(');
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);
