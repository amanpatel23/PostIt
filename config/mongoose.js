require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on('error', console.log.bind(console, 'Error connecting to MongoDB'));
db.once('open', function() {
    console.log('Connected to Database: MongoDB');
})

module.exports = db;