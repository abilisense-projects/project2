const express = require("express");
const connection = require("./config/db");
const errorMiddlware = require("./middlewares/errorMiddleware");
const cors = require("cors");

require("dotenv").config();
const logger = require("./logger/logger");

const HOST_NAME = process.env.HOST_NAME || "127.0.0.1";
const PORT = process.env.PORT || 8080;
const app = express();

connection();
app.use(cors());
app.use(express.json());
app.use(errorMiddlware);
app.use("/api", require("./routes/index.route"));
app.use(errorMiddlware);
logger.info(process.env.HOST_NAME, PORT);
app.listen(PORT, HOST_NAME, () => {
  logger.info(`server is up and running+${HOST_NAME}:${PORT}`);
});
