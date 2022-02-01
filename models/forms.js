const { Schema, model } = require("mongoose");

const fieldSchema = new Schema({
  input: {
    type: [String],
    enum: ["tel", "text", "email"],
  },
  name: [String],
  label: [String],
});

const formSchema = new Schema({
  fields: [fieldSchema],
});

module.exports = model("form", formSchema);
