const {
  LoginController,
  registerController,
  resetPasswordRequestController,
  resetPasswordController,
} = require("../controllers/auth.controller");
const {
  getAllertsController,
  getnewAlertController,
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
router.get("/alert/:lastAlertID", VerifyToken, getnewAlertController);
router.get("/alert", getAllertsController);
router.post("/auth/login", ApiRateLimiter, LoginController);

module.exports = router;
