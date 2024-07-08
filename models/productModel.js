const mongoose = require('mongoose');

const {Schema} = mongoose

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
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    url: {
        type: String,
        required: true
    }

},
    {
        timestamps: true
    }
);

const Photos = mongoose.model('Photos', photoSchema);

module.exports = Photos;