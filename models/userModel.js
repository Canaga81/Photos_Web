const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
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