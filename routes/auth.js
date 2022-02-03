require("dotenv").config();

const express = require("express");
const authController = require("../controllers/authController");
const { isAuthenticated } = require("../lib/auth");
const { validate } = require("../lib/validator");

const router = express.Router();

const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

router.get("/login", isAuthenticated, authController.loginUser);
router.get("/logout", authController.logoutUser);
router.get("/register", isAuthenticated, authController.registerUser);
router.get(GOOGLE_CALLBACK_URL, authController.googleUser);

router.post(
  "/login",
  isAuthenticated,
  validate("signIn"),
  authController.signIn
);
router.post(
  "/register",
  isAuthenticated,
  validate("signUp"),
  authController.signUp
);

module.exports = router;
