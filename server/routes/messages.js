
//not used
const express = require('express')
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);

// const router = express.Router()

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

// app.post('/api/messages', (req, res) => {
app.post('/', (req, res) => {
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
