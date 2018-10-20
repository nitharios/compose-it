module.exports = {
  createReactApp: (directoryName) => {
    return `cd ${directoryName} && npx create-react-app ${directoryName} && mv ${directoryName}/* . && mv ${directoryName}/.git* . && rm -rf ${directoryName}`
  }
}