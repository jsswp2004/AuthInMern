const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const recordSchema = new mongoose.Schema({
    medicalRecordNumber:{ type: Number,required: true },
    visitNumber: { type: Number,required: true },
    firstName: { type:String,required: true },
    lastName: { type:String,required: true },
    middleName: { type: String,required: false },
    gender:{ type: String,required: false },
    race: { type: String,required: false },
    dateOfBirth: { type:String,required: true },
    age: { type: Number,required: false },
    language:{ type: String,required: false },
    address: { type: String,required: false },
    city: { type: String,required: false },
    zipCode: { type: Number,required: false },
    state: { type: String, required: false },
    email: { type: String, required: true },
    addedDate: { type: String,required: true },
});

// clientSchema.methods.generateAuthToken = function () {
// 	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
// 		expiresIn: "7d",
// 	});
// 	return token;
// };

const Record = mongoose.model("record", recordSchema);

const validate = (data) => {
	const schema = Joi.object({
        medicalRecordNumber:{ type: Number,required: true },
        visitNumber: { type: Number,required: true },
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        middleName: { type: String,required: false },
        gender:{ type: String,required: false },
        race: { type: String,required: false },
        dateOfBirth: { type:String,required: true },
        age: { type: Number,required: false },
        language:{ type: String,required: false },
        address: { type: String,required: false },
        city: { type: String,required: false },
        zipCode: { type: Number,required: false },
        state: { type: String, required: false },
        email: Joi.string().email().required().label("Email"),
        addedDate: Joi.string().required().label("Added Date"),
	});
	return schema.validate(data);
};

module.exports = { Record, validate };


