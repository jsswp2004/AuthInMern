const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const eventSchema = new mongoose.Schema({
    name: { type:String,required: true },
    addedDate: { type: String,required: true },
});


const Role = mongoose.model("event", eventSchema);

const validate = (data) => {
	const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        addedDate: Joi.string().required().label("Added Date"),
	});
	return schema.validate(data);
};

module.exports = { Event, validate };


