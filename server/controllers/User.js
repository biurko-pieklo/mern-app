const { request, response } = require('express');
const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '1d'});
}

const getUsers = async (request, response) => {
    const users = await User.find({}).sort({
        createdAt: -1
    });

    response.status(200).json(users);
}

const getUser = async (request, response) => {
    const {id} = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({
            error: 'User of given id does not exist',
        });
    }

    const user = await User.findById(id);

    if (!user) {
        return response.status(404).json({
            error: 'User of given id does not exist',
        });
    }

    response.status(200).json(user);
}

const newUser = async (request, response) => {
    const {username, password, displayname} = request.body;

    try {
        const user = await User.create({username, password, displayname});
        response.status(200).json(user);
    } catch (error) {
        response.status(200).json({
            error: error.message
        });
    }
}

const deleteUser = async (request, response) => {
    const {id} = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({
            error: 'User of given id does not exist',
        });
    }

    const user = await User.findOneAndDelete({
        _id: id,
    });

    if (!user) {
        return response.status(404).json({
            error: 'User of given id does not exist',
        });
    }

    response.status(200).json(user);
}

const updateUser = async (request, response) => {
    const {id} = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({
            error: 'User of given id does not exist',
        });
    }

    const user = await User.findOneAndUpdate({
        _id: id,
    }, {
        ...request.body
    });

    if (!user) {
        return response.status(404).json({
            error: 'User of given id does not exist',
        });
    }

    response.status(200).json(user);
}

const loginUser = async (request, response) => {
    const {username, password} = request.body;

    try {
        const user = await User.login(username, password);

        const token = createToken(user._id);

        response.status(200).json({username, token});
    } catch (error) {
        response.status(400).json({
            error: error.message
        });
    }
}

const registerUser = async (request, response) => {
    const {username, password} = request.body;

    try {
        const user = await User.register(username, password);

        const token = createToken(user._id);

        response.status(200).json({username, token});
    } catch (error) {
        response.status(400).json({
            error: error.message
        });
    }
}

module.exports = {
    getUsers,
    getUser,
    newUser,
    deleteUser,
    updateUser,
    loginUser,
    registerUser
}
