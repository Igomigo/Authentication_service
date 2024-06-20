const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load the config settings from the .env file
dotenv.config();

mongoose.set("strictQuery", false);

const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully");
    } catch (err) {
        console.error(err);
    }
}

module.exports = dbConnect;
