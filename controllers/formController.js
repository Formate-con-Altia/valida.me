const { Form, Response } = require("../models/forms");
const mongoose = require("mongoose");
const { parse } = require("node-html-parser");
const { slugify } = require("../lib/helpers");
const { response } = require("express");

const createForm = (req, res) => {
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
        name: `${slugify(parsedLabels[i])}[${i}]`,
        input: elm.attrs.type,
        label: parsedLabels[i],
      };
    });
    
    const form = await new Form({
      fields: parsedInputs,
    }).save();
    
    res.status(201).send({ id: form._id });
  };
  
  //--------------------------------------------
  
  const createResponse = async (req, res) => {
    
    let datos = req.body
    var keys = Object.keys(datos);
    let nameValues = [];
    let idForm = req.body.idForm;
    
    // recorrer req.body, y teneis que crear un array de objetos del estilo
    // [{name: "name[0]", value:"Adrian"}, {{name: "telefono[1]", value:"123456"}}]          
    
    for (var i = 0; i < keys.length-1; i++) {
      var val = datos[keys[i]];
      var key = keys[i]
     
      nameValues.push({
        name: key,
        value: val
      });
    }
    
    // Crer un documento del tipo responseFormSchema, donde su formId es justament
    // el campo req.body.idForm y el campo "values" del documento es la lista de
    // documentos del tipo valueNameSchema previamente creados                              
    
    const formResponse = await new Response({
      values: nameValues,
      idForm: idForm
    }).save();

    const form = await Form.findOne({ _id: idForm });
    console.log(form)

    form.responses.push(formResponse._id)
    form.save();
    
    // en formREsponse._id teneis el identificador que se acaba de crear para este documento REsponse

    // en 'form' teneos el documento Formulario identificado por idForm

    // Teneis que añadir el formREsponse._id como nuevo elemento del array "responses" del "form" y salvarlo.

    //console.log(formResponse)
     
  res.status(201).send();
};


// Recuperar de la base de datos el documento formSchema identificado con idForm

  // añadir el ObjectID al array de respuesta del documento From (campo responses)

  // .save del Form

  // // Obtenemos el texto de todos los labels
  // const parsedLabels = parsedHtml
  //   .querySelectorAll("label")
  //   .map((elm) => elm.innerText);

  // // Obtenemos los inputs y devolvemos un array de objetos con los atributos necesarios
  // const parsedValues = parsedHtml
  //   .querySelectorAll("input, textarea")
  //   .map((elm, i) => {
  //     return {
  //       name: `${slugify(parsedLabels[i])}[${i}]`,
  //       input: elm.attrs.type,
  //       label: parsedLabels[i],
  //       value: elm.attrs.value
  //     };
  //   });

  // const form = await new Form({
  //   response: parsedValues,
  // }).save();

  // console.log(parsedValues);

//------------------------------------------------

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

module.exports = { createForm, createNewForm, createResponse, getCreatedForm };

