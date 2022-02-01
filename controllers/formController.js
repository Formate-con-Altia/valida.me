const Form = require("../models/forms");
const mongoose = require("mongoose");
const { parse } = require("node-html-parser");

const createForm = (req, res) => {
  console.log(req.params);
  res.render("forms/index");
};

const createNewForm = async (req, res) => {
  const parsedHtml = parse(req.body.data);

  // Obtenemos el texto de todos los labels
  const parsedLabels = parsedHtml
    .querySelectorAll("label")
    .map((elm) => elm.innerText);

  // Obtenemos los inputs y devolvemos un array de objetos con los atributos necesarios
  const parsedInputs = parsedHtml
    .querySelectorAll("input, textarea")
    .map((elm, i) => {
      return {
        name: elm.attrs.name,
        input: elm.attrs.type,
        label: parsedLabels[i],
      };
    });
  // const fieldSchema = new Schema({
  //     input: {
  //         type: String,
  //         enum: ["tel", "text", "email"],
  //     },
  //     name: String,
  //     label: String
  // })

  console.log(...parsedInputs);
  const form = await new Form({
    fields: parsedInputs,
  }).save();

  res.status(201).send({ id: form._id });
};

const getCreatedForm = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Recurso no encontrado");

  const form = await Form.findOne({ _id: id });
  res.status(200).render("forms/id", { form });

  // try {
  //       const form = await Form.findOne({ _id: id });

  //       res.status(200).render("forms/id", { form });
  //   } catch (error) {
  //       console.error(error);
  //       res.status(404).send("Recurso no existente");
  //   }
};

module.exports = { createForm, createNewForm, getCreatedForm };
