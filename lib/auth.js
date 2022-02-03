// Si el usuario está autenticado, no podrá acceder a la página y será redirigido al inicio
exports.isAuthenticated = (req, res, next) => {
  req.isAuthenticated() ? res.redirect("/") : next();
};

// Si el usuario no está autenticado, no podrá acceder a la página y será redirigido al login
exports.isNotAuthenticated = (req, res, next) => {
  !req.isAuthenticated() ? res.redirect("/login") : next();
};
