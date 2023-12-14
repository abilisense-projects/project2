const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const alertSchema = new Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    date:{ Date},
    distressDescription: {String},
    status:{ String},
    location:{String},
    level:{ String}

});

const Alert = mongoose.model("alert", alertSchema);


module.exports = { Alert };