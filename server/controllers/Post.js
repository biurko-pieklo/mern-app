const { request, response } = require('express');
const Post = require('../models/Post');
const mongoose = require('mongoose');

const getPosts = async (request, response) => {
    const posts = await Post.find({}).sort({
        createdAt: -1
    });

    response.status(200).json(posts);
}

const getPost = async (request, response) => {
    const {id} = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({
            error: 'Post of given id does not exist',
        });
    }

    const post = await Post.findById(id);

    if (!post) {
        return response.status(404).json({
            error: 'Post of given id does not exist',
        });
    }

    response.status(200).json(post);
}

const newPost = async (request, response) => {
    const {content, userId} = request.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(404).json({
            error: 'User of given id does not exist',
        });
    }

    if (!content) {
        return response.status(400).json({
            error: 'Post content cannot be empty',
        });
    }

    try {
        const post = await Post.create({content, userId});
        response.status(200).json(post);
    } catch (error) {
        response.status(200).json({
            error: error.message
        });
    }
}

const deletePost = async (request, response) => {
    const {id} = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({
            error: 'Post of given id does not exist',
        });
    }

    const post = await Post.findOneAndDelete({
        _id: id,
    });

    if (!post) {
        return response.status(404).json({
            error: 'Post of given id does not exist',
        });
    }

    response.status(200).json(post);
}

const updatePost = async (request, response) => {
    const {id, content} = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({
            error: 'Post of given id does not exist',
        });
    }

    if (!content) {
        return response.status(400).json({
            error: 'Post content cannot be empty',
        });
    }

    const post = await Post.findOneAndUpdate({
        _id: id,
    }, {
        ...request.body
    });

    if (!post) {
        return response.status(404).json({
            error: 'Post of given id does not exist',
        });
    }

    response.status(200).json(post);
}

module.exports = {
    getPosts,
    getPost,
    newPost,
    deletePost,
    updatePost,
}
