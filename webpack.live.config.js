'use strict'

require('dotenv').config()
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const CURRENT_IP = require('ip').address()

module.exports = {
  entry: {
    // http://webpack.github.io/docs/multiple-entry-points.html
    form: path.join(__dirname, 'client/index.js'),
    cards: path.join(__dirname, 'client/cards.js'),
    app: path.join(__dirname, 'client/react-app.js'),
    style: path.join(__dirname, 'client/style.js')
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js'
  },
  devServer: {
    // progress: true,
    hot: true,
    inline: true,
    // https: true,
    host: CURRENT_IP,
    port: process.env.HOT_PORT || 8000,
    contentBase: path.resolve(__dirname, 'public'),
    proxy: {
      // https://github.com/nodejitsu/node-http-proxy#options
      '!/**/*.{css,js,hot-update.json}': {
        target: 'http://localhost:3000',
        secure: false
        // changeOrigin: false,
        // hostRewrite: true,
        // autoRewrite: true,
        // localAddress: CURRENT_IP
      }
    }
  },
  devtool: 'source-map',
  // Use the plugin to create page-specific css files built by require in via javascript and link tags in .html and .pug views
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.HotModuleReplacementPlugin() // perhaps this is best to do on CLI with --hot
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // see error in webpack that tells us to use 'react-hot-loader/webpack'
        loaders: ['react-hot-loader/webpack', 'babel-loader?presets[]=react,presets[]=es2015']
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader?sourceMap')
      }
    ]
  }
}
