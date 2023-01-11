const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const clientRoutes = require("./routes/clients");
const recordRoutes = require("./routes/records");
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

const port = process.env.PORT || 8081;
app.listen(port, console.log(`Listening on port ${port}...`));
