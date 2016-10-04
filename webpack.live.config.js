'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: path.join(__dirname, 'client/index.js'),
  output: {
    filename: path.join(__dirname, 'public/bundle.js')
  },
  devServer: {
    proxy: {
      '*': {
        target: 'http://localhost:3000',
        secure: false
      }
    },
    contentBase: 'public',
    inline: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()], // perhaps this is best to do on CLI with --hot
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
