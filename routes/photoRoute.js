const express = require('express');
const router = express.Router();

const {createProduct,getAllPhotos} = require('../controllers/photoController');

router.get('/', getAllPhotos);
router.post('/', createProduct);

module.exports = router;