const fabricTypeChecker = (type, name, stock) => {
  const railroadFabrics = ['Riley', 'Fraser', 'Hatton', 'Erin', 'Connie'];
  const stripeFabrics = ['Ruskin.C', 'S.Twill'];
  let fabricType;
  let fabricName;
  let axis = 'normal';

  //Checks for stock fabric
  if (stock === 'stock') {
    fabricType = 'stock';

    //Checks for leather fabrics
    if (
      type === 'Contempo' ||
      type === 'Demetra' ||
      type === 'Nature' ||
      type === 'Piccadilly' ||
      type === 'Selvaggio' ||
      type === 'Soft Touch' ||
      type === 'Winchester'
    ) {
      fabricType = 'leather';
      fabricName = type;
    }
    //Converts ASAF Fabric names in to Stock Names
    else if (
      type === 'ASAF Band A' ||
      type === 'ASAF Band B' ||
      type === 'ASAF Band C' ||
      type === 'ASAF Band D'
    ) {
      fabricNameArray = name.split('(');
      fabricName = fabricNameArray[1].split(' ')[0];
    } else {
      fabricName = type;
    }
  } else {
    //Checks for stripe fabrics.
    for (let i = 0; i < stripeFabrics.length; i++) {
      if (name.indexOf(stripeFabrics[i]) !== -1) {
        axis = 'stripe';
        break;
      }
    }

    //Checks for railroad fabrics
    for (let i = 0; i < railroadFabrics.length; i++) {
      if (name.indexOf(railroadFabrics[i]) !== -1) {
        axis = 'railroad';
        break;
      }
    }

    //Assigns the fabric name based on the type.
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

    //Assigns the fabric type based on the axis of the fabric.
    if (axis === 'railroad') {
      fabricType = 'john lewis railroad';
    } else if (axis === 'stripe') {
      fabricType = 'john lewis normal stripe';
    } else {
      fabricType = 'john lewis normal';
    }
  }

  return [fabricType, fabricName];
};

module.exports = fabricTypeChecker;
