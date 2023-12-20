const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const alertsSchema = new Schema({
   alertId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "alert"
    },
    patient: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
          ref: 'Patient' 
        },
    date: {
        type: Date,
        default: Date.now,
    },
    distressDescription:{
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
},{timestamps:true})



alertsSchema.index({createdAt:1})
const Alert = mongoose.model("alert", alertsSchema);


module.exports = { Alert };

