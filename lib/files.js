const fs = require('fs');
const path = require('path');

module.exports = {
  createFiles: (projectName, userName) => {
    try {
      const templates = require('./templates');

      for (const key in templates) {
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

  directoryExists: (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },

  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  }
}