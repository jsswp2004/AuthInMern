const mongoose = require('mongoose')

const Joi = require('joi')

const scheduleSchema = new mongoose.Schema({
  providerID: { type: String, required: false },
  provider: { type: String, required: false },
  startDate: { type: String, required: false },
  endDate: { type: String, required: false },
  amStartTime: { type: String, required: false },
  amEndTime: { type: String, required: false },
  pmStartTime: { type: String, required: false },
  pmEndTime: { type: String, required: false },
  scheduledMon: { type: String, required: false },
  scheduledTues: { type: String, required: false },
  scheduledWed: { type: String, required: false },
  scheduledThurs: { type: String, required: false },
  scheduledFri: { type: String, required: false },
  addedDate: { type: String, required: true },
  lastUpdated: { type: String, required: false },
},
  { collection: 'schedules' });

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
    scheduledTues: Joi.string().required().label('Scheduled'),
    scheduledWed: Joi.string().required().label('Scheduled'),
    scheduledThurs: Joi.string().required().label('Scheduled'),
    scheduledFri: Joi.string().required().label('Scheduled'),
    addedDate: Joi.string().required().label('Date Created'),
    lastUpdated: Joi.string().label('Last Updated'),
  })
  return schema.validate(data)
}

module.exports = { Schedule, validate }
