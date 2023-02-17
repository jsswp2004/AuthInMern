const mongoose = require("mongoose");

const Joi = require("joi");


const visitSchema = new mongoose.Schema({
    medicalRecordNumber:{ type: Number,required: false },
    visitNumber: { type: Number,required: false },
    firstName: { type:String,required: true },
    lastName: { type:String,required: true },
    middleName: { type: String,required: false },
    // gender:{ type: String,required: false },
    // race: { type: String,required: false },
    // dateOfBirth: { type:String,required: true },
    // age: { type: Number,required: false },
    // language:{ type: String,required: false },
    // address: { type: String,required: false },
    // city: { type: String,required: false },
    // zipCode: { type: Number,required: false },
    // state: { type: String, required: false },
    email: { type: String, required: false },
    visitDate: { type: String, required: true },
    hourOfVisit: { type: String, required: true },
    addedDate: { type: String, required: true },
    // provider: { type: mongoose.Schema.Types.ObjectId, ref: "provider" },
    provider: { type: String, required: true },
});


const Visit = mongoose.model("visit", visitSchema);

const validate = (data) => {
	const schema = Joi.object({
        medicalRecordNumber:Joi.number().label("Medical Record Number"),
        visitNumber: Joi.number().label("Visit Number"),
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        middleName: Joi.string().label("Middle Name"),
        // gender:Joi.string().label("Gender"),
        // race: Joi.string().label("Race"),
        // dateOfBirth: Joi.date().label("DOB"),
        // age:  Joi.number().label("Age"),
        // language:Joi.string().label("Language"),
        // address: Joi.string().label("Address"),
        // city: Joi.string().label("City"),
        // zipCode: Joi.number().label("Zip Code"),
        // state: Joi.string().label("State"),
        email: Joi.string().email().required().label("Email"),
        visitDate: Joi.string().required().label("Visit Date"),
        hourOfVisit: Joi.string().required().label("Hour of Visit"),
        addedDate: Joi.string().required().label("Added Date"),
        provider: Joi.string().required().label("Provider"),
	});
	return schema.validate(data);
};

module.exports = { Visit, validate };


