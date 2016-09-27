const fs = require('fs')
// const crypto = require('crypto')
const express = require('express')
const multer = require('multer')
const debug = require('debug')('brunch.us:api-service:routes')
const createOuting = require('./outings/create')
const fetchOuting = require('./outings/fetch')

const router = express.Router()
const upload = multer()

const recs = JSON.parse(fs.readFileSync(`lib/recommendations.json`))

const url = require('url')
const request = require('request')

// proxy to couchdb if the request warrants it
router.use(function couchDBDirectMiddleware (req, res, next) {
  // if (req.acceptsEncodings('application/json'))
  if (req.accepts('application/json')) {
    debug('this is totaly proxyable to couchdb')
    if (req.url.match(/\/api/)) {
      const urlParts = url.parse(req.url)
      const apiBase = '/api'
      const urlResolved = url.resolve(apiBase, `http://127.0.0.1:${process.env.COUCH_PORT}${urlParts.path.slice(apiBase.length)}`)
      // req.headers.set('')
      req.pipe(request(urlResolved)).pipe(res)
    } else {
      next()
    }
  }
})

/* POST form submission. */
/* takes multipart form data */
router.post('/outings', upload.array(), createOuting)

/* GET an outing as JSON data. */
router.get('/outings/:outing', fetchOuting)

/* GET outing page. */
/* GET outing. */
router.get('/outing', function (req, res, next) {
  res.render('outing', {parties: ['yolo', 'wegotyou']})
})

// router.get('/outings/:magicLinkId/recs', function (req, res, next) {
//   debug(`temp recommendations: are just a ${typeof recs}: ${JSON.stringify(recs, null, 2)}`)
//   res.render('outing', {parties: 'yolo', 'trolo'})
// })

/* POST like for a recommendation. */
// router.post('/outings/:outing/like/:placeId', function (req, res, next) {
//   res.send('sunrise/sunset')
// })

/* POST pass for a recommendation. */
// router.post('/outings/:outing/pass/:placeId', function (req, res, next) {
//   res.send('sunrise/sunset')
// })

module.exports = router
