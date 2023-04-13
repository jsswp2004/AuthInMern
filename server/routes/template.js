const express = require('express')
const router = express.Router()
const { Role, validate } = require('../models/role')

router.get('/api/template', (req, res) => {
    Role.find()

        .then((roles) => res.json(roles))
        .catch((err) =>
            res.status(404).json({ norolesfound: 'No Roles found' }),
        )
})