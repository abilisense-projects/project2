const fileService =require("../services/file.service")


// Middleware to handle file upload
const uploadFile = async (req, res) => {
  try {
    await fileService.saveFile(req.file);
    res.send('File uploaded and saved to MongoDB');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving file to database');
  }
};

module.exports = {
  uploadFile,

};
