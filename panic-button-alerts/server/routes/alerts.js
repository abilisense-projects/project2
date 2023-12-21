const  {Alert}  = require("../models/alerts");
const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
    try {
        const alerts = await Alert.find().sort({date:1});
        res.send(alerts);
    } catch (error) {
        res.status(500).send("An error occurred");
        console.error(error);
    }
});

router.get("/:lastIdAlert", async (req, res) => {
    try {
        console.error(req.params.lastIdAlert)
        const Id=req.params.lastIdAlert
        console.error(Id)
        const targetItem= await Alert.findById( Id)  
        console.error(targetItem.date)     
            // Find documents that came after the target item based on the createdAt timestamp
      const result= await Alert.find({ date: { $gt: targetItem.date } })
              .sort({ date: 1 }) // Sort in ascending order based on the date
                res.send(result);   
                console.log(result);
             
          
          
    } catch (error) {
        res.status(500).send("An error occurred");
        console.error(error);
    }
});
module.exports = router;