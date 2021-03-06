require("dotenv").config();

const express = require("express");
const authController = require("../controllers/authController");
const { isAuthenticated } = require("../lib/auth");
const { validate } = require("../lib/validator");

const router = express.Router();

const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

router.get("/login", isAuthenticated, authController.loginUser);
router.get("/logout", authController.logoutUser);
router.get("/register", authController.registerUser);
router.get("/auth/google", isAuthenticated, authController.googleUser);
router.get(
  GOOGLE_CALLBACK_URL,
  isAuthenticated,
  authController.googleUserCallback
);

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
