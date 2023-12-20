const express = require('express');
const {
    getPosts,
    getPost,
    newPost,
    deletePost,
    updatePost,
} = require('../controllers/Post');

const router = express.Router();

router.get('/', getPosts);

router.get('/:id', getPost);

router.post('/', newPost);

router.delete('/:id', deletePost);

router.patch('/:id', updatePost);

module.exports = router;
