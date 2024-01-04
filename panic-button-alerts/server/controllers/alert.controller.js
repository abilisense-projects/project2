const {
  getAlerts,
  getnewAlerts,
  getAlertDetails,
  updateAlertStatus,
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
    const alertDetails = await getAlertDetails(req.params.alertId);
    res.send(alertDetails);
  } catch (error) {
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
    const result = await getnewAlerts(id);
    // console.log(result.new, result.update);
    const newAlerts = result.new;
    const updateAlerts = result.update;
    if (updateAlerts.length !== 0 || newAlerts.length !== 0) {
      if (newAlerts.length !== 0) {
        if (updateAlerts.length !== 0) {
          console.log(updateAlerts);
          res.send({
            isNew: true,
            newAlerts: newAlerts,
            isUpdate: true,
            updateAlerts: updateAlerts,
          });
        } else res.send({ isNew: true, newAlerts: newAlerts, isUpdate: false });
      } else
        res.send({
          isNew: false,
          isUpdate: true,
          updateAlerts: updateAlerts,
        });
    } else res.send({ isNew: false, isUpdate: false });
  } catch (error) {
    res.status(500).send("An error occurred");
    console.error(error);
  }
};

const updateAlertController = async (req, res) => {
  try {
    const { id, status } = req.body;
    const result = await updateAlertStatus(id, status);
    console.log(result);
    result != undefined ? res.send("updated") : res.send("not updated");
  } catch (error) {
    res.status(500).send("An error occurred");
    console.error(error);
  }
};
module.exports = {
  updateAlertController,
  getnewAlertController,
  getAlertsController,
  getAlertController,
};
