module.exports = {
  directoryExists: (dirName) => {
    console.log(`compose-it ERROR: directory ${dirName} already exists!`)
  },
  help: (args) => {
    console.log(`
compose-it

Usage:
  compose-it [options] [arguments]

Options:
  -d, --project <string>
    define the project name

    help
      display help menu

  -u, --username <string>
    define the username associated with images`);
  }
}