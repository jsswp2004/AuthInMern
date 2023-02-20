const mongoose = require('mongoose')

const Joi = require('joi')

const scheduleSchema = new mongoose.Schema({
  providerID: { type: String, required: true },
  provider: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  amStartTime: { type: String, required: true },
  amEndTime: { type: String, required: true },
  pmStartTime: { type: String, required: true },
  pmEndTime: { type: String, required: true },
  scheduled: { type: Boolean, required: true },
  addedDate: { type: String, required: true },
})

const Schedule = mongoose.model('schedule', scheduleSchema)

const validate = (data) => {
  const schema = Joi.object({
    providerID: Joi.number().required().label('Provider ID'),
    provider: Joi.string().required().label('First Name'),
    startDate: Joi.string().required().label('Start Date'),
    endDate: Joi.string().required().label('End Date'),
    amStartTime: Joi.string().required().label('AM Start Time'),
    amEndTime: Joi.string().required().label('AM End Time'),
    pmStartTime: Joi.string().required().label('PM Start Time'),
    pmEndTime: Joi.string().required().label('PM End Time'),
    scheduled: Joi.boolean().required().label('Scheduled'),
    addedDate: Joi.string().required().label('Date Created'),
  })
  return schema.validate(data)
}

module.exports = { Schedule, validate }
