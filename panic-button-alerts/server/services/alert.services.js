const { Alert } = require("../models/alerts.model");
const { find, findByID, aggregate, findOne } = require("../dal/dal");
const mongoose = require("mongoose");
const { MedicalConditions } = require("../models/medicalConditions.model");
const { Patient } = require("../models/patient.model");
const sort = {
  date: 1,
};

const getAlerts = async () => {
  const filters = { status: "not treated" };
  const alerts = await find((model = Alert), (filters), (pagination = {}), sort);
  return alerts;
};
const getAlertDetails = async (alertId) => {
  console.log(alertId)
  
  const alert = await findByID(Alert,alertId);

  if (!alert) {
    console.log('Alert not found');
    return [];
  }
  const patient =await findOne(Patient,{
    _id: alert.patient._id})
    console.log(patient)
  // Find the medical conditions for the patient associated with the alert
  const patientMedicalConditions = await findOne(MedicalConditions,{
    patient: alert.patient._id
  });

  console.log( alert.patient._id)
  if (!patientMedicalConditions) {
    console.log('Medical conditions not found for the patient');
    return [];
  }
  return patientMedicalConditions.medicalConditions;
   
  };
  
  // Example usage
 

const getnewAlerts = async (lastIdAlert) => {
  const filters = {date:1,_id:0}
  const lastItemDate = await findByID(Alert, lastIdAlert,filters);
  console.log(lastItemDate);
  console.error(lastItemDate.date);
  // Find documents that came after the last item based on the date
  const result = await find(
    Alert,
    { date: { $gt: lastItemDate.date} },
    (pagination = {}),
    sort
  ); // Sort in ascending order based on the date
  return result;
};
module.exports = { getAlerts, getnewAlerts, getAlertDetails };
