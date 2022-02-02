const { Schema, model } = require("mongoose");

const fieldSchema = new Schema({
  input: {
    type: String,
    enum: ["tel", "text", "email", "file", "textarea"],
  },
  name: String,
  label: String,
});

const valueNameSchema = new Schema({
  name: String,
  value: String,
});

const responseFormSchema = new Schema({
  formId: Schema.Types.ObjectId,
  values: [valueNameSchema],
});

const formSchema = new Schema({
  fields: [fieldSchema],
  responses: [{ type: Schema.Types.ObjectId, ref: "responses" }],
});

exports.formSchema = model("form", formSchema);
exports.responseSchema = model("responses", responseFormSchema);
module.exports = model("form", formSchema);
