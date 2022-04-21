const mongoose = require('mongoose');

const reqString = {
  type: String,
  required: true
};

const reqNum = {
  type: Number,
  required: true
};

const whitePrice = mongoose.Schema({
  lowRate: reqNum,
  highRate: reqNum
});

const consumption = mongoose.Schema({
  normal: reqNum,
  leather: reqNum
});

const FeniksSchema = mongoose.Schema({
  supplier: reqString,
  name: reqString,
  description: reqString,
  size: reqString,
  whitePrice: whitePrice,
  consumption: consumption
});

module.exports = mongoose.model('feniksModels', FeniksSchema, 'feniksModels');
