const mongoose = require('mongoose');
const addressSchema = mongoose.Schema({
    country: String,
    city: String,
    street: String,
    entrance: { type: String, require: false },
    buildingNumber: Number,
    floor: Number,
    apartmentNumber: Number,
    comments: { type: String, require: false }
});
const patientsSchema = mongoose.Schema({
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    address: addressSchema,
    dateOfBirth: Date,
    medicalConditions: [String]
})
const Patient = mongoose.model("patient", patientsSchema);

// const validate = (patient) => {
//     const schema = Joi.object({
//         name: Joi.string().required(),
//         email: Joi.string().email().required(),
//         password: Joi.string().required(),
//     });
//     return schema.validate(alert);
// };

module.exports = { Patient};