const Form = require("../models/forms");
const mongoose = require("mongoose")
const { parse } = require("himalaya")

const createForm = (req, res) => {
    console.log(req.params)
    res.render("forms/index");
};

const createNewForm = async(req, res) => {
    const html = req.body.data
    let data_;
    let obj = []

    let fields = []

    input: [{
        "name": ["name", "name"],
        "email": 2,
        "tel": 9,
    }]

    data_ = parse(html).map((el, i) => {

            if (el.children[3].attributes[1].value == "name") {
                obj.push({ "name": el.children[3].attributes[1].value })

            } else if (el.children[3].attributes[1].value == "email") {
                obj.push({ "email": el.children[3].attributes[1].value })

            } else if (el.children[3].attributes[1].value == "tel") {
                obj.push({ "tel": el.children[3].attributes[1].value })
            }

        })
        /**    data_ = parse(html).map((el, i) => {

            if (el.children[3].attributes[1].value == "name") {
                obj.push({ "name": el.children[3].attributes[1].value })

            } else if (el.children[3].attributes[1].value == "email") {
                obj.push({ "email": el.children[3].attributes[1].value })

            } else if (el.children[3].attributes[1].value == "tel") {
                obj.push("tel": el.children[3].attributes[1].value)
            }

        }) */
    console.log(data_)
        //console.log(...data_)
    const form = await new Form({
        input: obj
    }).save();

    res.status(201).send({ id: form._id });
};

const getCreatedForm = async(req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return false;

    const form = await Form.findOne({ _id: id })
    res.status(200).render("forms/id", { form })

    // try {
    //       const form = await Form.findOne({ _id: id });

    //       res.status(200).render("forms/id", { form });
    //   } catch (error) {
    //       console.error(error);
    //       res.status(404).send("Recurso no existente");
    //   }
};

module.exports = { createForm, createNewForm, getCreatedForm };