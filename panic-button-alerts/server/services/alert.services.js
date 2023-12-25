const { Alert } = require("../models/alerts.model");
const{find,findByID}=require("../dal/dal");
const sort={
  date:1
}

const getAlerts = async () => {
  
  const alerts = await find(model=Alert,filter={},pagination={},sort);
  return alerts;
};

const getnewAlerts = async (lastIdAlert) => {
  const lastItem = await findByID(Alert,lastIdAlert);
  console.error(lastItem.date);
  // Find documents that came after the last item based on the date
  const result = await find(Alert,{ date: { $gt: lastItem.date } },pagination={},sort) // Sort in ascending order based on the date
  return result;
};
module.exports = { getAlerts, getnewAlerts };
