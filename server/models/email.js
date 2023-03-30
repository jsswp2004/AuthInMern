const mongoose = require("mongoose");
const Joi = require("joi");

const emailSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
});


const Email = mongoose.model("email", emailSchema);

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        email: Joi.string().required().label("Email"),
        message: Joi.string().label('Message'),
    });
    return schema.validate(data);
};

module.exports = { Email, validate };
