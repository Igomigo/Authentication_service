// User account route

const express = require("express");
const router = express.Router();
const accountCtrl = require("../controllers/UserAccountCtrl");
const authenticate = require("../auth/authMiddleware");

// Get requests for user account/profile
router.get("/account", authenticate, accountCtrl.account);


module.exports = router;