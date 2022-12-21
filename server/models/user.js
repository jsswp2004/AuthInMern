// const mongoose = require("mongoose");
import mongoose from 'mongoose';
// const jwt = require("jsonwebtoken");
import jwt from 'jsonwebtoken';
// const Joi = require("joi");
import Joi from 'joi';
// const passwordComplexity = require("joi-password-complexity");
import passwordComplexity from 'joi-password-complexity';

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
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
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

// module.exports = { User, validate };
export { User, validate };
