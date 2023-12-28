const express = require("express");
// require("express-async-errors");
const connection = require("./config/db");
const errorMiddlware = require("./middlewares/errorMiddleware");
const cors = require("cors");

require("dotenv").config();
const logger = require("./logger/logger")
// const passwordReset = require("./routes/passwordReset");
const users = require("./routes/users");

// const alerts =require("./routes/alerts");
// const register= require("./routes/register");
const HOST_NAME = process.env.HOST_NAME | "127.0.0.1";
const PORT = process.env.PORT | 8080;
const app = express();


connection();
app.use(cors());

app.use(express.json());

app.use(errorMiddlware);
// app.use("/api/register",register)
app.use("/api/users", users);
// app.use("/api/alerts", alerts);
// app.use("/api/reset-password", passwordReset);
app.use("/api",require("./routes/index.route"))
logger.info(process.env.HOST_NAME,PORT)
app.use(errorMiddlware);
app.listen(PORT, HOST_NAME, () => {
  logger.info(`server is up and running+${HOST_NAME}:${PORT}`);
});
// process.on("unhandledRejection", err => {
//     console.log(`An error occurred: ${err.message}`);
//     //disconnect();
//     server.close(() => process.exit(1))
// }
// )
