const userModel = require("../models/user");
const passport = require("passport");

exports.loginUser = (req, res) => {
  res.render("auth/login");
};
exports.registerUser = (req, res) => {
  res.render("auth/register");
};
exports.googleUser = (req, res) => {};

exports.signUp = passport.authenticate("local-signup", {
  failureRedirect: "/register", // Si falla el registro, redirgir...
  successRedirect: "/", // Si NO falla el registro, redirgir...
  failureFlash: true, // Permite mostrar el mensaje de error definidos en la estrategia
});
