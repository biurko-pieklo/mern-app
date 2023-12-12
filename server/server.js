require('dotenv').config();

const express = require('express');
const app = express();

app.get('/', (request, response) => {
    response.json({
        message: 'The index page'
    });
});

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT);
});