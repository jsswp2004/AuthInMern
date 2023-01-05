const userlist = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

// This section will help you get a list of all the records.
userlist.get("/", async (req, res) => {
    try {
        const users = await User.find();
		res.status(200).send({ data: users, message: "User list" });
		return(users)
    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

userlist.delete("/:userId", async (req, res) => {
	const userId = req.params._id;
    try {
        const users = await User.deleteOne(userId);
		res.status(200).send({ data: users, message: "User deleted" });
		return(users)
    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }

});

module.exports = userlist;