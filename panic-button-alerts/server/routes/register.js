const { User, validate } = require('../models/users')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()


 router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).send('User already exisits. Please sign in')
        } else {
                const salt = await bcrypt.genSalt(10)
                const password = await bcrypt.hash(req.body.password, salt)
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: password
                })
                await user.save()
                return res.status(201).json(user)
            } 
        }
     catch (err) {
        res.send("An error occured");
        return res.status(400).json({ message: err.message })
    }
})

module.exports = router;