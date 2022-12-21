// const mongoose = require('mongoose');
import mongoose from 'mongoose';
// const Joi = require('joi');
import Joi from 'joi';

const recordSchema = new mongoose.Schema({
    medicalRecordNumber: { type: Number, required: true },
    visitNumber: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: false },
    gender: { type: String, required: true },
    race: { type: String, required: false },
    dateOfBirth: { type: Date, required: true },
    age: { type: Number, required: true },
    language: { type: String, required: false },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: Number, required: true },
    maritalStatus: { type: String, required: false },
});

const Record = mongoose.model('record', recordSchema)

const validate = (data) => {
    const schema = Joi.object({
        medicalRecordNumber: Joi.number().required().label('MRN'),
        visitNumber: Joi.number().required().label('Visit ID'),
        firstName: Joi.string().required().label('Firstname'),
        lastName: Joi.string().required().label('Lastname'),
        middleName: Joi.string().label('Middlename'),
        gender: Joi.string().required().label('Gender'),
        race: Joi.string().label('Race'),
        dateOfBirth: Joi.date().required().label('DOB'),
        age: Joi.number().required().label('Age'),
        language: Joi.string().label('Language'),
        address: Joi.string().required().label('Address'),
        city: Joi.string().required().label('City'),
        state: Joi.string().required().label('State'),
        zipCode: Joi.number().required().label('Zip'),
        maritalStatus: Joi.string().label('Marital Status'),
    });
    return schema.validate(data);
};

// module.exports = { Record, validate };
export { Record, validate };
