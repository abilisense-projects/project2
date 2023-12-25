const { getAlerts, getnewAlerts } = require("../services/alert.services");

const getAllertsController = async (req, res) => {
  try {
    const alerts = await getAlerts();
    res.send(alerts);
  } catch (error) {
    res.status(500).send("An error occurred");
    console.error(error);
  }
};

const getnewAlertController = async (req, res) => {
  try {
    const id = req.params.lastIdAlert;
    console.log(req.params.lastIdAlert)
    if (!id) {
      res.status(404).send("id not valid");
    }
    const newAlerts = await getnewAlerts(id);
    if (newAlerts)
      res.send({ isUpdate: true, response: newAlerts });
    else res.send({ isUpdate: false });
  } catch (error) {
    res.status(500).send("An error occurred");
    console.error(error);
  }
};
module.exports = { getnewAlertController, getAllertsController };
