const fileService =require("../services/file.service")


// Middleware to handle file upload
const uploadFile = async (req, res,next) => {
  try {
    console.log(req.File)
    console.log(req.body)

    await fileService.saveFile(req.body.File);
    res.send('File uploaded and saved to MongoDB');
  } catch (error) {
    console.error(error);
    next(error)
  }
};

module.exports = {
  uploadFile,

};
