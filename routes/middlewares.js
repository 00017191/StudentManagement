const fs = require('fs')
var path = require('path');



function readDataFromJson() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '../data/students.json'), 'utf8'));
}


function writeDataIntoJson(data) {
  fs.writeFile(path.join(__dirname, '../data/students.json'), JSON.stringify(data, null, 2), (error) => {
      if (error) {
        console.log('An error has occurred ', error);
        return;
      }
      console.log('Data written successfully to file');
    });
}

module.exports = {
    readDataFromJson, 
    writeDataIntoJson
}