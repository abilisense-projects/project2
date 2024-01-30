const {
  Login,
  register,
  requestPasswordReset,
  resetPassword,
} = require("../services/auth.service");

const registerController = async (req, res, next) => {
  try {
    const registerService = await register(req.body);
    return res.json(registerService);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const resetPasswordRequestController = async (req, res, next) => {
  try {
    const requestPasswordResetService = await requestPasswordReset(
      req.body.email
    );
    return res.json(requestPasswordResetService);
    
  } catch (error) {
    next(error)
  }

};

const resetPasswordController = async (req, res, next) => {
 try {
  const resetPasswordService = await resetPassword(
    req.body.userid,
    req.body.token,
    req.body.password
  );
  return res.json(resetPasswordService);
  
 } catch (error) {
  next(error)
 } 
};
const LoginController = async (req, res,next) => {
  try {
    const token = await Login( req.body.email,req.body.password );
    if (token) {
      res.send({ message: "Login Success", status: 1,token:token });
    }
   else {res.send({message: "Login failed", status: 0})}
  } catch (error){
next(error)  }
};

module.exports = {
  LoginController,
  registerController,
  resetPasswordRequestController,
  resetPasswordController,
};
