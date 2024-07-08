const express = require('express');
const router = express.Router();

const {createProduct, getAllPhotos, getAPhoto} = require('../controllers/photoController');

router.get('/', getAllPhotos);
router.post('/', createProduct);
router.get('/:id', getAPhoto);

module.exports = router;