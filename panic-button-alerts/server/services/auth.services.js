const JWT = require("jsonwebtoken");
const { User, validate } = require("../models/users.model");
const { Token } = require("../models/tokens.model");
const sendEmail = require("../utils/sendEmail");
const { findOne, findOneAndDelete, findByID,findOneAndUpdate } = require("../dal/dal");

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
  let user = await findOne(User, { email: data.email });
  if (user) {
    throw new Error("Email already exist", 422);
  }
  user = new User(data);
  const token = JWT.sign({ id: user._id }, JWTSecret);
  await user.save();
  sendEmail(
    user.email,
    "Welcome to you new account",
    {
      name: user.name,
    },
    "../utils/template/welcome.handlebars"
  );
  return (data = {
    userId: user._id,
    email: user.email,
    name: user.name,
    token: token,
  });
};

const requestPasswordReset = async (email) => {
  const user = await findOne(User, { email });
  if (!user) throw new Error("Email does not exist");

  await findOneAndDelete(Token, { userId: user._id });

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

const resetPassword = async (user_Id, token, password) => {
  console.log(user_Id);
  let passwordResetToken = await findOne(Token, { userId: user_Id });
  console.log("passwordResetToken" + passwordResetToken);
  console.log("yoken" + token);
  if (!passwordResetToken.token) {
    throw new Error("Invalid or expired password reset token");
  }

  console.log(passwordResetToken.token, token);

  const isValid = await bcrypt.compare(token, passwordResetToken.token);

  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }

  const hash = await bcrypt.hash(password, Number(bcryptSalt));

  await User.updateOne(
    { _id: user_Id },
    { $set: { password: hash } },
    { new: true }
  );

  const user = await findByID(User, { _id: user_Id });

  sendEmail(
    user.email,
    "Password Reset Successfully",
    {
      name: user.name,
    },
    "./template/resetPassword.handlebars"
  );

  await passwordResetToken.deleteOne();

  return { success: "Password reset was successful" };
};
const Login = async (useremail, password) => {
  const user = await findOne(User, {email: useremail });
  console.log("user", user);

  if (!user) {
    // Username not found
    throw new Error("Invalid user", 401);
  }

  const isMatch = await user.comparePassword(password);
  console.log(isMatch);
  if (!isMatch) {
    // Incorrect password
    throw new Error("Invalid username or password", 401);
  }

  const token = user.generateAuthToken();

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
