const {
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

module.exports = {
  registerController,
  resetPasswordRequestController,
  resetPasswordController,
};
