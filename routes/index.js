const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { flash: req.flash("success") });
});

module.exports = router;
