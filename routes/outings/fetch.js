// const fs = require('fs')
// const path = require('path')
// const crypto = require('crypto')
// const uuid = require('node-uuid')

const debug = require('debug')('brunch.us:api-service:routes:outings:fetch')
// const ip = require('ip')
const nano = require('nano')(`http://127.0.0.1:${process.env.COUCH_PORT || 5984}`)

const outings = nano.use('outings')

// responds with JSON
module.exports = function fetchOuting (req, res, next) {
  debug('request body', req.body)
  const outingId = req.params.outing
  outings.get(outingId, function (err, body) {
    if (err) {
      debug.error(err)
      next(err)
    }
    debug('COUCHDB fetched a body', body)
    // debug(`temp recommendations: are just a ${typeof recs}: ${JSON.stringify(recs, null, 2)}`)
    // res.status(200)
    // res.end(body)
  }).pipe(res)
}
