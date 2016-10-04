'use strict'

const path = require('path')

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
