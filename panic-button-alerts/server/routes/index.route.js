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
<<<<<<< HEAD
router.get("/alerts/details/:alertId", getAlertController);
router.get("/alerts/:lastAlertID/:updateAlertID", getnewAlertController);
router.get("/alerts", getAlertsController);

router.post("/alerts", updateAlertController);
=======
>>>>>>> 2fe21e663ecbd3475363ec9552b512c00d805c85
router.post("/auth/login", ApiRateLimiter, LoginController);
router.use(Auth)
router.get("/alerts/details/:alertId", getAlertDetailController);
router.get("/alerts/:lastAlertID", getnewAlertController);
router.get("/alerts", getAlertsController);
router.post("/alerts", updateAlertController);


module.exports = router;
