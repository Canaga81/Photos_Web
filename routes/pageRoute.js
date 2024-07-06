const express = require('express');
const router = express.Router();

const { getIndexPage, getAboutPage, getRegisterPage, getLoginPage, getLogoutPage } = require('../controllers/pageControllers.js');

router.get('/', getIndexPage);
router.get('/about', getAboutPage);
router.get('/register', getRegisterPage);
router.get('/login', getLoginPage);
router.get('/logout', getLogoutPage);

module.exports = router;