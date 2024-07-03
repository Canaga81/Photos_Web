const express = require('express');
const router = express.Router();

const {getIndexPage, getAboutPage} = require('../controllers/pageControllers.js');

router.get('/', getIndexPage);
router.get('/about', getAboutPage);

module.exports = router;