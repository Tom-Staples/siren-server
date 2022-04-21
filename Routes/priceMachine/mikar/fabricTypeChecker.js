const fabricTypeChecker = (type, name, stock, model) => {
  const hpRailroadFabrics = ['Riley', 'Fraser', 'Hatton', 'Erin', 'Connie'];
  const hpStripeFabrics = ['Ruskin.C', 'C.Twill'];
  const railroadFabrics = [
    'Hatton',
    'Erin',
    'Fraser',
    'Windsor',
    'Carina',
    'Shetland',
    'Dylan',
    'Victoria',
    'Vegas',
    'Linoso',
    'Mather'
  ];
  let fabricType;
  let fabricName;

  //Conversion for stock fabrics
  if (stock === 'stock') {
    //Assigns the correct value to the fabricName variable.
    if (
      model.indexOf('Stock') !== -1 ||
      model === 'Lennon' ||
      model === 'Dylan'
    ) {
      fabricName = type;
    } else {
      fabricName = name.split('(')[1].split(' ')[0];
    }

    //Determines whether the fabric is railroad or normal
    for (let i = 0; i < railroadFabrics.length; i++) {
      if (railroadFabrics[i].indexOf(fabricName) !== -1) {
        fabricType = 'stock railroad';
        break;
      }
      fabricType = 'stock normal';
    }
  }

  //Conversion for Leather fabrics
  else if (stock === 'leather') {
    fabricName = type;
    fabricType = 'leather';
  }
  //Conversion for HP fabrics
  else {
    //Assigns the correct fabric name based on the type
    if (type === 'ASAF Band A') {
      fabricName = 'HP Band A';
    }
    if (type === 'ASAF Band B') {
      fabricName = 'HP Band B';
    }
    if (type === 'ASAF Band C') {
      fabricName = 'HP Band C';
    }
    if (type === 'ASAF Band D') {
      fabricName = 'HP Band D';
    }

    //Determines whether the fabric is normal, railroad, or stripe
    for (let i = 0; i < hpRailroadFabrics.length; i++) {
      if (name.indexOf(hpRailroadFabrics[i]) !== -1) {
        fabricType = 'john lewis railroad';
        break;
      }
      fabricType = 'john lewis normal';
    }
    for (let i = 0; i < hpStripeFabrics.length; i++) {
      if (name.indexOf(hpStripeFabrics[i]) !== -1) {
        fabricType = 'john lewis normal stripe';
        break;
      }
    }
  }

  return [fabricName, fabricType];
};

module.exports = fabricTypeChecker;
