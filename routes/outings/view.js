const debug = require('debug')('brunch.us:server:routes:outings:view')
// const ip = require('ip')
const nano = require('nano')(`http://127.0.0.1:${process.env.COUCH_PORT}`)

const outings = nano.use('outings')

// gets the outing from a magic link and redirects
module.exports = function fetchOuting (req, res, next) {
  debug('request body', req.body)
  debug('what is session!>!>>!>!>', req.session)
  const outingId = req.params.outing
  // TODO check request type and serce as page or JSON

  // /outings/_design/findOuting/_view/byMagicLink
  outings.get(outingId, function (err, body) {
    if (err) {
      debug('Error: ' + err)
      next(err)
    }
    debug('COUCHDB fetched a body', body)
    // debug(`temp recommendations: are just a ${typeof borecs}: ${JSON.stringify(recs, null, 2)}`)
    // data: JSON.stringify(body.rows[0].value.createdAt, null, 2)
    res.status(200)
    res.render('cards', {data: body})
  })
}
