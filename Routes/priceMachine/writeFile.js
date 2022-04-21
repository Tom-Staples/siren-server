const xlsx = require('xlsx');

const writeFile = (result, file, res) => {
  const workSheet = xlsx.utils.json_to_sheet(result);
  xlsx.utils.book_append_sheet(file, workSheet, 'Packing List Cost');
  xlsx.writeFile(file, './packingList.xlsx');
  res.json({
    fileCreated: true,
    message:
      'Packing list cost has been calculated. Please download the new packing list.'
  });
};

module.exports = writeFile;
