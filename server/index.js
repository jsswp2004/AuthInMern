// require("dotenv").config();
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const connection = require("./db");
// const userRoutes = require("./routes/users");
// const authRoutes = require("./routes/auth");

// // database connection
// connection();

// // middlewares
// app.use(express.json());
// app.use(cors());

// // routes
// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);

// const port = process.env.PORT || 8080;
// app.listen(port, console.log(`Listening on port ${port}...`));

import mongoose from 'mongoose'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
const app = express()
import bodyParser from 'body-parser'
import cors from 'cors'

import * as dotenv from 'dotenv'
dotenv.config()

const paths = path.join(fileURLToPath(import.meta.url), 'app/views')

// DB Connection
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log('DB CONNECTED')
  })
  .catch(() => {
    console.log('UNABLE to connect to DB')
  })

var corsOptions = {
  origin: 'http://localhost:3000',
}

// Use parsing middleware
app.use(cors(corsOptions))
// app.use(express.json());
app.use(express.static(paths))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import recordRoutes from './routes/record.js'

app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/records",recordRoutes)

const port = process.env.PORT || 8080
app.listen(port, console.log(`Listening on port ${port}...`))
