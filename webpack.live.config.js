'use strict'
const webpack = require('webpack')

const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    // http://webpack.github.io/docs/multiple-entry-points.html
    form: path.join(__dirname, 'client/index.js'),
    cards: path.join(__dirname, 'client/cards.js'),
    style: path.join(__dirname, 'client/style.js')
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js'
  },
  devtool: 'source-map',
  // Use the plugin to create page-specific css files built by require in via javascript and link tags in .html and .pug views
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new webpack.HotModuleReplacementPlugin() // perhaps this is best to do on CLI with --hot
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!sass-loader?sourceMap")
      }
    ]
  }
}
