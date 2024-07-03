const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

},
    {
        timestamps: true
    }
);

const Photos = mongoose.model('Photos', photoSchema);

module.exports = Photos