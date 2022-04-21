const mongoose = require('mongoose');

const reqString = {
  type: String,
  required: true
};

const reqNum = {
  type: Number,
  required: true
};

const ImobFabricSchema = mongoose.Schema({
  name: reqString,
  fabricType: reqString,
  cost: reqNum
});

module.exports = mongoose.model('imobFabrics', ImobFabricSchema, 'imobFabrics');
