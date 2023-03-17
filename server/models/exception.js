const mongoose = require('mongoose')

const Joi = require('joi')

const exceptionSchema = new mongoose.Schema({
  providerID: { type: String, required: true },
  provider: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  amStartTime: { type: String, required: true },
  amEndTime: { type: String, required: true },
  pmStartTime: { type: String, required: true },
  pmEndTime: { type: String, required: true },
  exceptionMon: { type: String, required: true },
  exceptionTues: { type: String, required: true },
  exceptionWed: { type: String, required: true },
  exceptionThurs: { type: String, required: true },
  exceptionFri: { type: String, required: true },
  addedDate: { type: String, required: true },
  lastUpdated: { type: String, required: false },
})

const Exception = mongoose.model('exception', exceptionSchema)

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
    exceptionMon: Joi.string().required().label('Exception'),
    exceptionTues: Joi.string().required().label('Exception'),
    exceptionWed: Joi.string().required().label('Exception'),
    exceptionThurs: Joi.string().required().label('Exception'),
    exceptionFri: Joi.string().required().label('Exception'),
    addedDate: Joi.string().required().label('Date Created'),
    lastUpdated: Joi.string().label('Last Updated'),

  })
  return schema.validate(data)
}

module.exports = { Exception, validate }
