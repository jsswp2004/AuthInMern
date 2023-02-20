const mongoose = require("mongoose");

const Joi = require("joi");


const scheduleSchema = new mongoose.Schema({
    providerID:{ type: String,required: false },
    firstName: { type:String,required: true },
    lastName: { type:String,required: true },
    startDate: { type: String, required: false },
    endDateDate: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    provider: { type: String, required: true },
    event: { type: String,required: false },
});


const Schedule = mongoose.model("schedule", scheduleSchema);

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
        event: Joi.string().required().label("Event"),
	});
	return schema.validate(data);
};

module.exports = { Schedule, validate };


