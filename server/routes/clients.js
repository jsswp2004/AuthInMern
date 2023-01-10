// routes/api/clients.js

const express = require('express');
const router = express.Router();

// Load Client model
const Client = require('../models/Clients');

// @route GET api/clients/test
// @description tests clients route
// @access Public
router.get('/test', (req, res) => res.send('client route testing!'));

// @route GET api/clients
// @description Get all clients
// @access Public
router.get('/', (req, res) => {
  Client.find()
    .then(clients => res.json(clients))
    .catch(err => res.status(404).json({ noclientsfound: 'No Clients found' }));
});

// @route GET api/clients/:id
// @description Get single client by id
// @access Public
router.get('/:id', (req, res) => {
  Client.findById(req.params.id)
    .then(client => res.json(client))
    .catch(err => res.status(404).json({ noclientfound: 'No Client found' }));
});

// @route GET api/clients
// @description add/save client
// @access Public
router.post('/', async (req, res) => {
  // Client.create(req.body)
  //   .then(client => res.json({ msg: 'Client added successfully' }))
  //   .catch(err => res.status(400).json({ error: 'Unable to add this client' }));
  try {
    const { error } = validate(req.body)
    if (error)
      return res.status(400).send({ message: error.details[0].message })

    const client = await Client.findOne({ medicalRecordNumber: req.body.medicalRecordNumber })
    if (client)
      return res
        .status(409)
        .send({ message: 'Client with given MRN already Exist!' })

    // const salt = await bcrypt.genSalt(Number(process.env.SALT))
    // const hashPassword = await bcrypt.hash(req.body.password, salt)

    await new Client({ ...req.body}).save()
    res.status(201).send({ message: 'Client created successfully' })
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' })
  }
});

// @route GET api/clients/:id
// @description Update client
// @access Public
router.put('/:id', (req, res) => {
    Client.findByIdAndUpdate(req.params.id, req.body)
      .then(client => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  });
  
  // @route GET api/clients/:id
  // @description Delete client by id
  // @access Public
  router.delete('/:id', (req, res) => {
    Client.findByIdAndRemove(req.params.id, req.body)
      .then(client => res.json({ mgs: 'Client entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such a client' }));
  });
  
  module.exports = router;