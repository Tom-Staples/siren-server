const mongoose = require('mongoose');

const reqString = {
  type: String,
  required: true
};

const reqNum = {
  type: Number,
  required: true
};

const ImsSchema = mongoose.Schema({
  supplier: reqString,
  name: reqString,
  description: reqString,
  size: reqString,
  whitePrice: reqNum,
  consumption: reqNum
});

module.exports = mongoose.model('imsModels', ImsSchema, 'imsModels');
