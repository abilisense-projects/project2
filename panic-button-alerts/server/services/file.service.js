const File = require('../models/file.model');

const saveFile = async (file) => {
  console.log(file)
  const newFile = new File({
    name: file.name,
    contentType: file.mimeType,
    data: file.uri,
  });

  await newFile.save();
  return newFile.isNew;
};

module.exports = {
  saveFile,
};
