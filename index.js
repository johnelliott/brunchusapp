/*

This came from wb-web, needs work to function well

*/
const debug = require('debug')('brunchus:index')
const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https') // TODO use spdy, stock https to help out pouchdb for now...
const url = require('url')
const ecstatic = require('ecstatic')
const request = require('request')

const httpPort = process.env.REDIRECT_PORT || 8081
const httpsPort = process.env.PORT || 8080

// CERTPATH handy to override in development
const certPath = process.env.CERTPATH || path.join(__dirname, '/certs')

// HTTPS setup
const serverOptions = {
  cert: fs.readFileSync(certPath + '/self.crt'),
  ca: process.NODE_ENV === 'production' ? fs.readFileSync(certPath + '/chain.pem') : undefined,
  key: fs.readFileSync(certPath + '/self.key')
}

// Middlewares
const staticMiddleware = ecstatic({
  root: __dirname + '/public',
  gzip: process.env.NODE_ENV === 'production' // ecstatic will serve gz versions, otherwise fall back
})

// Server
const server = https.createServer(serverOptions, function requestHandler (req, res) {
  if (req.url.match(/\/api/)) {
    const urlParts = url.parse(req.url)
    // TODO remove hacky slice
    const apiBase = '/api'
    const urlResolved = url.resolve(apiBase, 'http://127.0.0.1:5984/data' + urlParts.path.slice(apiBase.length))
    req.pipe(request(urlResolved)).pipe(res)
  } else {
    staticMiddleware(req, res)
  }
})

// Redirect http to https
const redirectServer = http.createServer(function (req, res) {
  const redirectUrl = `https://${req.headers.host.split(':')[0]}:${httpsPort}${req.url}`
  res.writeHead(301, { 'Location': redirectUrl })
  res.end()
})

server.listen(httpsPort)
redirectServer.listen(httpPort)
debug('Server listening on https://localhost:' + httpsPort)
debug('Reditecting from  http://localhost:' + httpPort)
