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
        res.status(200).render('photos', {photos, link: "photos"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getAPhoto = async (req, res) => {
    try {
        const photo = await Photo.findById({_id: req.params.id});
        res.status(200).render('photo', {photo, link: "photos"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {createProduct, getAllPhotos, getAPhoto}