const fs = require('fs');
const path = require('path');

const templates = require('../templates');

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

  createFiles: (projectName, userName) => {
    try {
      for (const key in templates) {
        if (key !== 'dockerComposeOverridePostgresRedis' &&
          key !== 'dockerComposeProdPostGresRedis')
          fs.writeFileSync(
            `${projectName}/${templates[key].fileName}`,
            templates[key].func(projectName, userName)
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

  createReactApp: (directoryName) => {
    return `cd ${directoryName} && npx create-react-app ${directoryName} && mv ${directoryName}/* . && mv ${directoryName}/.git* . && rm -rf ${directoryName}`
  },

  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  }
  
}