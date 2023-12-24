const JWT = require("jsonwebtoken");
const { User, validate,comparePassword,generateAuthToken } = require("../models/users.model");
const { Token } = require("../models/tokens.model");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const JWTSecret = process.env.JWT_SECRET;
const bcryptSalt = process.env.BCRYPT_SALT;
const clientURL = process.env.CLIENT_URL;

const register = async (data) => {
  const { error } = validate(data);
  if (error) {
    throw new Error(error.details[0].message, 400);
  }
  let user = await User.findOne({ email: data.email });
  if (user) {
    throw new Error("Email already exist", 422);
  }
  user = new User(data);
  const token = JWT.sign({ id: user._id }, JWTSecret);
  await user.save();

  return (data = {
    userId: user._id,
    email: user.email,
    name: user.name,
    token: token,
  });
};

const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Email does not exist");

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;

  sendEmail(
    user.email,
    "Password Reset Request",
    {
      name: user.name,
      link: link,
    },
    "./template/requestResetPassword.handlebars"
  );
  return { link };
};

const resetPassword = async (userId, token, password) => {
  let passwordResetToken = await Token.findOne({ userId });

  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }

  console.log(passwordResetToken.token, token);

  const isValid = await bcrypt.compare(token, passwordResetToken.token);

  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }

  const hash = await bcrypt.hash(password, Number(bcryptSalt));

  await User.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true }
  );

  const user = await User.findById({ _id: userId });

  sendEmail(
    user.email,
    "Password Reset Successfully",
    {
      name: user.name,
    },
    "./template/resetPassword.handlebars"
  );

  await passwordResetToken.deleteOne();

  return { message: "Password reset was successful" };
};
const Login = async (useremail, password) => {
  const user = await User.findOne({ email: useremail });
  console.log(user)

  if (!user) {
    // Username not found
    throw new Error("Invalid user", 401);
    // return res.status(401).json({ message: 'Invalid user' });
  }

  const isMatch = await user.comparePassword(password);
  console.log(isMatch)
  if (!isMatch) {
    // Incorrect password
    throw new Error("Invalid username or password", 401);
    //return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token =  user.generateAuthToken();

  // Increments the login count for the user
  //await user.incrementLoginCount();

  return token;
};

module.exports = {
  Login,
  register,
  requestPasswordReset,
  resetPassword,
};
