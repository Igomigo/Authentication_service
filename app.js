// The authentication server setup
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

// Import the respective routes
const authRoutes = require("./routes/authRoutes");
const accountRoute = require("./routes/accountRoute");
const dbConnect = require("./config/config.js");

const app = express();

// set up the mongoose database connection
dbConnect();

// DO NOT uncomment this code
// main().catch((err) => {
    //if (err) console.log("An error occured while connecting", err);
    //console.log("Connection established with database locally");
//});
//async function main() {
//    await mongoose.connect("mongodb://127.0.0.1:27017/authTestDb");
//}

// Middlewares setup
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/user", accountRoute);

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to DaSoftest Authentication Multiverse");
});


module.exports = app;