const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });



// Middleware to handle file upload
const uploadFile = async (req, res, next) => {
  try {
    // Perform the file upload
    upload.single("file")(req, res, async (err) => {
      if (err) {
        // Handle file upload error
        next(err);
      } else {
        // Call the function to save to MongoDB
        const { originalname, buffer } = req.file;
       const isUpload= await uploadAndSaveToMongoDB(originalname, buffer);
       res.send(isUpload)
      }
    });
  } catch (error) {
    // Pass the error to the next middleware for centralized error handling
    next(error);
  }
};

module.exports = {
  uploadFile,

};
