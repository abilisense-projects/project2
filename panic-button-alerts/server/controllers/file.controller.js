const fileService =require("../services/file.service")


// Middleware to handle file upload
const uploadFile = async (req, res,next) => {
  try {
   

    const reault= await fileService.saveFile(req.body.File);
    res.send(reault);
  } catch (error) {
    console.error(error);
    next(error)
  }
};

module.exports = {
  uploadFile,

};
