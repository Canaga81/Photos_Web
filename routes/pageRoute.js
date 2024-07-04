const express = require('express');
const router = express.Router();

const {getIndexPage, getAboutPage, getRegisterPage, getLoginPage} = require('../controllers/pageControllers.js');

router.get('/', getIndexPage);
router.get('/about', getAboutPage);
router.get('/register', getRegisterPage);
router.get('/login', getLoginPage);

module.exports = router;