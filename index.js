const { dir, files } = require('./lib');
const [, , ...args] = process.argv;

const run = async () => {
  const dirName = args[0];
  const userName = args[1];
  
  dir.createDirectory(dirName);
  files.createFiles(dirName, userName);
}

run();