const express = require('express');
const {
    getUsers,
    getUser,
    newUser,
    deleteUser,
    updateUser,
    loginUser,
    registerUser
} = require('../controllers/User');

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', newUser);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

router.post('/login', loginUser);

router.post('/register', registerUser);

module.exports = router;
