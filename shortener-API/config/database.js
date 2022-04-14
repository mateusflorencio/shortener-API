const mongoose = require('mongoose');
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect(MONGO_URL, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});