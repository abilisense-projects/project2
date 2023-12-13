const mongoose = require('mongoose');
const logger = require('../logger/logger');

const connection = () => {

    const url = process.env.DATABASE_URL;
    logger.info("process.env.DATABASE_URL :::" + url);

    mongoose.connect(url)

    mongoose.connection.once("open", async () => {
        logger.info("Connected to database");
        
    });

    mongoose.connection.on("error", (err) => {
        logger.error("Error connecting to database  ", err);
        process.exit(1);
    });
}

module.exports = 
        connection
    
