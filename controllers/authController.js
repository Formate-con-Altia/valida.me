const passport = require("passport");

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

exports.googleUser = (req, res) => {};

exports.signUp = passport.authenticate("local-signup", {
  failureRedirect: "/register", // Si falla el registro, redirigir...
  successRedirect: "/", // Si NO falla el registro, redirigir...
  failureFlash: true, // Permite mostrar el mensaje de error definidos en la estrategia
});

exports.signIn = passport.authenticate("local-signin", {
  failureRedirect: "/login",
  successRedirect: "/",
  failureFlash: true,
});
