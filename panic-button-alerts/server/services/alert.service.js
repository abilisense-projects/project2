const moment = require("moment-timezone");

const { Alert } = require("../models/alerts.model");
const { find, findByID, findOne, findOneAndUpdate } = require("../dal/dal");
const { MedicalConditions } = require("../models/medicalConditions.model");

const isUpdate = [];
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

const getnewAlerts = async (lastIdAlert) => {
  const filters = { date: 1, update: 1, _id: 0 };
  const lastItem = await findByID(Alert, lastIdAlert, filters);
  // Find documents that came after the last item based on the date
  const lastItemsresult = await find(
    Alert,
    {
<<<<<<< HEAD
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
=======
      $and: [{ date: { $gt: lastItem.date } }, { status: status }],
>>>>>>> 2fe21e663ecbd3475363ec9552b512c00d805c85
    },
    (pagination = {}),
    sort
  );
  // Sort in ascending order based on the date
  console.log(isUpdate);
  const updateItemsresult = [];
  console.log(isUpdate.length!=0)
  if(isUpdate.length != 0)
    {console.log("came to if")
      (updateItemsresult = await find(
        Alert,
        { _id: { $in: isUpdate } },
        (pagination = {}),
        sort
      ))
    }
  isUpdate.length=0;
  console.log("came")
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

module.exports = {
  getAlerts,
  getnewAlerts,
  getAlertDetails,
  updateAlertStatus,
};
