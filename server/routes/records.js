// routes/api/records.js

const express = require('express')
const router = express.Router()
const { Record, validate } = require('../models/record')

// @route GET api/records/test
// @description tests records route
// @access Public
router.get('/test', (req, res) => res.send('record route testing!'))

// @route GET api/records
// @description Get all records
// @access Public
router.get('/', (req, res) => {
  Record.find()
    .then((records) => res.json(records))
    .catch((err) =>
      res.status(404).json({ norecordsfound: 'No Records found' }),
    )
})

// @route GET api/records/:id
// @description Get single record by id
// @access Public
router.get('/:id', (req, res) => {
  Record.findById(req.params.id)
    .then((record) => res.json(record))
    .catch((err) => res.status(404).json({ norecordfound: 'No Record found' }))
})

// @route GET api/records
// @description add/save record
// @access Public
router.post('/', (req, res) => {
  Record.create(req.body)
    .then((record) => res.json({ msg: 'Record added successfully' }))
    .catch((err) =>
      res.status(400).json({ error: 'Unable to add this record' }),
    )
})

// @route GET api/records/:id
// @description Update record
// @access Public
router.put('/:id', (req, res) => {
  Record.findByIdAndUpdate(req.params.id, req.body)
    .then((record) => res.json({ msg: 'Updated successfully' }))
    .catch((err) =>
      res.status(400).json({ error: 'Unable to update the Database' }),
    )
})

// @route GET api/records/:id
// @description Delete record by id
// @access Public
router.delete('/:id', (req, res) => {
  Record.findByIdAndRemove(req.params.id, req.body)
    .then((record) => res.json({ mgs: 'Record entry deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such a record' }))
})

module.exports = router
