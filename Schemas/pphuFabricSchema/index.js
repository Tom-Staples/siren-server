const mongoose = require('mongoose');

const reqString = {
  type: String,
  required: true
};

const reqNum = {
  type: Number,
  required: true
};

const PphuFabricSchema = mongoose.Schema({
  name: reqString,
  fabricType: reqString,
  cost: reqNum
});

module.exports = mongoose.model('pphuFabrics', PphuFabricSchema, 'pphuFabrics');
