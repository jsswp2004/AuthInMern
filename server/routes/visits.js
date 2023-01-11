// routes/api/visits.js

const express = require('express')
const router = express.Router()
const { Visit, validate } = require('../models/visit')

// @route GET api/visits/test
// @description tests visits route
// @access Public
router.get('/test', (req, res) => res.send('visit route testing!'))

// @route GET api/visits
// @description Get all visits
// @access Public
router.get('/', (req, res) => {
  Visit.find()
    .then((visits) => res.json(visits))
    .catch((err) =>
      res.status(404).json({ novisitsfound: 'No Visits found' }),
    )
})

// @route GET api/visits/:id
// @description Get single visit by id
// @access Public
router.get('/:id', (req, res) => {
  Visit.findById(req.params.id)
    .then((visit) => res.json(visit))
    .catch((err) => res.status(404).json({ novisitfound: 'No Visit found' }))
})

// @route GET api/visits
// @description add/save visit
// @access Public
router.post('/', (req, res) => {
  Visit.create(req.body)
    .then((visit) => res.json({ msg: 'Visit added successfully' }))
    .catch((err) =>
      res.status(400).json({ error: 'Unable to add this visit' }),
    )
})

// @route GET api/visits/:id
// @description Update visit
// @access Public
router.put('/:id', (req, res) => {
  Visit.findByIdAndUpdate(req.params.id, req.body)
    .then((visit) => res.json({ msg: 'Updated successfully' }))
    .catch((err) =>
      res.status(400).json({ error: 'Unable to update the Database' }),
    )
})

// @route GET api/visits/:id
// @description Delete visit by id
// @access Public
router.delete('/:id', (req, res) => {
  Visit.findByIdAndRemove(req.params.id, req.body)
    .then((visit) => res.json({ mgs: 'Visit entry deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such a visit' }))
})

module.exports = router
