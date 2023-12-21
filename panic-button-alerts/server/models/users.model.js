const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const bcrypt = require("bcrypt");
const bcryptSalt = process.env.BCRYPT_SALT;
const RateLimit = require("express-rate-limit");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const user = this;
userSchema.pre("save", async function (next) {
  if (!user.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(user.password, Number(bcryptSalt));
  user.password = hash;
  next();
});
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, env.process.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};
UserSchema.statics.findByToken = function (token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return this.findOne({ _id: decoded._id });
  } catch (err) {
    throw new Error(`Error verifying token: ${err.message}`);
  }
};
const User = mongoose.model("user", userSchema);

const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required().unique().trim(),
    password: Joi.string()
      .required()
      .min(8)
      .$_validate(
        /(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/])[a-zA-Z\d!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/]{8,}$/
      ),
  });
  return schema.validate(user);
};

module.exports = { User, validate };
