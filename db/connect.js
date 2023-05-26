require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = (url = process.env.MONGO_URI) => mongoose.connect(url)

module.exports = connectDB;