const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  source: String,
});

module.exports = mongoose.model("user", userSchema);
