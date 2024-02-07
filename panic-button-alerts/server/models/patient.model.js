const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema =new  Schema({
  country: String,
  city: String,
  street: String,
  entrance: { type: String, require: false },
  buildingNumber: Number,
  floor: Number,
  apartmentNumber: Number,
  comments: { type: String, require: false },
});

const patientsSchema = new Schema({
  fname: String,
  lname: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  address: addressSchema,
  dateOfBirth: Date,
});

const Patient = mongoose.model("Patient", patientsSchema);

module.exports = { Patient };
