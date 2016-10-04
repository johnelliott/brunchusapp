const debug = require('debug')('brunch.us:server:routes')
const express = require('express')
const multer = require('multer')

const createOuting = require('./outings/create')
const fetchOuting = require('./outings/fetch')

const router = express.Router()
const upload = multer()

/* POST form submission. takes multipart form data using upload.array()  */
router.post('/outings', upload.array(), createOuting)

/* GET an outing */
router.get('/go/:outing', fetchOuting)

/* GET outing, For when we just sent and SMS to the initiating user */
router.get('/outing-NOT-IMPLEMENTED', function (req, res, next) { res.render('outing') })

module.exports = router
