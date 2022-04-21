const fabricTypeChecker = require('./fabricTypeChecker');
const mikarKey = require('./mikarKey');
const mikarSchema = require('../../../Schemas/mikarSchema');
const mikarFabricSchema = require('../../../Schemas/mikarFabricSchema');

const mikarConversion = async data => {
  let models = [];
  for (let i = 0; i < data.length; i++) {
    const { model, size, type, name, feet, stock } = data[i];
    let modelName = model.toLowerCase();
    let description;

    //Convert the size in the packing list to match the description value in the DB.
    if (modelName === 'dylan') {
      modelName = 'carnaby';
      description = mikarKey[0][modelName][size];
    } else if (model.indexOf('stock') !== -1) {
      let modelNameArray = model.split(' ');
      modelName = modelNameArray[0];
      description = mikarKey[0][modelName][size];
    } else if (modelName.indexOf('pillow back') !== -1) {
      modelName = 'arlo';
      description = mikarKey[0].arloPillowBack[size];
    } else if (
      modelName === 'rise' &&
      (feet === 'Lightwood' || feet === 'Darkwood')
    ) {
      description = mikarKey[0].riseWood[size];
    } else if (modelName === 'rise' && feet === 'Metal') {
      description = mikarKey[0].riseMetal[size];
    } else {
      description = mikarKey[0][modelName][size];
    }

    //Checks for what type the fabric is (railroad, stripe, normal). Returns the name and fabric type to be used as search params for DB.
    const [fabricName, fabricType] = fabricTypeChecker(
      type,
      name,
      stock,
      model
    );
    let whitePrice;
    let consumption;
    let price;

    try {
      //Find the specific model size from DB
      const model = await mikarSchema.find({
        name: modelName,
        description: description
      });

      //Find the specific fabric from DB
      const fabric = await mikarFabricSchema.find({
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
        if (fabricType === 'leather') {
          whitePrice = model[0].whitePrice.leather;
          consumption = model[0].consumption.leather;
        } else if (
          fabricType === 'john lewis normal stripe' ||
          fabricType === 'john lewis railroad stripe'
        ) {
          {
            whitePrice = model[0].whitePrice.stripe;
            if (fabricType === 'john lewis normal stripe') {
              consumption = model[0].consumption.hpNormalStripe;
            } else {
              consumption = model[0].consumption.hpRailroadStripe;
            }
          }
        } else {
          whitePrice = model[0].whitePrice.normal;
          if (fabricType === 'stock normal') {
            consumption = model[0].consumption.normal;
          }
          if (fabricType === 'stock railroad') {
            consumption = model[0].consumption.railroad;
          }
          if (fabricType === 'john lewis normal') {
            consumption = model[0].consumption.hpNormal;
          }
          if (fabricType === 'john lewis railroad') {
            consumption = model[0].consumption.hpRailroad;
          }
        }

        //Calculate the cost price for each data line.

        price = Math.round((whitePrice + consumption * cost) * 100) / 100;
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

module.exports = mikarConversion;
