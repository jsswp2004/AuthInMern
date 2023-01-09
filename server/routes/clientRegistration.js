// routes/api/clients.js

const express = require('express');
const router = express.Router();

// Load Client model
const Client = require('../models/clients');

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
router.post('/', (req, res) => {
  Client.create(req.body)
    .then(client => res.json({ msg: 'Client added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this client' }));
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