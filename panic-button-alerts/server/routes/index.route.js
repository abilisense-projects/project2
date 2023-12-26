const {
  LoginController,
  registerController,
  resetPasswordRequestController,
  resetPasswordController,
} = require("../controllers/auth.controller");
const {
  getAlertsController,
  getnewAlertController,
  getAlertController,
} = require("../controllers/alert.controller");
const ApiRateLimiter = require("../middlewares/ApiRateLimiter");
const VerifyToken = require("../middlewares/VerifyToken");

const router = require("express").Router();

router.post("/auth/register", registerController);
router.post(
  "/auth/requestResetPassword",
  ApiRateLimiter,
  resetPasswordRequestController
);
router.post("/auth/resetPassword", resetPasswordController);
router.get("/alerts/:lastAlertID", getnewAlertController);
router.get("/alerts", getAlertsController);
router.get("/alerts/details/:alertId", getAlertController);
router.post("/auth/login", ApiRateLimiter, LoginController);

module.exports = router;
