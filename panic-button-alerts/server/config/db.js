const mongoose = require("mongoose");
// const logger = require('../logger/logger');

// const connection = () => {

//     const url = process.env.DATABASE_URL;
//     // logger.info("process.env.DATABASE_URL :::" + url);

//     mongoose.connect(url, {
//         useNewUrlParser: true,
//          useFindAndModify: false,
//         useUnifiedTopology: true,
//          useCreateIndex: true,
//     })

//     mongoose.connection.once("open", async () => {
//         // logger.info("Connected to database");
//     });

//     mongoose.connection.on("error", (err) => {
//         // logger.error("Error connecting to database  ", err);
//         process.exit(1);
//     });
// }
mongoose.set("strictQuery", false);

const connection = async () => {
  try {
    const url = process.env.DATABASE_URL;
    // logger.info("process.env.DATABASE_URL :::" + url);
    await mongoose.connect(url);
    console.log("connected to database.");
  } catch (error) {
    console.error(error, "could not connect database.");
    process.exit(1);
  }
};
export default connection;
// const disconnect = () => {

//     if (!mongoose.connection) {
//         return;
//     }

//     mongoose.disconnect();

//     mongoose.once("close", async () => {
//         console.log("Diconnected  to database");
//     });

// };

// module.exports = {
//     connection,
//     // disconnect
// }
