const fs = require('fs');
const path = require('path');
const {
  exec
} = require('child_process');

const templates = require('../templates');

module.exports = {
  createDirectory: (dirName) => {
    try {
      fs.mkdirSync(dirName);

    } catch (err) {
      console.log(err);
      return false;
    }

    console.log(`Successfully created directory ${dirName}!`);
    
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

    console.log(`Successfully created docker & docker-compose files!`);
    
  },

  checkPath: (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },

  createReactApp: (dirName, lastCommand) => {
    const cra_command = `cd ${dirName} && npx create-react-app ${dirName} && mv ${dirName}/* . && mv ${dirName}/.git* . && rm -rf ${dirName}`

    console.log(`Executing Create-React-App module...`);
    
    return exec(cra_command, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log(stdout);
      console.log(`Successfully installed Create-React-App!`);

      if (lastCommand === true) {
        console.log(`Project creation successful!`);
      }
    })
  },

  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  }
  
}