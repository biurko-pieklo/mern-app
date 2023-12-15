const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

router.get('/', (request, response) => {
    response.json({
        message: "GET all posts",
    });
});

router.get('/:id', (request, response) => {
    response.json({
        message: "GET single post",
    });
});

router.post('/', async (request, response) => {
    const {content} = request.body;

    try {
        const post = await Post.create({content});
        response.status(200).json(post);
    } catch (error) {
        response.status(200).json({error: error.message});
    }
});

router.delete('/:id', (request, response) => {
    response.json({
        message: "DELETE a post",
    });
});

router.patch('/:id', (request, response) => {
    response.json({
        message: "UPDATE a post",
    });
});

module.exports = router;
