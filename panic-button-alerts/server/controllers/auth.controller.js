const {
  Login,
  register,
  requestPasswordReset,
  resetPassword,
} = require("../services/auth.services");

const registerController = async (req, res, next) => {
  try {
    const registerService = await register(req.body);
    return res.json(registerService);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const resetPasswordRequestController = async (req, res, next) => {
  const requestPasswordResetService = await requestPasswordReset(
    req.body.email
  );
  return res.json(requestPasswordResetService);
};

const resetPasswordController = async (req, res, next) => {
  console.log("userId"+req.body.userid)
  const resetPasswordService = await resetPassword(
    req.body.userid,
    req.body.token,
    req.body.password
  );
  return res.json(resetPasswordService);
};
const LoginController = async (req, res) => {
  try {
    const token = await Login( req.body.email,req.body.password );
    if (token) {
      res.json({ message: "Login Success", status: 1,token:token });
    }
    
   else {res.json({message: "Login failed", status: 0})}
  } catch (error){
    console.log(error)
  }
};

module.exports = {
  LoginController,
  registerController,
  resetPasswordRequestController,
  resetPasswordController,
};
