'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    // http://webpack.github.io/docs/multiple-entry-points.html
    form: path.join(__dirname, 'client/index.js'),
    app: path.join(__dirname, 'client/cards.js')
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js'
  },
  plugins: [new webpack.HotModuleReplacementPlugin()], // perhaps this is best to do on CLI with --hot
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
