'use strict'

const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    // http://webpack.github.io/docs/multiple-entry-points.html
    form: path.join(__dirname, 'client/form.js'),
    cards: path.join(__dirname, 'client/cards.js'),
    app: path.join(__dirname, 'client/react-app.js'),
    style: path.join(__dirname, 'client/style.scss')
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js'
  },
  devtool: 'source-map',
  // Use the plugin to create page-specific css files built by require in via javascript and link tags in .html and .pug views
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  module: {
    loaders: [
      // // TODO see if it's worth it to have a seperate loader section for other things and not reactify everything
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   include: [
      //     path.resolve(__dirname, 'client', 'components')
      //   ],
      //   loader: 'babel-loader?presets[]=react,presets[]=es2015'
      // },
      {
        test: /\.js$/,
        // exclude: ['/node_modules/', path.resolve(__dirname, 'client', 'components')],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader?sourceMap')
      }
    ]
  }
}
