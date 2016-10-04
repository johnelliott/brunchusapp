// const fs = require('fs')
// const path = require('path')
// const crypto = require('crypto')
// const uuid = require('node-uuid')

const debug = require('debug')('brunch.us:server:routes:outings:fetch')
// const ip = require('ip')
const nano = require('nano')(`http://127.0.0.1:${process.env.COUCH_PORT}`)

const outings = nano.use('outings')

// responds with JSON
module.exports = function fetchOuting (req, res, next) {
  debug('request body', req.body)
  const magicLinkId = req.params.outing
  console.log(`magicLinkId ${magicLinkId}`)
  // TODO check request type and serce as page or JSON

  // /outings/_design/findOuting/_view/byMagicLink
  outings.view('findOuting', 'byMagicLink', {reduce: false, key: magicLinkId}, function (err, body) {
    if (err) {
      debug.error(err)
      next(err)
    }
    debug('COUCHDB fetched a body', body)
    // debug(`temp recommendations: are just a ${typeof borecs}: ${JSON.stringify(recs, null, 2)}`)
    res.status(200)
    res.render('outing', {
      data: JSON.stringify(body.rows[0].value.createdAt, null, 2)
    })
  })
}
