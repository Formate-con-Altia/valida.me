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

const getCreatedForm = async (req, res) => {
  try {
    const { id } = req.params;
    // if (mongoose.Types.ObjectId.isValid(id))
    const form = await Form.findOne({ _id: id });

    res.status(200).render("forms/id", { form });
  } catch (error) {
    console.error(error);
    res.status(404).send("Recurso no existente");
  }
};

module.exports = { createForm, createNewForm, getCreatedForm };
