const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	name: { type: String, required: false },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	role: { type: String, required: true },
	email: { type: String, required: true },
	addedDate: { type: String, required: true },
	password: { type: String, required: true },
	lastUpdated: { type: String, required: false },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		name: Joi.string().label("Name"),
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		role: Joi.string().required().label("Role"),
		email: Joi.string().email().required().label("Email"),
		addedDate: Joi.string().required().label("Added Date"),
		password: passwordComplexity().required().label("Password"),
		lastUpdated: Joi.string().label('Last Updated'),
	});
	return schema.validate(data);
};

module.exports = { User, validate };
