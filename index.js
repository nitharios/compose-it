#!/usr/bin/env node
const minimist = require('minimist');
const { dir, files } = require('./lib');
const { exec } = require('child_process');
const { createReactApp } = require('./lib/scripts');

module.exports = () => {
  const args = minimist(process.argv.slice(2))
  let cmd = args._[0];

  let userName, dirName;

  if (cmd === 'help') {
    return require('./lib/commands/help')(args);
  }

  if (args.username || args.u) {
    userName = args.username ? args.username : args.u;
  }

  if (args.project || args.d) {
    dirName = args.project ? args.project : args.d;
  }
  
  dir.createDirectory(dirName);
  files.createFiles(dirName, userName);

  exec(createReactApp(dirName), (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(stdout);
  })
}