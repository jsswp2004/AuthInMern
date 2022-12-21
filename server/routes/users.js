// const router = require("express").Router();
import express from "express";
const router = express.Router();
// const { User, validate } = require("../models/user");
import { User, validate } from "../models/user.js";
// const bcrypt = require("bcrypt");
import bcrypt from "bcrypt";

// This section validates the user login details.
router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// This section will help you get a list of all the users.
router.get("/users", async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).send({ data: users, message: "Users fetched successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// module.exports = router;
export default router;
