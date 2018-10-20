module.exports = {
  createReactApp: (directoryName) => {
    return `cd ${directoryName} && npx create-react-app ${directoryName} && mv ${directoryName}/* . && rm -rf ${directoryName}`
  }
}