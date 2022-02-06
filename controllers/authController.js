const passport = require("passport");
const { validationResult } = require("express-validator");

exports.loginUser = (req, res) => {
  res.render("auth/login");
};

exports.registerUser = (req, res) => {
  res.render("auth/register");
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    req.logout();
    res.redirect("/");
  });
};

exports.googleUser = passport.authenticate("google", {
  scope: ["email", "profile"],
});

exports.googleUserCallback = passport.authenticate("google", {
  failureRedirect: "/login",
  successRedirect: "/",
  failureFlash: true,
});

exports.signUp = async (req, res, next) => {
  const validationResults = validationResult(req);

  if (!validationResults.isEmpty()) {
    req.flash("error", validationResults.array());
    res.render("auth/register", {
      errors: req.flash("error"),
    });
    return;
  }

  await passport.authenticate("local-signup", {
    failureRedirect: "/register", // Si falla el registro, redirigir...
    successRedirect: "/", // Si NO falla el registro, redirigir...
    failureFlash: true, // Permite mostrar el mensaje de error definidos en la estrategia
  })(req, res, next);
};

exports.signIn = async (req, res, next) => {
  const validationResults = validationResult(req);

  if (!validationResults.isEmpty()) {
    req.flash("error", validationResults.array());
    res.render("auth/login", { errors: req.flash("error") });
    return;
  }

  await passport.authenticate("local-signin", {
    failureRedirect: "/login",
    successRedirect: "/",
    failureFlash: true,
  })(req, res, next);
};
