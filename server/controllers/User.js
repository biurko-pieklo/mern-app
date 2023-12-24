const { request, response } = require('express');
const User = require('../models/User');
const mongoose = require('mongoose');

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

module.exports = {
    getUsers,
    getUser,
    newUser,
    deleteUser,
    updateUser,
}
