const {
    registerController,
    resetPasswordRequestController,
    resetPasswordController,
  } = require("../controllers/auth.controller");
  const{getAllertsController,getnewAlertController}=require("../controllers/alert.controller")
  
  const router = require("express").Router();
  
  router.post("/auth/register", registerController);
  router.post("/auth/requestResetPassword", resetPasswordRequestController);
  router.post("/auth/resetPassword", resetPasswordController);
  router.get("/alert/:lastAlertID",getnewAlertController );
  router.get("/alert",getAllertsController)
  module.exports = router;