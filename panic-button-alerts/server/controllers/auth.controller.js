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
  const resetPasswordService = await resetPassword(
    req.body.userId,
    req.body.token,
    req.body.password
  );
  return res.json(resetPasswordService);
};
const LoginController = async (req, res) => {
  try {
    const token = await Login( req.body.email,req.body.password );
    if (token) {
    }
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    }); // secure true to allow https only

    res.json({ message: "Login Success", status: 1 });
  } catch {}
};

module.exports = {
  LoginController,
  registerController,
  resetPasswordRequestController,
  resetPasswordController,
};
