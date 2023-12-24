require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');

const app = express();

app.use(express.json());

app.use((request, response, next) => {
    console.log(request.path, request.method);
    next();
})

app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Server is running on port ' + process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error)
    });
