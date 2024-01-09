const {
  getAlerts,
  getnewAlerts,
  getAlertDetails,
  updateAlertStatus,
} = require("../services/alert.service");

const getAlertsController = async (req, res) => {
  try {
    const alerts = await getAlerts();
    res.send(alerts);
  } catch (error) {
    res.status(500).send(error);
    console.error(error);
  }
};
const getAlertController = async (req, res) => {
  try {
    const alertDetails = await getAlertDetails(req.params.alertId);
    console.log(alertDetails);
    res.send(alertDetails);
  } catch (error) {
    res.status(500).send(error);
    console.error(error);
  }
};

const getnewAlertController = async (req, res) => {
  try {
    const { lastId, updateId } = req.params.lastAlertID;

    if (!lastId || updateId) {
     return res.status(404).send("id not valid");
    }
    const result = await getnewAlerts(lastId, updateId);
    // console.log(result.new, result.update);
    const newAlerts = result.new;
    const updateAlerts = result.update;
    if (updateAlerts.length !== 0 || newAlerts.length !== 0) {
      if (newAlerts.length !== 0) {
        if (updateAlerts.length !== 0) {
          console.log(updateAlerts);
        return   res.send({
            isNew: true,
            newAlerts: newAlerts,
            isUpdate: true,
            updateAlerts: updateAlerts,
          });
        } else return res.send({ isNew: true, newAlerts: newAlerts, isUpdate: false });
      } else
       return  res.send({
          isNew: false,
          isUpdate: true,
          updateAlerts: updateAlerts,
        });
    } else return res.send({ isNew: false, isUpdate: false });
  } catch (error) {
    return res.status(500).send(error);
    console.error(error);
  }
};

const updateAlertController = async (req, res) => {
  try {
    const { id, status } = req.body;
    const result = await updateAlertStatus(id, status);
    console.log(result);
    result !== undefined ? res.send("updated") : res.send("not updated");
  } catch (error) {
    res.status(500).send(error);
    console.error(error);
  }
};
module.exports = {
  updateAlertController,
  getnewAlertController,
  getAlertsController,
  getAlertController,
};
