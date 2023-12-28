const {
  getAlerts,
  getnewAlerts,
  getAlertDetails,
} = require("../services/alert.services");

const getAlertsController = async (req, res) => {
  try {
    const alerts = await getAlerts();
    res.send(alerts);
  } catch (error) {
    res.status(500).send("An error occurred");
    console.error(error);
  }
};
const getAlertController = async (req, res) => {
  try {
    const alert = await getAlertDetails(req.params.alertId);
    res.send(alert);
  } catch (error){
    res.status(500).send("An error occurred");
    console.error(error);
  }
};

const getnewAlertController = async (req, res) => {
  try {
    const id = req.params.lastAlertID;
    console.log(id);

    if (!id) {
      res.status(404).send("id not valid");
    }
    const newAlerts = await getnewAlerts(id);
    if (newAlerts != null) res.send({ isUpdate: true, response: newAlerts });
    else res.send({ isUpdate: false });
  } catch (error) {
    res.status(500).send("An error occurred");
    console.error(error);
  }
};
module.exports = {
  getnewAlertController,
  getAlertsController,
  getAlertController,
};
