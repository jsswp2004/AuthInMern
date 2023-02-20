const mongoose = require('mongoose')

const Joi = require('joi')

const scheduleSchema = new mongoose.Schema({
  providerID: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  scheduled: { type: Boolean, required: true },
})

const Schedule = mongoose.model('schedule', scheduleSchema)

const validate = (data) => {
  const schema = Joi.object({
    providerID: Joi.number().required().label('Provider ID'),
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
    startDate: Joi.string().required().label('Start Date'),
    endDate: Joi.string().required().label('End Date'),
    startTime: Joi.string().required().label('Start Time'),
    endTime: Joi.string().required().label('End Time'),
    scheduled: Joi.boolean().required().label('Scheduled'),
  })
  return schema.validate(data)
}

module.exports = { Schedule, validate }
