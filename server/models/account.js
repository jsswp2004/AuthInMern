const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const accountSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    companyName: { type: String, required: true },
    role: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: false },
    termsAndConditions: { type: Boolean, required: true },
    captcha: { type: Boolean, required: true },
    addedDate: { type: String, required: true },
    lastUpdated: { type: String, required: false },
    facilityID: { type: String, required: false },
});

accountSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d",
    });
    return token;
};

const Account = mongoose.model("account", accountSchema);

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        companyName: Joi.string().required().label("Company Name"),
        role: Joi.string().required().label("Role"),
        phoneNumber: Joi.string().required().label("Phone Number"),
        state: Joi.string().required().label("State"),
        country: Joi.string().label("Country"),
        termsAndConditions: Joi.boolean().required().label("Terms and Conditions"),
        captcha: Joi.boolean().required().label("Captcha"),
        addedDate: Joi.string().required().label("Added Date"),
        lastUpdated: Joi.string().label('Last Updated'),
        facilityID: Joi.string().label('Facility ID'),
    });
    return schema.validate(data);
};

module.exports = { Account, validate };
