const fabricTypeChecker = (type, model) => {
  let fabricName;
  let fabricType;

  if (model === 'Rebecca' || model === 'Samantha') {
    fabricName = type;
    fabricType = 'stock';
  } else {
    fabricType = 'john lewis';
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
  }
  return [fabricName, fabricType];
};

module.exports = fabricTypeChecker;
