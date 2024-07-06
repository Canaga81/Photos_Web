const Users = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {

    try {
        const user = await Users.create(req.body);
        res.status(201).json({user: user._id})
    } catch (error) {

        console.log("ERROR:::", error);

        let errors2 = {};

        if(error.code === 11000) {
            errors2.email = "The email is already registered."
        }

        if(error.name === "ValidationError") {
            Object.keys(error.errors).forEach((key) => {
                errors2[key] = error.errors[key].message
            })
        }

        console.log("ERRORS", errors2);

        res.status(400).json(errors2)
    }

}

const loginUser = async (req, res) => {

    try {

        const { username, password } = req.body;
        const user = await Users.findOne({username});

        let same = false;

        if(user) {
            same = await bcrypt.compare(password, user.password);
        }
        else {
            return res.status(401).json({message: "There is no such user !"});
        }

        if(same) {

            const token = createToken(user._id)
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 1000*60*60*24
            })

            res.redirect('/users/dashboard');

        }
        else {
            res.status(401).json({message: "Passwords are not matched !"});
        }

    } catch (error) {
        res.status(500).json({message: error.message});
    }

}

const createToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

const getDashboardPage = (req, res) => {
    res.status(200).render('dashboard', {
        link: "dashboard"
    });
}

module.exports = {createUser, loginUser, getDashboardPage}