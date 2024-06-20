// Authentication routes

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticate = require("../auth/authMiddleware");

// POST request to register user
router.post("/register", authController.register);

// POST request to log a user in
router.post("/login", authController.login);

// POST request to log a user out
router.post("/logout", authenticate, authController.logout);


module.exports = router;