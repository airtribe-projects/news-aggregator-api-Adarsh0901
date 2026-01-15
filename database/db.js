const mongoose = require("mongoose");
require('dotenv').config() // it will load all .env variables in process.env

const MONGODB_CONNECT = process.env.MONGODB_CONNECT

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_CONNECT).then(() => {
                console.log("db connected successfully");
            }).catch((err) => {
                console.log("error while connecting to db", err);
            });
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
};

module.exports = connectDB;