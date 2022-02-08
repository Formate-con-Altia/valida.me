const { Form, Response } = require("../models/forms");
const { Types } = require("mongoose");
const { parse } = require("node-html-parser");
const { slugify } = require("../lib/helpers");

// GET /forms/list
exports.showForms = async (req, res) => {
  let forms = await Form.find({ userId: req.user._id });

  res.render("forms/list", { forms });
};

// GET /forms/:id/responses/json
exports.showResponses = async (req, res) => {
  const id = Types.ObjectId(req.params.id);

  const values = await Response.aggregate()
    .match({ idForm: id })
    .project({ "values.value": 1, _id: 0 })
    .unwind("values");

  const count = await Form.aggregate()
    .match({ _id: id })
    .project({ fields: 1, _id: 0 })
    .unwind("fields")
    .count("fields");

  let results = [];

  for (let i = 0; i < values.length; i += count[0].fields) {
    results.push(values.slice(i, i + count[0].fields));
  }

  res.json(results);
};

// GET /forms/:id/responses
exports.getResponses = async (req, res) => {
  const id = Types.ObjectId(req.params.id);

  const form = await Form.aggregate()
    .match({ _id: id })
    .project({ "fields.label": 1, _id: 0 })
    .unwind("fields");

  res.render("forms/responses", {
    path: req.protocol + "://" + req.get("host") + req.originalUrl,
    form,
  });
};

// GET /forms
exports.createForm = (req, res) => {
  if (!req.user || !req.user._id) {
    return res.redirect("/");
  }
  res.render("forms/index");
};

// POST /forms/create
exports.createNewForm = async (req, res) => {
  const parsedHtml = parse(req.body.data);

  // Obtenemos el texto de todos los labels
  const parsedLabels = parsedHtml
    .querySelectorAll("label")
    .map((elm) => elm.innerText);

  // Inicializamos el índice para iterar sobre cada label
  let labelIndex = 0;

  // Obtenemos el texto de todos los placeholders
  const parsedPlaceholders = parsedHtml
    .querySelectorAll("input, textarea")
    .map((elm) => {
      if (!elm.attrs.placeholder) {
        return parsedLabels[labelIndex++];
      }

      return elm.attrs.placeholder;
    });

  // Obtenemos los inputs y devolvemos un array de objetos con los atributos necesarios
  const parsedInputs = parsedHtml
    .querySelectorAll("input, textarea")
    .map((elm, i) => {
      return {
        name: `${slugify(parsedPlaceholders[i])}[${i}]`,
        input: elm.attrs.type,
        label: parsedPlaceholders[i],
      };
    });

  const form = await new Form({
    userId: req.user._id,
    title: req.body.formTitle,
    fields: parsedInputs,
  }).save();

  res.status(201).send({ id: form._id });
};

// POST /forms/formResponse
exports.createResponse = async (req, res) => {
  let datos = req.body;
  var keys = Object.keys(datos);
  let nameValues = [];
  let idForm = req.body.idForm;

  // recorrer req.body, y teneis que crear un array de objetos del estilo
  // [{name: "name[0]", value:"Adrian"}, {{name: "telefono[1]", value:"123456"}}]

  for (var i = 0; i < keys.length - 1; i++) {
    var val = datos[keys[i]];
    var key = keys[i];

    nameValues.push({
      name: key,
      value: val,
    });
  }

  // Crer un documento del tipo responseFormSchema, donde su formId es justament
  // el campo req.body.idForm y el campo "values" del documento es la lista de
  // documentos del tipo valueNameSchema previamente creados

  const formResponse = await new Response({
    values: nameValues,
    idForm: idForm,
  }).save();

  // Recuperar el formulario correspondiente al id del formulario
  const form = await Form.findOne({ _id: idForm });
  // Enviar el nuevo id de respuesta al array de respuestas del formulario
  form.responses.push(formResponse._id);
  // Actualizar el documento de la base de datos
  await form.save();

  req.flash("success", "Respuestas guardadas correctamente.");

  res.status(201).redirect("/");
};

// GET /forms/:id
exports.getCreatedForm = async (req, res) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) return res.status(404).render("errors/404");

  const form = await Form.findOne({ _id: id });
  res.status(200).render("forms/id", { form });
};
