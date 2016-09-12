/*

This came from wb-web, needs work to function well

*/
var debug = require('debug')('brunchus:index')
var fs = require('fs')
var http = require('http')
var https = require('https') // TODO use spdy, stock https to help out pouchdb for now...
var url = require('url')
var ecstatic = require('ecstatic')
var request = require('request')

var httpPort = process.env.REDIRECT_PORT || 8081
var httpsPort = process.env.PORT || 8080

// CERTPATH handy to override in development
var certPath = process.env.CERTPATH || __dirname + '/certs'

// HTTPS setup
var serverOptions = {
  cert: fs.readFileSync(certPath + '/self.crt'),
  ca: process.NODE_ENV === 'production' ? fs.readFileSync(certPath + '/chain.pem') : undefined,
  key: fs.readFileSync(certPath + '/self.key')
}

// Middlewares
var staticMiddleware = ecstatic({
  root: __dirname + '/public',
  gzip: process.env.NODE_ENV === 'production' // ecstatic will serve gz versions, otherwise fall back
})

// Server
var server = https.createServer(serverOptions, function requestHandler (req, res) {
  if (req.url.match(/\/api/)) {
    var urlParts = url.parse(req.url)
    // TODO remove hacky slice
    var apiBase = '/api'
    var urlResolved = url.resolve(apiBase, 'http://127.0.0.1:5984/data' + urlParts.path.slice(apiBase.length))
    req.pipe(request(urlResolved)).pipe(res)
  } else {
    staticMiddleware(req, res)
  }
})

// Redirect http to https
var redirectServer = http.createServer(function (req, res) {
  const redirectUrl = `https://${req.headers.host.split(':')[0]}:${httpsPort}${req.url}`
  res.writeHead(301, { 'Location': redirectUrl })
  res.end()
})

server.listen(httpsPort)
redirectServer.listen(httpPort)
debug('Server listening on https://localhost:' + httpsPort)
debug('Reditecting from  http://localhost:' + httpPort)
