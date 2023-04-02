const express = require("express");
// const bodyParser = require('body-parser');
// const pino = require('express-pino-logger')();
const router = express.Router();
const nodemailer = require("nodemailer");
const { SMSMessage, validate } = require('../models/smsMessage')
require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);

// @route GET api/events/test
// @description tests events route
// @access Public
router.get('/test', (req, res) => res.send('sMSMessage route testing!'))

// @route GET api/events
// @description Get all events
// @access Public
router.get('/', (req, res) => {
    SMSMessage.find()
        .then((events) => res.json(events))
        // .limit('10')
        .catch((err) =>
            res.status(404).json({ noeventsfound: 'No SMSMessages found' }),
        )
    // .shellBatchSize = 200
})

// @route GET api/events/:id
// @description Get single SMSMessage by id
// @access Public
router.get('/:id', (req, res) => {
    SMSMessage.findById(req.params.id)
        .then((sMSMessage) => res.json(sMSMessage))
        .catch((err) => res.status(404).json({ norecordfound: 'No SMSMessage found' }))
})


// @route GET api/events/:id
// @description Update sMSMessage
// @access Public
router.put('/:id', (req, res) => {
    SMSMessage.findByIdAndUpdate(req.params.id, req.body)
        .then((sMSMessage) => res.json({ msg: 'Updated successfully' }))
        .catch((err) =>
            res.status(400).json({ error: 'Unable to update the Database' }),
        )
})

// @route GET api/events/:id
// @description Delete sMSMessage by id
// @access Public
router.delete('/:id', (req, res) => {
    SMSMessage.findByIdAndRemove(req.params.id, req.body)
        .then((sMSMessage) => res.json({ mgs: 'SMSMessage entry deleted successfully' }))
        .catch((err) => res.status(404).json({ error: 'No such a sMSMessage' }))
})


// @route GET api/events/test
// @description tests events route
// @access Public
router.get('/test', (req, res) => res.send('sMSMessage route testing!'))

// @route GET api/events
// @description Get all events
// @access Public
router.get('/', (req, res) => {
    SMSMessage.find()
        .then((events) => res.json(events))
        // .limit('10')
        .catch((err) =>
            res.status(404).json({ noeventsfound: 'No SMSMessages found' }),
        )
    // .shellBatchSize = 200
})

// @route GET api/events/:id
// @description Get single sMSMessage by id
// @access Public
router.get('/:id', (req, res) => {
    SMSMessage.findById(req.params.id)
        .then((sMSMessage) => res.json(sMSMessage))
        .catch((err) => res.status(404).json({ norecordfound: 'No SMSMessage found' }))
})

// @route GET api/events/:id
// @description Update sMSMessage
// @access Public
router.put('/:id', (req, res) => {
    SMSMessage.findByIdAndUpdate(req.params.id, req.body)
        .then((sMSMessage) => res.json({ msg: 'Updated successfully' }))
        .catch((err) =>
            res.status(400).json({ error: 'Unable to update the Database' }),
        )
})

// @route GET api/events/:id
// @description Delete sMSMessage by id
// @access Public
router.delete('/:id', (req, res) => {
    SMSMessage.findByIdAndRemove(req.params.id, req.body)
        .then((sMSMessage) => res.json({ mgs: 'SMSMessage entry deleted successfully' }))
        .catch((err) => res.status(404).json({ error: 'No such a sMSMessage' }))
})

// app.post('/api/messages', (req, res) => {
router.post('/', (req, res) => {
    res.header('Content-Type', 'application/json');
    client.messages
        .create({
            from: phoneNumber, //process.env.TWILIO_PHONE_NUMBER,
            to: req.body.to,
            body: req.body.body
        })
        .then(() => {
            res.send(JSON.stringify({ success: true }));
        })
        .catch(err => {
            console.log(err);
            res.send(JSON.stringify({ success: false }));
        });
});

// @description add/save message
// @access Public
router.post('/', (req, res) => {
    client.messages
    create({
        from: phoneNumber, //process.env.TWILIO_PHONE_NUMBER,
        to: req.body.to,
        body: req.body.body
    })
        .then(() => res.json({ msg: 'Message saved successfully' }))
        .catch((err) =>
            console.log(err),
            res.status(400).json({ error: 'Unable to add this message' }),
        )

});


module.exports = router;