// routes/api/schedules.js

const express = require('express')
const router = express.Router()
const { Schedule, validate } = require('../models/schedule')

// @route GET api/schedules/test
// @description tests schedules route
// @access Public
router.get('/test', (req, res) => res.send('schedule route testing!'))

// @route GET api/schedules
// @description Get all schedules
// @access Public
router.get('/', (req, res) => {
  Schedule.find()
    .then((schedules) => res.json(schedules))
    .catch((err) =>
      res.status(404).json({ noschedulesfound: 'No Schedules found' }),
    )
})

// @route GET api/schedules/:id
// @description Get single schedule by id
// @access Public
router.get('/:id', (req, res) => {
  Schedule.findById(req.params.id)
    .then((schedule) => res.json(schedule))
    .catch((err) => res.status(404).json({ norecordfound: 'No Schedule found' }))
})

// @route GET api/schedules
// @description add/save schedule
// @access Public
router.post('/', (req, res) => {
  Schedule.create(req.body)
    .then((schedule) => res.json({ msg: 'Schedule added successfully' }))
    .catch((err) =>
      res.status(400).json({ error: 'Unable to add this schedule' }),
    )
})

// @route GET api/schedules/:id
// @description Update schedule
// @access Public
router.put('/:id', (req, res) => {
  Schedule.findByIdAndUpdate(req.params.id, req.body)
    .then((schedule) => res.json({ msg: 'Updated successfully' }))
    .catch((err) =>
      res.status(400).json({ error: 'Unable to update the Database' }),
    )
})

// @route GET api/schedules/:id
// @description Delete schedule by id
// @access Public
router.delete('/:id', (req, res) => {
  Schedule.findByIdAndRemove(req.params.id, req.body)
    .then((schedule) => res.json({ mgs: 'Schedule entry deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such a schedule' }))
})

module.exports = router
