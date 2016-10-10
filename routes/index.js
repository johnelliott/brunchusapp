const debug = require('debug')('brunch.us:server:routes')
const express = require('express')
const multer = require('multer')

const createOuting = require('./outings/create')
const viewOuting = require('./outings/view')
const getRecs = require('./outings/get-recs')
const magicRedirect = require('./outings/magic-redirect')

const router = express.Router()
const upload = multer()

/* GET form page */
router.get('/', function (req, res, next) { res.render('form') })

/* POST form submission. takes multipart form data using upload.array()  */
router.post('/outings', upload.array(), createOuting)

/* GET a magic link */
router.get('/go/:magicLink', magicRedirect)

/* GET outing, For when we just sent and SMS to the initiating user */
// TODO rename all this stuff checkSMS
router.get('/outing', function (req, res, next) { res.render('outing') })

/* GET an outing by id, For when we just sent and SMS to the initiating user */
router.get('/outings/:outing', viewOuting)

/* GET recommendations for an outing */
router.get('/outings/:outing/recs', getRecs)

module.exports = router
