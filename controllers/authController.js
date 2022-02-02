exports.loginUser = (req, res) => {
  res.render("auth/login");
};
exports.registerUser = (req, res) => {
  res.render("auth/register");
};
exports.googleUser = (req, res) => {};
