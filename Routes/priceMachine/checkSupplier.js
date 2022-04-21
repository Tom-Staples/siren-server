const imobPackingList = require('./imob/imobPackingList');
const mikarPackingList = require('./mikar/mikarPackingList');
const imsPackingList = require('./ims/imsPackingList');
const pphuPackingList = require('./pphu/pphuPackingList');

const checkSupplier = (req, res) => {
  req.fileType = true;
  const { supplier } = req.fields;
  const { path } = req.files.file;
  if (supplier === 'imob') {
    imobPackingList(req, res, path);
  } else if (supplier === 'mikar') {
    mikarPackingList(req, res, path);
  } else if (supplier === 'ims') {
    imsPackingList(req, res, path);
  } else if (supplier === 'pphu') {
    pphuPackingList(req, res, path);
  } else {
    res.json({
      fileCreated: false,
      message:
        'Packing list cannot be calculated for this supplier. Please change the supplier.'
    });
  }
};

module.exports = checkSupplier;
