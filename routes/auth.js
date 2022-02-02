require("dotenv").config();
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
const authController = require("../controllers/authController");
const express = require("express");

const router = express.Router();

router.get("/login", authController.loginUser);
router.get("/register", authController.registerUser);
router.get(GOOGLE_CALLBACK_URL, authController.googleUser);

router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser);
router.post(GOOGLE_CALLBACK_URL, authController.googleUser);
module.exports = router;
