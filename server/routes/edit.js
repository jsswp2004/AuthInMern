const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.put("/edit/:userId", async (req, res) => {
    const userId = req.params._id;
    try {
        const user = await User.updateOne(userId);
        res.status(200).send({ data: user, message: "User updated" });
        return (user)
    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
