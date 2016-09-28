const debug = require('debug')('brunch.us:api-service:index')
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const compression = require('compression')

// TODO PORT, other env, and .env.test like
// https://www.twilio.com/docs/tutorials/walkthrough/server-notifications/node/express#configure-twilio-client
require('dotenv').config()

var routes = require('./routes/index')

var app = express()
app.set(path.join('views', __dirname, 'views')) // general config
app.set('view engine', 'pug')

app.use(compression())
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET)) // see express-session note
app.use(express.static(path.join(__dirname, 'public')))

// TODO stick session middleware in here
// TODO stick auth middleware in here?

app.use('/', routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    debug('dev error handler', err)
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      statusCode: err.status,
      err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
