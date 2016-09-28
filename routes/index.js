const debug = require('debug')('brunch.us:api-service:routes')
const express = require('express')
const multer = require('multer')
const request = require('request')
const createOuting = require('./outings/create')
const fetchOuting = require('./outings/fetch')

const router = express.Router()
const upload = multer()

// proxy to couchdb if the request warrants it
router.use(function couchDBDirectMiddleware (req, res, next) {
  // if (req.acceptsEncodings('application/json'))
  if (req.accepts('application/json')) {
    debug(`this is totaly proxyable to couchdb accepts: ${req.accepts('application/json')} is: ${req.is('application/json')}`)
    req.pipe(request(`http://127.0.0.1:${process.env.COUCH_PORT}${req.path}`)).pipe(res)
  } else {
    next()
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
  // res.render('outing', {parties: ['yolo', 'trolo']})
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
