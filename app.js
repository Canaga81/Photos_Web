const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 8080

app.get('/', (req, res) => {
    res.status(200).send('<h1>Hello World</h1>');
});

app.listen(PORT, () => {
    console.log(`Is running on port: ${PORT}`);
});