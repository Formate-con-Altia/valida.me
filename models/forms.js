const { Schema, model } = require("mongoose");

const newFormSchema = new Schema({
    input: [{
        "name": [{
            type: [String],
            maxlength: 20
        }],
        "tel": {
            type: [String],
            maxlength: 9
        },
        "email": {
            type: [String],
        }
    }]
})


const formSchema = new Schema({
    html: String,
    slug: String,
});

module.exports = model("form", newFormSchema);