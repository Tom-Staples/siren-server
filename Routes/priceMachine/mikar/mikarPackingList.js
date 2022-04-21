const excelToJson = require('../excelToJson');
const mikarConversion = require('./mikarConversion');
const writeFile = require('../writeFile');

const mikarPackingList = async (req, res, path) => {
  try {
    //Read file and convert to JSON Format
    const [data, file] = excelToJson(path);

    const result = await mikarConversion(data);

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

module.exports = mikarPackingList;
