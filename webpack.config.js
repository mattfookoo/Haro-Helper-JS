const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: './src/client/index.js',
  output: {
    filename: '.dist/main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};