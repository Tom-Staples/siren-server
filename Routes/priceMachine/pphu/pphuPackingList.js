const pphuConversion = require('./pphuConversion');
const excelToJson = require('../excelToJson');
const writeFile = require('../writeFile');

const pphuPackingList = async (req, res, path) => {
  try {
    //Read file and convert to JSON format
    const [data, file] = excelToJson(path);

    //Takes the original data and adds the cost key and value to the array.
    const result = await pphuConversion(data);

    //Writes the new file with the adjusted data from the conversion and sends JSON response
    writeFile(result, file, res);
  } catch (err) {
    console.log(err);
    res.json({
      error: err,
      fileCreated: false,
      message:
        'Packing list cost cannot be calculated. Please upload a new file.'
    });
  }
};

module.exports = pphuPackingList;
