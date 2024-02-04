const {
  getAlerts,
  getnewAlerts,
  getAlertDetails,
  updateAlertStatus,
  treatedAlert
} = require("../services/alert.service");
const { addHistoryforHelper } = require("../services/history.service");

const getAlertsController = async (req, res) => {
  try {
    const alerts = await getAlerts();
    alerts !== null ? res.send(alerts) : res.status(404).send("no alerts");
  } catch (error) {
    res.status(500).send(error);
    console.error(error);
  }
};
const getAlertDetailController = async (req, res) => {
  try {
    const alertDetails = await getAlertDetails(req.params.alertId);
    alertDetails !== null
      ? res.send(alertDetails)
      : res.status(404).send("no alerts");
  } catch (error) {
    res.status(500).send(error);
    console.error(error);
  }
};

const getnewAlertController = async (req, res) => {
  try {
    const { lastAlertID } = req.params;
    if (!lastAlertID) {
      return res.status(404).send("id not valid");
    }
    const result = await getnewAlerts(lastAlertID);
    console.log(result.new, result.update);
    const newAlerts = result.new;
    const updateAlerts = result.update;
    if (updateAlerts.length !== 0 || newAlerts.length !== 0) {
      if (newAlerts.length !== 0) {
        if (updateAlerts.length !== 0) {
          console.log(updateAlerts);
          return res.send({
            isNew: true,
            newAlerts: newAlerts,
            isUpdate: true,
            updateAlerts: updateAlerts,
          });
        } else
          return res.send({
            isNew: true,
            newAlerts: newAlerts,
            isUpdate: false,
          });
      } else
        return res.send({
          isNew: false,
          isUpdate: true,
          updateAlerts: updateAlerts,
        });
    } else return res.send({ isNew: false, isUpdate: false });
  } catch (error) {
    return res.status(500).send(error);
  }
};
const updateTreatedController = async (req, res, next) => {
  try {
    const { id, status, userId, duration, summary } = req.body;
    const {update,add} = treatedAlert(id, status, userId, duration, summary);
    update !== null&&add!==null ? res.send("updated") : res.send("not updated");
  } catch (error) {
    next(error);
  }
};
const updateAlertStatusController = async (req, res, next) => {
  try {
    const { id, status } = req.body;
    const result = await updateAlertStatus(id, status);
    console.log(result);
    result !== null ? res.send("updated") : res.send("not updated");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateAlertStatusController,
  getnewAlertController,
  getAlertsController,
  getAlertDetailController,
  updateTreatedController
};
