const mongoose = require("mongoose");
const Joi = require("joi");

const smsSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    body: { type: String, required: true },
});


const Message = mongoose.model("message", smsSchema);

const validate = (data) => {
    const schema = Joi.object({
        from: Joi.string().required().label("Name"),
        to: Joi.string().required().label("Email"),
        body: Joi.string().label('Message'),
    });
    return schema.validate(data);
};

module.exports = { Message, validate };
