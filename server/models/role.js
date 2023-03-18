const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    addedDate: { type: String, required: true },
    lastUpdated: { type: String, required: false },
});


const Role = mongoose.model("role", roleSchema);

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        addedDate: Joi.string().required().label("Added Date"),
        lastUpdated: Joi.string().label('Last Updated'),
    });
    return schema.validate(data);
};

module.exports = { Role, validate };


