const mongoose = require('mongoose');

const reqString = {
  type: String,
  required: true
};

const reqNum = {
  type: String,
  required: true
};

const whiteprice = mongoose.Schema({
  normal: reqNum,
  leather: reqNum
});

const consumption = mongoose.Schema({
  normal: reqNum,
  railroad: reqNum,
  leather: reqNum
});

const PphuSchema = mongoose.Schema({
  supplier: reqString,
  name: reqString,
  description: reqString,
  size: reqString,
  whiteprice: whiteprice,
  consumption: consumption
});

module.exports = mongoose.model('pphuModels', PphuSchema, 'pphuModels');
