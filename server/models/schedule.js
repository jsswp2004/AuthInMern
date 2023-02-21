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
  scheduledMon: { type: String, required: true },
  scheduledTues: { type: String, required: true },
  scheduledWed: { type: String, required: true },
  scheduledThurs: { type: String, required: true },
  scheduledFri: { type: String, required: true },
  addedDate: { type: String, required: true },
})

const Schedule = mongoose.model('schedule', scheduleSchema)

const validate = (data) => {
  const schema = Joi.object({
    providerID: Joi.number().required().label('Provider ID'),
    provider: Joi.string().required().label('Provider'),
    startDate: Joi.string().required().label('Start Date'),
    endDate: Joi.string().required().label('End Date'),
    amStartTime: Joi.string().required().label('AM Start Time'),
    amEndTime: Joi.string().required().label('AM End Time'),
    pmStartTime: Joi.string().required().label('PM Start Time'),
    pmEndTime: Joi.string().required().label('PM End Time'),
    scheduledMon: Joi.string().required().label('Scheduled'),
    scheduledTues:Joi.string().required().label('Scheduled'),
      scheduledWed:Joi.string().required().label('Scheduled'),
    scheduledThurs:Joi.string().required().label('Scheduled'),
    scheduledFri:Joi.string().required().label('Scheduled'),
    addedDate: Joi.string().required().label('Date Created'),
  })
  return schema.validate(data)
}

module.exports = { Schedule, validate }
