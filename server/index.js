const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const clientRoutes = require("./routes/clients");
const recordRoutes = require("./routes/records");
const visitRoutes = require("./routes/visits");
const roleRoutes = require("./routes/roles");
const eventRoutes = require("./routes/events");
const scheduleRoutes = require("./routes/schedules")
const exceptionRoutes = require("./routes/exceptions")
const emailRoutes = require("./routes/emails");
const nodemailer = require("nodemailer");
require('dotenv').config()

// database connection
connection();

// middlewares 
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/exceptions", exceptionRoutes);
app.use("/api/emails", emailRoutes);

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, //"jsswp199427@gmail.com",
        // pass: "krat13Miko!",
        pass: 'fqejxdqxlonpagtp',
    },
});

contactEmail.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready to Send");
    }
});

const port = process.env.PORT || 8081;
app.listen(port, console.log(`Listening on port ${port}...`));
