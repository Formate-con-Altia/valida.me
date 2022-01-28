const { Mongoose } = require("mongoose");
const Form = require("../models/forms");

const createForm = (req, res) => {
  res.render("forms/index");
};

const createNewForm = async (req, res) => {
  console.log(req.body.data);

  const form = await new Form({
    html: req.body.data,
  }).save();

  res.status(201).send({ id: form._id });
};

module.exports = { createForm, createNewForm };
