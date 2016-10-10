const debug = require('debug')('brunch.us:server:routes:outings:recs')
const nano = require('nano')(`http://127.0.0.1:${process.env.COUCH_PORT}`)

const outings = nano.use('outings')

// gets the outing from a magic link and redirects
module.exports = function fetchOuting (req, res, next) {
  const outingId = req.params.outing
  // TODO check request headers for content type and accepts etc and error out otherwise
  console.log('JSON requested', req.get('accept') === 'application/json')

  // /outings/_design/findOuting/_view/byMagicLink
  outings.get(outingId, function (err, body) {
    if (err) {
      debug('Error: ' + err)
      next(err)
    }
    debug('COUCHDB fetched a body', body)
    // TODO make a couch view just for recs so we don't waste bytes, or does it matter inside the server box?
    res.json(body.recs)
  })
}
