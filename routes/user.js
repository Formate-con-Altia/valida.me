const express = require("express");
const userController = require("../controllers/userController");
const { isAuthenticated } = require("../lib/auth");

const router = express.Router();

router.get("profile", userController.getProfile);

module.exports = router;
