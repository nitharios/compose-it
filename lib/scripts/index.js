const fs = require('fs');
const path = require('path');

const templates = require('../templates');

module.exports = {
  createDirectory: (dirName) => {
    try {
      fs.mkdirSync(dirName);

    } catch (err) {
      console.log(err);
      return false;
    }
  },

  createFiles: (dirName, userName) => {
    try {
      for (const key in templates) {
        if (key !== 'dockerComposeOverridePostgresRedis' &&
          key !== 'dockerComposeProdPostGresRedis')
          fs.writeFileSync(
            `${dirName}/${templates[key].fileName}`,
            templates[key].func(dirName, userName)
          )
      }

    } catch (err) {
      console.log(err);
      return false;
    }
  },

  checkPath: (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },

  createReactApp: (dirName) => {
    return `cd ${dirName} && npx create-react-app ${dirName} && mv ${dirName}/* . && mv ${dirName}/.git* . && rm -rf ${dirName}`
  },

  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  }
  
}