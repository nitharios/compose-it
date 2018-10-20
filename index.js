const minimist = require('minimist');
const { exec } = require('child_process');
const { directoryExists, help } = require('./lib/responses');
const { checkPath, createDirectory, createFiles, createReactApp } = require('./lib/scripts');

module.exports = () => {
  const args = minimist(process.argv.slice(2))
  let cmd = args._[0];

  let userName, dirName;

  if (cmd === 'help') {
    return help(args);
  }

  if (args.username || args.u) {
    userName = args.username ? args.username : args.u;
  }

  if (args.project || args.d) {
    if (checkPath(args.project)) {
      return directoryExists(args.project);
    } else if (checkPath(args.d)) {
      return directoryExists(args.d);
    }

    dirName = args.project ? args.project : args.d;
  }
  
  createDirectory(dirName);
  createFiles(dirName, userName);

  exec(createReactApp(dirName), (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      
      return;
    }

    console.log(stdout);
    console.log(`Successfully created project ${dirName}`);
  
  })
}