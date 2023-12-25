const { Alert } = require("../models/alerts.model");
const getAlerts = async () => {
  const alerts = await Alert.find().sort({ date: 1 });
  return alerts;
};

const getnewAlerts = async (lastIdAlert) => {
console.log(lastIdAlert)
  const lastItem = await Alert.find({_id:{$gt:lastIdAlert}})
  //({lastIdAlert});
  console.log(lastItem)
  console.error(lastItem.date);
  // Find documents that came after the last item based on the date 
  const result = await Alert.find({ date: { $gt: lastItem.date } }).sort({
    date: 1,
  }); // Sort in ascending order based on the date
  return result;
};
module.exports = { getAlerts, getnewAlerts };
