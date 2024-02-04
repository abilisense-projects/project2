const { getHistoryforPatient, getHistoryforHelper } = require("../services/history.service");

const getHistoryforHelperController = async (req, res,next) => {
    try {
      const { userId } = req.params;
      const history = await getHistoryforHelper(userId);
      history !== null
        ? res.send(history)
        : res.status(404).send("no history for this user");
    } catch (error) {
      next(error)
    }
  };
  const getHistoryforPatientController = async (req, res,next) => {
    try {
      const { alertId } = req.params;
      const history = await getHistoryforPatient(alertId);
      history !== null
        ? res.send(history)
        : res.status(404).send("no history for this paient");
    } catch (error) {
      next(error)
    }
  };
module.exports={getHistoryforHelperController,getHistoryforPatientController}