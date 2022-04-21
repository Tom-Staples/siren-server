const fabricTypeChecker = (type, name, model) => {
  const railroadFabrics = ['Hatton', 'Fraser', 'Riley', 'Erin', 'Connie'];
  let fabricName;
  let fabricType;

  //Checks whether the model is used for JL or not
  if (model.indexOf('Barbican') !== -1 || model.indexOf('Cape') !== -1) {
    //Checks whether the fabric is railroad or normal
    for (let i = 0; i < railroadFabrics.length; i++) {
      if (name.indexOf(railroadFabrics[i]) !== -1) {
        fabricType = 'john lewis railroad';
        break;
      }
      fabricType = 'john lewis normal';
    }

    //Checks for the fabric banding or leather and assigns the fabric name to match the DB
    if (type === 'ASAF Band A') {
      fabricName = 'HP Band A';
    } else if (type === 'ASAF Band B') {
      fabricName = 'HP Band B';
    } else if (type === 'ASAF Band C') {
      fabricName = 'HP Band C';
    } else if (type === 'ASAF Band D') {
      fabricName = 'HP Band D';
    } else {
      //Everything else is leather
      fabricType = 'leather';

      //Checks for demetra light tan as this is cheaper than other demetra hides
      if (name.indexOf('Light Tan') !== -1) {
        fabricName = 'Demetra (Light Tan)';
      } else {
        fabricName = type;
      }
    }
  } else {
    fabricType = 'leather';
    if (type === 'Group 1') {
      fabricName = 'Group I';
    } else if (type === 'Group 2') {
      fabricName = 'Group II';
    } else if (type === 'Africa') {
      fabricName = 'Europell';
    } else {
      fabricName = type;
      fabricType = 'stock normal';
    }
  }
  return [fabricName, fabricType];
};

module.exports = fabricTypeChecker;
