const router = require("express").Router();

const authController = require("../controllers/auth.controller");
const alertController = require("../controllers/alert.controller");
const fileController = require("../controllers/file.controller");
const HistoryController = require("../controllers/history.controller");
const ApiRateLimiter = require("../middlewares/ApiRateLimiter");
const VerifyToken = require("../middlewares/VerifyToken");
const Auth = require("../middlewares/auth");

router.post("/auth/register", authController.registerController);
router.post(
  "/auth/requestResetPassword",
  ApiRateLimiter,
  authController.resetPasswordRequestController
);
router.post(
  "/auth/resetPassword",
  VerifyToken,
  authController.resetPasswordController
);
router.post("/auth/login", ApiRateLimiter, authController.LoginController);
router.use(Auth);
router.get(
  "/alerts/details/:alertId",
  alertController.getAlertDetailController
);
router.get("/alerts/:lastAlertID", alertController.getnewAlertController);
router.get("/alerts", alertController.getAlertsController);
router.post("/alerts", alertController.updateAlertController);
router.get(
  "/alerts/user/:userId",
  HistoryController.getHistoryforHelperController
);
router.get(
  "/alerts/history/:alertId",
  HistoryController.getHistoryforPatientController
);
router.post("/upload", fileController.uploadFile);

module.exports = router;
