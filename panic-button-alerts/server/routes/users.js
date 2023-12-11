const { User, validate } = require("../models/users");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await new User(req.body).save();

        res.send(user);
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});
router.get("/", async (req, res) => {
    try {
        const users = await User.find();  

        res.send(users);
    } catch (error) {
        res.status(500).send("An error occurred");
        console.error(error);
    }
});


module.exports = router;