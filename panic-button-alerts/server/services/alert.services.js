const { Alert } = require("../models/alerts.model");
const getAlerts = async () => {
  const alerts = await Alert.find().sort({ date: 1 });
  return alerts;
};

const getnewAlerts = async (lastIdAlert) => {
  const lastItem = await Alert.findById(lastIdAlert);
  console.error(lastItem.date);
  // Find documents that came after the last item based on the date 
  const result = await Alert.find({ date: { $gt: lastItem.date } }).sort({
    date: 1,
  }); // Sort in ascending order based on the date
  return result;
};
module.exports = { getAlerts, getnewAlerts };
