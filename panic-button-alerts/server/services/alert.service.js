const moment = require("moment-timezone");

const { Alert } = require("../models/alerts.model");
const { find, findByID, findOne, findOneAndUpdate } = require("../dal/dal");
const { MedicalConditions } = require("../models/medicalConditions.model");

const sort = {
  date: 1,
};

const getAlerts = async () => {
  const filters = { status: { $nin: ["treated", "cancel"] } };
  const alerts = await find((model = Alert), filters, (pagination = {}), sort);
  return alerts;
};
const getAlertDetails = async (alertId) => {
  console.log(alertId);

  const alert = await findByID(Alert, alertId);

  if (!alert) {
    throw new Error("Alert not foun");
  }

  // Find the medical conditions for the patient associated with the alert
  const patientMedicalConditions = await find(MedicalConditions, {
    patient: alert.patient._id,
  });

  console.log(patientMedicalConditions);
  if (!patientMedicalConditions) {
    throw new Error("Medical conditions not found for the patient");
  }
  return {
    medicalConditions: patientMedicalConditions[0].medicalConditions,
    alert: alert,
  };
};

const getnewAlerts = async (lastIdAlert, updateIdAlert) => {
  const filters = { date: 1, update: 1, _id: 0 };
  const lastItem = await findByID(Alert, lastIdAlert, filters);
  const updateItem = findByID(Alert, updateIdAlert, filters);
  console.error(lastItem.date);
  // Find documents that came after the last item based on the date
  const lastItemsresult = await find(
    Alert,
    {
      $and: [
        { date: { $gt: lastItem.date } },
        { status: { $nin: ["treated", "cancel"] } },
      ],
    },((pagination = {})),
    sort
  );
  // console.log(lastItemsresult); // Sort in ascending order based on the date
  const updateItemsresult = await find(
    Alert,
    {
      $and: [
        { update: { $gte: updateItem.date } },
         //{ date: { $lte: lastItem.date } },
      ],
    },
    (pagination = {}),
    sort
  );
  console.log("update" + updateItemsresult); // Sort in ascending order based on the date
  return { new: lastItemsresult, update: updateItemsresult };
};
const updateAlertStatus = async (alertId, status) => {
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

module.exports = {
  getAlerts,
  getnewAlerts,
  getAlertDetails,
  updateAlertStatus,
};
