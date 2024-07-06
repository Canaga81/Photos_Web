const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Username area is required"],
        lowercase: true,
        validate: [validator.isAlphanumeric, "Only Alphanumeric characters"]
    },
    email: {
        type: String,
        required: [true, "Email area is required"],
        unique: true,
        validate: [validator.isEmail, "Valid Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password area is required"],
        minLength: [4, "At least 4 characters"]
    },

},
    {
        timestamps: true
    }
);


userSchema.pre('save', function(next) {

    const user = this;

    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash;
        
        next();
    })

})

const Users = mongoose.model('user', userSchema);

module.exports = Users;