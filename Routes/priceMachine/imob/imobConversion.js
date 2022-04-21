const imobSchema = require('../../../Schemas/imobSchema');
const imobFabricSchema = require('../../../Schemas/imobFabricSchema');
const imobKey = require('./imobKey');
const fabricTypeChecker = require('./fabricTypeChecker');

const imobConversion = async data => {
  let models = [];
  //Loop through each row of packinglist to calculate cost.
  for (let i = 0; i < data.length; i++) {
    const { model, size, type, name, qty, stock } = data[i];
    let modelName = model.toLowerCase();

    if (modelName.indexOf('stock') !== -1) {
      let modelNameArray = modelName.split(' ');
      modelName = modelNameArray[0];
    }

    //Convert the size in the packing list to match the description value in the DB.
    const description = imobKey[0][modelName][size];

    //Checks for what type the fabric is (railroad, stripe, normal). Returns the name and fabric type to be used as search params for DB.
    const [fabricType, fabricName] = fabricTypeChecker(type, name, stock);
    let consumption;
    let whitePrice;
    let price;

    try {
      //Find the specific model size
      const model = await imobSchema.find({
        name: modelName,
        description: description
      });

      //Find the specific fabric
      const fabric = await imobFabricSchema.find({
        name: fabricName,
        fabricType: fabricType
      });

      if (!model[0] || !fabric[0]) {
        price = 0;
        models.push({
          ...data[i],
          cost: price
        });
      } else {
        const { cost } = fabric[0];

        //Assigns the whiteprice and consumption which is dependent on the fabric type.
        if (fabricType === 'leather') {
          whitePrice = model[0].whitePrice.leather;
          consumption = model[0].consumption.leather;
        } else {
          whitePrice = model[0].whitePrice.normal;
          if (fabricType === 'stock') {
            consumption = model[0].consumption.normal;
          }
          if (fabricType === 'john lewis normal') {
            consumption = model[0].consumption.hpNormal;
          }
          if (fabricType === 'john lewis railroad') {
            consumption = model[0].consumption.hpRailroad;
          }
          if (fabricType === 'john lewis normal stripe') {
            consumption = model[0].consumption.hpNormalStripe;
          }
          if (fabricType === 'john lewis railroad stripe') {
            consumption = model[0].consumption.hpRailroadStripe;
          }
        }

        //Calculate cost price for each data line.
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

module.exports = imobConversion;
