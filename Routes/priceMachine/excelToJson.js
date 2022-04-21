const xlsx = require('xlsx');

const excelToJson = path => {
  const file = xlsx.readFile(path);
  const sheets = file.SheetNames;
  const data = xlsx.utils.sheet_to_json(file.Sheets[sheets[0]]);
  return [data, file];
};

module.exports = excelToJson;
