const fs = require('fs');
const path = require('path');

module.exports = {
  createDirectory: (dirPath) => {
    try {
      fs.mkdirSync(dirPath);
      console.log(`Successfully created project ${dirPath}`);
      
    } catch (err) {
      console.log(err);
      return false;
    }
  },
}