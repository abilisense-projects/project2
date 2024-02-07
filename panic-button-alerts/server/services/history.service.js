const { create, findByID, find } = require("../dal/dal");
const { Alert } = require("../models/alerts.model");
const { History } = require("../models/history.model");

const addHistoryforHelper = async (id, userId, duration, summary) => {
  history = {
    userId: userId,
    alertId: id,
    duration: duration,
    summary: summary,
  };
  const result = await create(History, history);
  console.log(result);
};
const getHistoryforHelper = async (userId) => {
  const history = await History.find({ userId: userId }).populate("alertId");
  return history;
};
const getHistoryforPatient = async (alertId) => {
  const alert = await findByID(Alert, alertId);
  console.log(alert);
  const history = await Alert.find({ patient: alert.patient._id });

  return history;
};
module.exports = {
  addHistoryforHelper,
  getHistoryforHelper,
  getHistoryforPatient,
};
