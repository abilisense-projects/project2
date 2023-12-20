const  {ALert, Alert}  = require("../models/alerts");
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

router.get("/:lastAlertID", async (req, res) => {
    try {
        
        Alert.findById(lastAlertID, (err, targetItem) => {       
            // Find documents that came after the target item based on the createdAt timestamp
            Alert.find({ createdAt: { $gt: targetItem.createdAt } })
              .sort({ createdAt: 1 }) // Sort in ascending order based on the createdAt timestamp
              .exec((err, result) => {
                if (err) {
                  console.error('Error finding documents:', err);
                  // Handle the error appropriately, such as sending an error response
                  return;
                }    
                res.send(result);   
                console.log(result);
              });
          });
          
    } catch (error) {
        res.status(500).send("An error occurred");
        console.error(error);
    }
});
module.exports = router;