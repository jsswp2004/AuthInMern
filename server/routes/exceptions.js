// routes/api/exceptions.js

const express = require('express')
const router = express.Router()
const { Exception, validate } = require('../models/exception')

// @route GET api/exceptions/test
// @description tests exceptions route
// @access Public
router.get('/test', (req, res) => res.send('exception route testing!'))

// @route GET api/exceptions
// @description Get all exceptions
// @access Public
router.get('/', (req, res) => {
  Exception.find()
    .then((exceptions) => res.json(exceptions))
    .catch((err) =>
      res.status(404).json({ noexceptionsfound: 'No Exceptions found' }),
    )
})

// @route GET api/exceptions/:id
// @description Get single exception by id
// @access Public
router.get('/:id', (req, res) => {
  Exception.findById(req.params.id)
    .then((exception) => res.json(exception))
    .catch((err) => res.status(404).json({ norecordfound: 'No Exception found' }))
})

// @route GET api/exceptions
// @description add/save exception
// @access Public
router.post('/', (req, res) => {
  Exception.create(req.body)
    .then((exception) => res.json({ msg: 'Exception added successfully' }))
    .catch((err) =>
      res.status(400).json({ error: 'Unable to add this exception' }),
    )
})

// @route GET api/exceptions/:id
// @description Update exception
// @access Public
router.put('/:id', (req, res) => {
  Exception.findByIdAndUpdate(req.params.id, req.body)
    .then((exception) => res.json({ msg: 'Updated successfully' }))
    .catch((err) =>
      res.status(400).json({ error: 'Unable to update the Database' }),
    )
})

// @route GET api/exceptions/:id
// @description Delete exception by id
// @access Public
router.delete('/:id', (req, res) => {
  Exception.findByIdAndRemove(req.params.id, req.body)
    .then((exception) => res.json({ mgs: 'Exception entry deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such a exception' }))
})

module.exports = router
