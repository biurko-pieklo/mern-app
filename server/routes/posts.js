const express = require('express');
const {
    getPosts,
    getPost,
    newPost,
    deletePost,
    updatePost,
} = require('../controllers/Post');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.get('/', getPosts);

router.get('/:id', getPost);

router.post('/', newPost);

router.use(requireAuth).delete('/:id', deletePost);

router.use(requireAuth).patch('/:id', updatePost);

module.exports = router;
