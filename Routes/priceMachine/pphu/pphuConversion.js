const fabricTypeChecker = require('./fabricTypeChecker');
const pphuSchema = require('../../../Schemas/pphuSchema');
const pphuFabricSchema = require('../../../Schemas/pphuFabricSchema');
const pphuKey = require('./pphuKey');

const pphuConversion = async data => {
  let models = [];
  //Loop through each row of packinglist to calculate cost.
  for (let i = 0; i < data.length; i++) {
    const { model, size, type, name } = data[i];
    let modelName = model.toLowerCase();
    let description;

    //Convert the size in the packing list to match the description value in the DB.
    if (modelName === 'floyd') {
      modelName = 'revolution';
      description = pphuKey[0][modelName][size];
    } else if (modelName.indexOf('pillow back') !== -1) {
      description = pphuKey[0].barbicanPillowBack[size];
      modelName = model.split(' ')[0];
    } else if (modelName.indexOf('stock') !== -1) {
      modelName = modelName.split(' ')[0];
      description = pphuKey[0][modelName][size];
    } else {
      description = pphuKey[0][modelName][size];
    }

    //Checks for what type the fabric is (railroad, stripe, normal). Returns the name and fabric type to be used as search params for DB.
    const [fabricName, fabricType] = fabricTypeChecker(type, name, model);
    let whitePrice;
    let consumption;
    let price;

    try {
      //Finds the specific model using the model name and description
      const model = await pphuSchema.find({
        name: modelName,
        description: description
      });

      //Finds the specific fabric using the fabric name and fabric type
      const fabric = await pphuFabricSchema.find({
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
        whitePrice = parseInt(model[0].whiteprice.normal * 100) / 100;
        if (fabricType === 'leather') {
          whitePrice = parseInt(model[0].whiteprice.leather * 100) / 100;
          consumption = model[0].consumption.leather;
        } else if (fabricType === 'john lewis railroad') {
          consumption = model[0].consumption.railroad;
        } else {
          consumption = model[0].consumption.normal;
        }
        consumption = parseInt(consumption * 100) / 100;
        if (
          (modelName === 'joplin' ||
            modelName === 'madison' ||
            modelName === 'revolution') &&
          fabricType === 'leather'
        ) {
          price = Math.round(whitePrice + consumption * cost);
        } else {
          price = Math.round((whitePrice + consumption * cost) * 100) / 100;
        }
        models.push({
          ...data[i],
          cost: price
        });
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  return models;
};

module.exports = pphuConversion;
