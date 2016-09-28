'use strict'

const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'client/index.js'),
  output: {
    filename: path.join(__dirname, 'public/bundle.js')
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}