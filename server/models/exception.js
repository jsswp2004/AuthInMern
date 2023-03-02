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
  exceptiondMon: { type: String, required: true },
  exceptiondTues: { type: String, required: true },
  exceptiondWed: { type: String, required: true },
  exceptiondThurs: { type: String, required: true },
  exceptiondFri: { type: String, required: true },
  addedDate: { type: String, required: true },
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
    exceptiondMon: Joi.string().required().label('Exception'),
    exceptiondTues:Joi.string().required().label('Exception'),
    exceptiondWed:Joi.string().required().label('Exception'),
    exceptiondThurs:Joi.string().required().label('Exception'),
    exceptiondFri:Joi.string().required().label('Exception'),
    addedDate: Joi.string().required().label('Date Created'),
  })
  return schema.validate(data)
}

module.exports = {Exception, validate }
