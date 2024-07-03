const Photo = require('../models/productModel.js');

const createProduct = async (req, res) => {
    try {
        const photo = await Photo.create(req.body);
        res.status(201).json(photo);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getAllPhotos = async (req, res) => {
    try {
        const photos = await Photo.find({});
        res.status(200).json(photos)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {createProduct, getAllPhotos}