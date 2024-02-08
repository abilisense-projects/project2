const { findOneAndUpdate } = require("../dal/dal");
const { User } = require("../models/users.model");

const updateUser = async (userId, name, email) => {
  const filter = { _id: userId };
  body = { name: name, email: email };
  const updateUser = await findOneAndUpdate(User, filter, body);
  console.log(updateUser)
  const token = updateUser.generateAuthToken();
  console.log(token)

  return token;
};
module.exports = { updateUser };
