const validateFile = (req, res, next) => {
  const { name } = req.files.file;
  if (name.indexOf('.xlsx') === -1) {
    req.fileType = false;
    res.json({
      message: 'Incorrect file type, please submit a new file.',
      fileCreated: false
    });
  } else {
    req.fileType = true;
    return next();
  }
};

module.exports = validateFile;
