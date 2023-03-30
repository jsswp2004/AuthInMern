const express = require("express");
const router = express.Router();
// const cors = require("cors");
const nodemailer = require("nodemailer");
const { Email, validate } = require('../models/email')

// @route GET api/events/test
// @description tests events route
// @access Public
router.get('/test', (req, res) => res.send('email route testing!'))

// @route GET api/events
// @description Get all events
// @access Public
router.get('/', (req, res) => {
    Email.find()
        .then((events) => res.json(events))
        // .limit('10')
        .catch((err) =>
            res.status(404).json({ noeventsfound: 'No Emails found' }),
        )
    // .shellBatchSize = 200
})

// @route GET api/events/:id
// @description Get single email by id
// @access Public
router.get('/:id', (req, res) => {
    Email.findById(req.params.id)
        .then((email) => res.json(email))
        .catch((err) => res.status(404).json({ norecordfound: 'No Email found' }))
})

// @route GET api/events
// @description add/save email
// @access Public
// router.post('/', (req, res) => {
//     Email.create(req.body)
//         .then((email) => res.json({ msg: 'Email added successfully' }))
//         .catch((err) =>
//             res.status(400).json({ error: 'Unable to add this email' }),
//         )
// })

// @route GET api/events/:id
// @description Update email
// @access Public
router.put('/:id', (req, res) => {
    Email.findByIdAndUpdate(req.params.id, req.body)
        .then((email) => res.json({ msg: 'Updated successfully' }))
        .catch((err) =>
            res.status(400).json({ error: 'Unable to update the Database' }),
        )
})

// @route GET api/events/:id
// @description Delete email by id
// @access Public
router.delete('/:id', (req, res) => {
    Email.findByIdAndRemove(req.params.id, req.body)
        .then((email) => res.json({ mgs: 'Email entry deleted successfully' }))
        .catch((err) => res.status(404).json({ error: 'No such a email' }))
})


// @route GET api/events/test
// @description tests events route
// @access Public
router.get('/test', (req, res) => res.send('email route testing!'))

// @route GET api/events
// @description Get all events
// @access Public
router.get('/', (req, res) => {
    Email.find()
        .then((events) => res.json(events))
        // .limit('10')
        .catch((err) =>
            res.status(404).json({ noeventsfound: 'No Emails found' }),
        )
    // .shellBatchSize = 200
})

// @route GET api/events/:id
// @description Get single email by id
// @access Public
router.get('/:id', (req, res) => {
    Email.findById(req.params.id)
        .then((email) => res.json(email))
        .catch((err) => res.status(404).json({ norecordfound: 'No Email found' }))
})

// @route GET api/events
// @description add/save email
// @access Public
// router.post('/', (req, res) => {
//     Email.create(req.body)
//         .then((email) => res.json({ msg: 'Email added successfully' }))
//         .catch((err) =>
//             res.status(400).json({ error: 'Unable to add this email' }),
//         )
// })

// @route GET api/events/:id
// @description Update email
// @access Public
router.put('/:id', (req, res) => {
    Email.findByIdAndUpdate(req.params.id, req.body)
        .then((email) => res.json({ msg: 'Updated successfully' }))
        .catch((err) =>
            res.status(400).json({ error: 'Unable to update the Database' }),
        )
})

// @route GET api/events/:id
// @description Delete email by id
// @access Public
router.delete('/:id', (req, res) => {
    Email.findByIdAndRemove(req.params.id, req.body)
        .then((email) => res.json({ mgs: 'Email entry deleted successfully' }))
        .catch((err) => res.status(404).json({ error: 'No such a email' }))
})

router.post("/", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const mail = {
        from: name,
        to: process.env.EMAIL,
        subject: "Contact Form Submission",
        html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json({ status: "ERROR" });
        } else {
            res.json({ status: "Message Sent" });
        }
    });
});

module.exports = router;