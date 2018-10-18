const menus = {
  default: `
compose-it

Usage:
    compose-it [options] [arguments]

Options:
    -d, --project <string>
        define the project name

    help
        display help menu

    -u, --username <string>
        define the username associated with images`
}

module.exports = (args) => {
  console.log(menus.default);
}