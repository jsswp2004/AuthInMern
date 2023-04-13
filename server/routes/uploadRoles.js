// routes/api/roles.js

const express = require('express')
const router = express.Router()
const { Role, validate } = require('../models/role')

// @route GET api/roles/test
// @description tests roles route
// @access Public
router.get('/test', (req, res) => res.send('role route testing!'))

// @route GET api/roles
// @description Get all roles
// @access Public
router.get('/', (req, res) => {
  Role.find()

  .then((roles) => res.json(roles))
  .catch((err) =>
    res.status(404).json({ norolesfound: 'No Roles found' }),
  )
})

// @route GET api/roles/:id
// @description Get single role by id
// @access Public
router.get('/:id', (req, res) => {
  Role.findById(req.params.id)
    .then((role) => res.json(role))
    .catch((err) => res.status(404).json({ norecordfound: 'No Role found' }))
})

// @route GET api/roles
// @description add/save role
// @access Public
router.post('/', (req, res) => {
  Role.create(req.body)
    .then((role) => res.json({ msg: 'Role added successfully' }))
    .catch((err) =>
      res.status(400).json({ error: 'Unable to add this role' }),
    )
})

// @route GET api/roles/:id
// @description Update role
// @access Public
router.put('/:id', (req, res) => {
  Role.findByIdAndUpdate(req.params.id, req.body)
    .then((role) => res.json({ msg: 'Updated successfully' }))
    .catch((err) =>
      res.status(400).json({ error: 'Unable to update the Database' }),
    )
})

// @route GET api/roles/:id
// @description Delete role by id
// @access Public
router.delete('/:id', (req, res) => {
  Role.findByIdAndRemove(req.params.id, req.body)
    .then((role) => res.json({ mgs: 'Role entry deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such a role' }))
})

module.exports = router
