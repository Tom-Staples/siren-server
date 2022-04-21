const imsKey = require('./imsKey');
const imsSchema = require('../../../Schemas/imsSchema');
const imsFabricSchema = require('../../../Schemas/imsFabricSchema');
const fabricTypeChecker = require('./fabricTypeChecker');

const imsConversion = async data => {
  let models = [];

  for (let i = 0; i < data.length; i++) {
    //Loop through each row of packinglist to calculate cost.
    const { model, size, type, qty } = data[i];
    let modelName = model.toLowerCase();
    let description;

    if (modelName === 'archie 2') {
      modelName = 'archieii';
    }
    if (modelName.indexOf('stock') !== -1) {
      modelName = modelName.split(' ')[0];
    }

    //Convert the size in the packing list to match the description value in the DB.
    description = imsKey[0][modelName][size];

    //Checks for what type the fabric is (railroad, stripe, normal). Returns the name and fabric type to be used as search params for DB.
    const [fabricName, fabricType] = fabricTypeChecker(type, model);
    let whitePrice;
    let consumption;
    let price;

    try {
      //Find the specific model using the model name and description
      const model = await imsSchema.find({
        name: modelName,
        description: description
      });

      //Find the specific fabric using the fabricname and fabric type
      const fabric = await imsFabricSchema.find({
        name: fabricName,
        type: fabricType
      });

      if (!model[0] || !fabric[0]) {
        price = 0;
        models.push({
          ...data[i],
          cost: price
        });
      } else {
        const { cost } = fabric[0];
        whitePrice = model[0].whitePrice;
        consumption = model[0].consumption;
        price =
          (Math.round((whitePrice + consumption * cost) * 100) / 100) * qty;
        models.push({
          ...data[i],
          cost: price
        });
      }
    } catch (err) {
      return err;
    }
  }
  return models;
};

module.exports = imsConversion;
