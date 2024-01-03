const { User, validate } = require("../models/users.model");
const express = require("express");
const router = express.Router();
// const { users } = require('../models/users');
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

router.post('/get-by-email-and-password/', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and Password parameters are required.' });
    }
    try {
        const user = await user.findOne({ email });
        const isPasswordValid = 0
        if (!isPasswordValid) {
            return { error: "invalid password" };
        }
        if (user) {
            
            res.status(200).json({ success: true, user: user });
        } else {
            res.status(401).json({ success: false, message: 'Auth fail' });
        }
    } catch (error) {
        console.error('Error fetching patient by email and password:', error);
        throw error;
    }


   
// } catch (error) {
//     res.status(500).json({ success: false, message: 'Internal server error' });
// }
});


module.exports = router;
