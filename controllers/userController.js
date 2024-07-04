const Users = require('../models/userModel.js');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {

    try {
        const user = await Users.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
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
            res.status(200).send('You are logged in.');
        }
        else {
            res.status(401).json({message: "Passwords are not matched !"});
        }

    } catch (error) {
        res.status(500).json({message: error.message});
    }

}

module.exports = {createUser, loginUser}