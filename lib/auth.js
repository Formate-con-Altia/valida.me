// Si el usuario está autenticado, no podrá acceder a la página y será redirigido al inicio
exports.isAuthenticated = (req, res, next) => {
  req.isAuthenticated() ? res.redirect("/") : next();
};

// Si el usuario no está autenticado, no podrá acceder a la página y será redirigido al login
exports.isNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  req.flash("error", "Ingresa a tu cuenta para poder visualizar esa página.");

  res.redirect("/login");
};

// Variables globales para obtener el usuario y mensajes de feedback
exports.globalVars = (req, res, next) => {
  res.locals.info = req.flash("info");
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
};
