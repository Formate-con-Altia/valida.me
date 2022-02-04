const { Schema, model } = require("mongoose");

const fieldSchema = new Schema({
  input: {
    type: String,
    enum: ["tel", "text", "email", "file", "textarea", "hidden"],
  },
  name: String,
  label: String,
});

const valueNameSchema = new Schema({
  name: String,
  value: String,
});

const responseFormSchema = new Schema({
  idForm: Schema.Types.ObjectId,
  values: [valueNameSchema],
});

const formSchema = new Schema({
  userId: Schema.Types.ObjectId,
  title: String,
  fields: [fieldSchema],
  responses: [{ type: Schema.Types.ObjectId, ref: "responses" }],
});

exports.Form = model("form", formSchema);
exports.Response = model("responses", responseFormSchema);
