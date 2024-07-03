const mongoose = require('mongoose');
const conn = () => {

    mongoose.connect(process.env.DB_URI, {
        dbName: 'photos_web',
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to the DB successfully");
    }).catch((err) => {
        console.log(`DB connection error: ${err.message}`);
    })

}

module.exports = conn