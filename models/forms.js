const { Schema, model } = require("mongoose");

const formSchema = new Schema({
  html: String,
  slug: String,
});

module.exports = model("form", formSchema);
