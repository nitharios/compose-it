const minimist = require('minimist');
const { exec } = require('child_process');
const { directoryExists, help } = require('./lib/responses');
const { checkPath, createDirectory, createFiles, createReactApp } = require('./lib/scripts');

module.exports = () => {
  const args = minimist(process.argv.slice(2))
  let cmd = args._[0];
  let userName, dirName;
  
  // protect against missing arguments
  if (cmd === 'help' || cmd) {
    return help(args);
  }

  if (args.username && typeof args.username === 'string' || args.u && typeof args.u === 'string') {
    userName = args.username ? args.username : args.u;
  } else {
    return help(args);
  }

  if (args.project && typeof args.project === 'string' || args.d && typeof args.d === 'string') {
    if (checkPath(args.project)) {
      return directoryExists(args.project);
    } else if (checkPath(args.d)) {
      return directoryExists(args.d);
    }

    dirName = args.project ? args.project : args.d;
  } else {
    return help(args);
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