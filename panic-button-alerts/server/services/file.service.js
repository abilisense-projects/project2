const File = require("../models/file.model");

const SaveToMongoDB = async (originalname, buffer) => {
      // Create a new instance of the File model
      const newFile = new File({
        filename: originalname,
        content: buffer.toString("base64"),
      });
  
      // Save the file to MongoDB
      await newFile.save();
  
      // Send a response indicating success
      return newFile.isNew;
   
  };
  module.exports = {SaveToMongoDB}