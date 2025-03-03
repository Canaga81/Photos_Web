const Photo = require('../models/productModel.js');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const createProduct = async (req, res) => {

    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename: true,
            folder: "fotolar"
        } 
    )

    try {
        await Photo.create({
            name: req.body.name,
            description: req.body.description,
            user: res.locals.user._id,
            url: result.secure_url
        });

        fs.unlinkSync(req.files.image.tempFilePath)

        res.status(201).redirect('/users/dashboard');
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

const getAllPhotos = async (req, res) => {

    try {
        const photos = res.locals.user ? await Photo.find({ user: { $ne: res.locals.user._id } })
        : await Photo.find({})
        res.status(200).render('photos', {photos, link: "photos"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

const getAPhoto = async (req, res) => {

    try {
        const photo = await Photo.findById({_id: req.params.id}).populate("user");
        res.status(200).render('photo', {photo, link: "photos"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

module.exports = {createProduct, getAllPhotos, getAPhoto}