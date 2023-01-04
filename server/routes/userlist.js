const userlist = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

// This section will help you get a list of all the records.
userlist.get("/", async (req, res) => {
	// try {
	// 	const { error } = validate(req.body);
	// 	if (error)
	// 		return res.status(400).send({ message: error.details[0].message });

	// 	const user = await User.findOne({ email: req.body.email });
	// 	if (user)
	// 		return res
	// 			.status(409)
	// 			.send({ message: "User with given email already Exist!" });

	// 	const salt = await bcrypt.genSalt(Number(process.env.SALT));
	// 	const hashPassword = await bcrypt.hash(req.body.password, salt);

	// 	await new User({ ...req.body, password: hashPassword }).save();
	// 	res.status(201).send({ message: "User created successfully" });
	// } catch (error) {
	// 	res.status(500).send({ message: "Internal Server Error" });
	// }
    try {
        const users = await User.find();
		res.status(200).send({ data: user, message: "User list" });
		return(users)
        // console.log(user)
    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
    
});

module.exports = userlist;