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
  normal: reqNum,
  leather: reqNum,
  stripe: reqNum
});

const consumption = mongoose.Schema({
  normal: reqNum,
  railroad: reqNum,
  hpNormal: reqNum,
  hpRailroad: reqNum,
  hpNormalStripe: reqNum,
  hpRailroadStripe: reqNum,
  leather: reqNum
});

const MikarSchema = mongoose.Schema({
  supplier: reqString,
  name: reqString,
  description: reqString,
  size: reqString,
  whitePrice: whitePrice,
  consumption: consumption
});

module.exports = mongoose.model('mikarModels', MikarSchema, 'mikarModels');
