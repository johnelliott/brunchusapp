const debug = require('debug')('brunch.us:server:routes')
const express = require('express')
const multer = require('multer')

const createOuting = require('./outings/create')
const magicRedirect = require('./outings/magic-redirect')

const router = express.Router()
const upload = multer()

/* POST form submission. takes multipart form data using upload.array()  */
router.post('/outings', upload.array(), createOuting)

/* GET a magic link */
router.get('/go/:outing', magicRedirect)

/* GET outing, For when we just sent and SMS to the initiating user */
router.get('/outing', function (req, res, next) { res.render('outing') })

module.exports = router
