const moment = require("moment-timezone");

const { find, findByID, findOneAndUpdate } = require("../dal/dal");
const { addHistoryforHelper } = require("./history.service");

const { Alert } = require("../models/alerts.model");
const { Patient } = require("../models/patient.model");

const { MedicalConditions } = require("../models/medicalConditions.model");

var isUpdate = [];
const status = { $nin: ["treated", "cancel"] };
const sort = {
  date: 1,
};

const getAlerts = async () => {
  const filters = { status: status };
  const alerts = await find((model = Alert), filters, (pagination = {}), sort);
  return alerts;
};

const getAlertDetails = async (alertId) => {

  const alert = await Alert.findById(alertId)
 
  console.log(alert);
  const patient = await findByID(Patient,{_id:alert.patient._id})
  const patientMedicalConditions = await MedicalConditions.find( {
    patient: alert.patient._id,
  })
  // .populate("patient");
  
  if (!alert) {
    throw new Error("Alert not found");
  }
  if (!patientMedicalConditions) {
    throw new Error("Medical conditions not found for the patient");
  }
  return {
    patient:patient,
    medicalConditions: patientMedicalConditions[0].medicalConditions,
    alert: alert,
  };
};

const getnewAlerts = async (lastIdAlert) => {
  const filters = { date: 1, update: 1, _id: 0 };
  const lastItem = await findByID(Alert, lastIdAlert, filters);
  // Find documents that came after the last item based on the date
  const lastItemsresult = await find(
    Alert,
    {
      $and: [{ date: { $gt: lastItem.date } }, { status: status }],
    },
    (pagination = {}),
    sort
  );
  // Sort in ascending order based on the date
  let updateItemsresult = [];
  if (isUpdate.length != 0) {
    updateItemsresult = await find(
      Alert,
      {
        _id: { $in: isUpdate },
      },
      (pagination = {}),
      sort
    );
    isUpdate = [];
  }
  return { new: lastItemsresult, update: updateItemsresult };
};

const updateAlertStatus = async (alertId, status) => {
  isUpdate.push(alertId);
  const localTimeZone = moment.tz.guess();
  const currentTime = moment().tz(localTimeZone);
  const update = new Date();
  const utcHours = currentTime.hours();
  const utcMinutes = currentTime.minutes();
  const utcSeconds = currentTime.seconds();
  update.setUTCHours(utcHours, utcMinutes, utcSeconds);
  const filter = { _id: alertId };
  const body = { status: status, update: update };
  const result = await findOneAndUpdate(Alert, filter, body);
  console.log(result);
  return result;
};
const treatedAlert = async (id, status, userId, duration, summary) => {
  const update = await updateAlertStatus(id, status);
  const add = await addHistoryforHelper(id, userId, duration, summary);
  return { update: update, add: add };
};

module.exports = {
  getAlerts,
  getnewAlerts,
  getAlertDetails,
  updateAlertStatus,
  treatedAlert,
};
