const {
  LoginController,
  registerController,
  resetPasswordRequestController,
  resetPasswordController,
} = require("../controllers/auth.controller");
const {
  getAlertsController,
  getnewAlertController,
  getAlertDetailController,
  updateAlertController,
  getAlertsforHelperController,
  getAlertsforPatientController
} = require("../controllers/alert.controller");
const ApiRateLimiter = require("../middlewares/ApiRateLimiter");
const VerifyToken = require("../middlewares/VerifyToken");
const Auth =require("../middlewares/auth")

const router = require("express").Router();

router.post("/auth/register", registerController);
router.post(
  "/auth/requestResetPassword",
  ApiRateLimiter,
  resetPasswordRequestController
);
router.post("/auth/resetPassword", VerifyToken,resetPasswordController);
router.post("/auth/login", ApiRateLimiter, LoginController);
router.use(Auth)
router.get("/alerts/details/:alertId", getAlertDetailController);
router.get("/alerts/:lastAlertID", getnewAlertController);
router.get("/alerts", getAlertsController);
router.post("/alerts", updateAlertController);
router.get("/alerts/user/:userId",getAlertsforHelperController)
router.get("/alerts/history/:alertId",getAlertsforPatientController)



module.exports = router;
