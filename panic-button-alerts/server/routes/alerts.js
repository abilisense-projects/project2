const  {ALert}  = require("../models/alerts");
const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
    try {
        const alerts = await ALert.find();
        res.send(alerts);
    } catch (error) {
        res.status(500).send("An error occurred");
        console.error(error);
    }
});

router.get("/:lastAlert", async (req, res) => {
    try {
        
        res.send("");
    } catch (error) {
        res.status(500).send("An error occurred");
        console.error(error);
    }
});
module.exports = router;