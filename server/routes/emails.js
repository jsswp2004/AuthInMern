const express = require("express");
const router = express.Router();
// const cors = require("cors");
const nodemailer = require("nodemailer");
const { Email, validate } = require('../models/email')

router.post("/", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    // const contactEmail = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: "jsswp199427@gmail.com",
    //         pass: "krat13Miko!",
    //     },
    // });

    // contactEmail.verify((error) => {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log("Ready to Send");
    //     }
    // });
    const mail = {
        from: name,
        to: "***************@gmail.com",
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