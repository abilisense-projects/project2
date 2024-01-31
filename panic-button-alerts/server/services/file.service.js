const File = require('../models/file.model');

const saveFile = async (file) => {
  console.log(file)
  const newFile = new File({
    name: file.originalname,
    contentType: file.mimetype,
    data: file.buffer,
  });

  await newFile.save();
  return newFile.isNew;
};

module.exports = {
  saveFile,
};
