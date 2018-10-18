const minimist = require('minimist');

const { dir, files } = require('./lib');

const run = async () => {
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
}

run();