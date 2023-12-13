const express = require("express");
const connection = require("./config/db");
require("dotenv").config();
const errorMiddlware = require("./middlewares/errorMiddleware");
const cors = require("cors");

// Use the cors middleware

const HOST_NAME = process.env.HOST_NAME | "127.0.0.1";
const PORT = process.env.PORT | 8080;
const app = express();
const logger = require("./logger/logger");
const passwordReset = require("./routes/passwordReset");
const users = require("./routes/users");

connection();
app.use(cors());
app.use(express.json());

app.use(errorMiddlware);
app.use("/api/users", users);
app.use("/api/reset-password", passwordReset);
logger.info(process.env.HOST_NAME, PORT);
app.listen(PORT, HOST_NAME, () => {
  console.log(`server is up and running+${HOST_NAME}:${PORT}`);
});
// process.on("unhandledRejection", err => {
//     console.log(`An error occurred: ${err.message}`);
//     disconnect();
//     server.close(() => process.exit(1))
// }
// )
