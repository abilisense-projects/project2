const router = require("express").Router();
const multer = require('multer');

const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 1000* 1024 * 1024 },
});

const authController = require("../controllers/auth.controller");
const alertController = require("../controllers/alert.controller");
const fileController = require("../controllers/file.controller");
const HistoryController = require("../controllers/history.controller");
const UserController = require("../controllers/user.controller")
const ApiRateLimiter = require("../middlewares/ApiRateLimiter");
const VerifyToken = require("../middlewares/VerifyToken");
const Auth = require("../middlewares/auth");

router.post("/auth/register", authController.registerController);
router.post(
  "/auth/requestResetPassword",
  ApiRateLimiter,
  authController.resetPasswordRequestController
);
router.post(
  "/auth/resetPassword",
  VerifyToken,
  authController.resetPasswordController
);
router.post("/auth/login", ApiRateLimiter, authController.LoginController);
router.use(Auth);
router.get(
  "/alerts/details/:alertId",
  alertController.getAlertDetailController
);
router.get("/alerts/:lastAlertID", alertController.getnewAlertController);
router.get("/alerts", alertController.getAlertsController);
router.post("/alerts", alertController.updateAlertStatusController);
router.post("/alerts/treated", alertController.updateTreatedController);

router.get(
  "/history/user/:userId",
  HistoryController.getHistoryforHelperController
);
router.get(
  "/history/patient/:alertId",
  HistoryController.getHistoryforPatientController
);
router.post("/upload", upload.single('file'),fileController.uploadFile);
router.post("/user",UserController.updateUserController)




// //iport express from 'express';
// import dotenv from 'dotenv';
// import { StreamChat } from 'stream-chat';
// import { genSaltSync, hashSync } from 'bcrypt';

// dotenv.config();
// const router = require("express").Router();
// const { PORT, STREAM_API_KEY, STREAM_API_SECRET } = process.env;
// const client = StreamChat.getInstance(!STREAM_API_KEY, STREAM_API_SECRET);

// //const app = express();
// //app.use(express.json());
// const salt = genSaltSync(10);

// const User= {
// 	id: '',
// 	email: '',
// 	hashed_password: ''
// }
// const USERS  = [];



// // // Create user in Stream Chat
// router.post('/register', async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({
//       message: 'Email and password are required.',
//     });
//   }

//   // Minlength 6
//   if (password.length <6) {
//     return res.status(400).json({
//       message: 'Password must be at least 6 characters.',
//     });
//   }

//   const existingUser = USERS.find((user) => user.email === email);

//   if (existingUser) {
//     return res.status(400).json({
//       message: 'User already exists.',
//     });
//   }

//   try {
//     const hashed_password = hashSync(password, salt);
//     // Generate random id and push to in memory users
//     const id = Math.random().toString(36).substr(2, 9);
//     const user = {
//       id,
//       email,
//       hashed_password,
//     };
//     USERS.push(user);

//     // Create user in Stream Chat
//     await client.upsertUser({
//       id,
//       email,
//       name: email,
//     });

//     // Create token for user
//     const token = client.createToken(id);

//     return res.json({
//       token,
//       user: {
//         id: user.id,
//         email: user.email,
//       },
//     });
//   } catch (e) {
//     return res.json({
//       message: 'User already exists.',
//     });
//   }
// });

// // Login user
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = USERS.find((user) => user.email === email);
//   const hashed_password = hashSync(password, salt);

//   if (!user || user.hashed_password !== hashed_password) {
//     return res.status(400).json({
//       message: 'Invalid credentials.',
//     });
//   }
//   // Create token for user
//   const token = client.createToken(user.id);

//   return res.json({
//     token,
//     user: {
//       id: user.id,
//       email: user.email,
//     },
//   });
// });







 module.exports = router;
