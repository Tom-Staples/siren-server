const express = require('express');
const router = express.Router();
const formidable = require('express-formidable');
const checkSupplier = require('./checkSupplier');
const validateFile = require('./validateFile');

router.use(formidable());
router.post('/', validateFile, checkSupplier);
router.get('/', (req, res) => {
  res.download('./packingList.xlsx');
});

module.exports = router;
