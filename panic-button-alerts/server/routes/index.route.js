const router = require("express").Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' }); 


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
router.post("/alerts", alertController.updateAlertStatusController);
router.post("/alerts/treated", alertController.updateTreatedController);

router.get(
  "/history/user/:userId",
  HistoryController.getHistoryforHelperController
);
router.get(
  "/history/patient/:alertId",
  HistoryController.getHistoryforPatientController
);
router.post("/upload", upload.single('file'),fileController.uploadFile);

module.exports = router;
