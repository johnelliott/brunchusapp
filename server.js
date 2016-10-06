const debug = require('debug')('brunch.us:server:index')
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const compression = require('compression')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

// TODO PORT, other env, and .env.test like
// https://www.twilio.com/docs/tutorials/walkthrough/server-notifications/node/express#configure-twilio-client
require('dotenv').config()

var routes = require('./routes/index')

var app = express()
app.set(path.join('views', __dirname, 'views')) // general config
app.set('view engine', 'pug')

// TODO use redis for this and not memory session store
// INFO httponly Note be careful when setting this to true, as compliant clients
// will not allow client-side JavaScript to see the cookie in document.cookie.
// INFO see https://github.com/expressjs/session#secure
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
}
// TODO handle losing redis: https://github.com/tj/connect-redis#how-do-i-handle-lost-connections-to-redis
app.use(session({
  // store: app.get('env') === 'production' ? new RedisStore({logErrors: process.env === 'development'}) : null,
  store: new RedisStore({logErrors: true}),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: app.get('env') === 'production' } // see https://github.com/expressjs/session#secure
}))
app.use(cookieParser(process.env.COOKIE_SECRET)) // see express-session note
app.use(compression())
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

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
