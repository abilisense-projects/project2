const mongoose = require('mongoose');

const medicalConditionsSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    medicalConditions: [{
        type: String,
    }],
});

const MedicalConditions =  mongoose.model('MedicalCondition', medicalConditionsSchema);

module.exports = { MedicalConditions };