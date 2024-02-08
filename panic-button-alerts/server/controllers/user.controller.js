const { updateUser } = require("../services/user.service");
const updateUserController = async (req, res, next) => {
  try {
    const { userId, email, name } = req.body;
    const token = await updateUser(userId, name, email);
    console.log(token)
    token !== null ? res.json({token:token}) : res.send("not updated");
  } catch (error) {
    next(error);
  }
};
module.exports = { updateUserController };
