const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const uploadSchema = new mongoose.Schema({
    // name: { type: String, required: true },
    name: { type: String, required: false },

    // addedDate: { type: String, required: true },
    addedDate: { type: String, required: false },

    lastUpdated: { type: String, required: false },
},
    //added 4/17 for upload
    {
        collection: 'roles'
    });


const Upload = mongoose.model("roleUpload", uploadSchema);

const validate = (data) => {
    const schema = Joi.object({
        // name: Joi.string().required().label("Name"),
        name: Joi.string().label("Name"),

        addedDate: Joi.string().label("Added Date"),
        // addedDate: Joi.string().required().label("Added Date"),

        lastUpdated: Joi.string().label('Last Updated'),
    });
    return schema.validate(data);
};

module.exports = { Upload, validate };


