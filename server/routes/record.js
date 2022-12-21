// const recordRoutes = require("express").Router();
import express from "express";
const recordRoutes = express.Router();
// const dbo = require('../db/conn')
// const { Record, validate } = require("../models/patientRecord");
import { Record, validate } from "../models/patientRecord.js";
// This help convert the id from string to ObjectId for the _id.
// const ObjectId = require('mongodb').ObjectId
import { ObjectId } from 'mongodb'

// This section will help you get a list of all the records.
recordRoutes.get("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

        const records = await Record
            .collection('records')
            .find({})
            .toArray(function (err, result) {
                if (err) throw err
                res.json(result)
            })
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// This section will help you update a record by id
recordRoutes.get("/record/:id", async (req, res) => {
    let myquery = { _id: ObjectId(req.params.id) }
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });
        
        const record = await Record
            .collection('records')
            .findOne(myquery, function (err, result) {
                if (err) throw err
                res.json(result)
            })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});













// module.exports = recordRoutes;
export default recordRoutes;
