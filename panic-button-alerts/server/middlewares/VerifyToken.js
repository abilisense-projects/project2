const  { User } = require("../models/users.model") ;
const VerifyToken = async (req, res, next) => {
  try {
    const token = req.params.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findByToken(token);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = VerifyToken;
