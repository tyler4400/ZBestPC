const path = require('node:path');

module.exports = {
  mode: "development",
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  }
}
