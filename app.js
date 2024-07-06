const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 8080;
const conn = require('./db.js');
const cookieParser = require('cookie-parser')
const pageRoute = require('./routes/pageRoute.js');
const photoRoute = require('./routes/photoRoute.js');
const userRoute = require('./routes/userRoute.js');
const { checkUser } = require('./middlewares/authMiddleware.js');

conn();

//^ ejs template engine
app.set('view engine', 'ejs');

//^ static files middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//^ routes
app.use('*', checkUser);
app.use('/', pageRoute);
app.use('/photos', photoRoute);
app.use('/users', userRoute);

app.listen(PORT, () => {
    console.log(`Is running on port: ${PORT}`);
});