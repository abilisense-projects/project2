const { updateUser } = require("../services/user.service");
const updateUserController = async (req, res, next) => {
  try {
    const { userId, email, name } = req.body;
    const token = updateUser(userId, email, name);
    token !== null ? res.send(token) : res.send("not updated");
  } catch (error) {
    next(error);
  }
};
module.exports = { updateUserController };
