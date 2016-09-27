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

/* GET outing. */
router.get('/outings/:magicLinkId/recs', function (req, res, next) {
  debug(`temp recommendations: are just a ${typeof recs}: ${JSON.stringify(recs, null, 2)}`)
  res.json(recs)
})
/* GET outing. */
router.get('/outing', function (req, res, next) {
  res.render('outing')
})

/* POST form submission. */
/* takes multipart form data */
router.post('/outings', upload.array(), createOuting)

/* GET an outing as JSON data. */
router.get('/outings/:outing', fetchOuting)

/* POST like for a recommendation. */
router.post('/outings/:outing/like/:placeId', function (req, res, next) {
  res.send('sunrise/sunset')
})

/* POST pass for a recommendation. */
router.post('/outings/:outing/pass/:placeId', function (req, res, next) {
  res.send('sunrise/sunset')
})

module.exports = router
