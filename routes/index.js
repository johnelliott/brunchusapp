// const url = require('url')
// const path = require('path')
// const request = require('request')
const fs = require('fs')
const crypto = require('crypto')
const express = require('express')
const multer = require('multer')
const ip = require('ip')
const debug = require('debug')('brunch.us:api-service:routes')
const sendSms = require('../lib/send-twilio-sms.js')
const nano = require('nano')('http://localhost:5984')

const router = express.Router()
const upload = multer()
const outings = nano.use('outings')
const validUsPhone = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})$/
const recs = JSON.parse(fs.readFileSync(`lib/recommendations.json`))
debug(`temp recommendations: are just a ${typeof recs}: ${JSON.stringify(recs, null, 2)}`)

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('hello world')
})
/* POST form submission. */
router.post('/my-handling-form-page', upload.array(), function (req, res, next) {
  debug('request body', req.body)
  debug('typeof request body', typeof req.body)
  const validPhoneList = req.body.phone.filter(function (el, i, arr) {
    return el.match(validUsPhone)
  })
  if (validPhoneList.length === 0) {
    throw new Error('no phone numbers were valid')
  }
  debug('valid phone numbers to send SMSes to:', validPhoneList)

  const parties = []
  for (let phone in validPhoneList) {
    debug(`doing stuff for ${phone}`)
    const magicLinkId = crypto.randomBytes(4).toString('hex')
    debug(`made link ${magicLinkId}`)
    parties.push({phone, magicLinkId})

    // TODO this seems fishy
    const smsLinkHost = process.env.ENV === 'development' ? ip.address() : process.process.env.DOMAIN_NAME
    // TODO async send out the SMS messages and redirect the outing initiator
    // For now, send everyone an SMS
    sendSms(phone, `Let's go to brunch! http://${smsLinkHost}/outings/${magicLinkId}`)
  }
  outings.insert({ parties, recs })

  // request.post(`http://127.0.0.1:5984/outings/`, {parties: validPhoneList})
  // res.redirect(`/outings/${linkHashes[0]}`)
})

/* GET recommendations for an outing. */
// Do I even need /users/:user if I have sessions? I should know the user....
/* Sample response:
  [
    {
      id: 1,
      place: {
        placeId: 1,
        name: 'sunrise/sunset',
        dollarSigns: 2,
        images: [],
        description: 'a fun hipster joint for coffee and small bites'
      }
    },
    {
      id: 2,
      place: {
        placeId: 2,
        name: 'little skips',
        dollarSigns: 2,
        images: [],
        description: 'a fun hipster joint for coffee and small bites'
      }
    }
  ]
 */
router.get('/outings/:outing/users/:user/recs', function (req, res, next) {
  res.json([
    {
      id: 1,
      place: {
        placeId: 1,
        name: 'sunrise/sunset',
        dollarSigns: 2,
        images: [],
        description: 'a fun hipster joint for coffee and small bites'
      }
    },
    {
      id: 2,
      place: {
        placeId: 2,
        name: 'little skips',
        dollarSigns: 2,
        images: [],
        description: 'a fun hipster joint for coffee and small bites'
      }
    }
  ])
})

/* POST like for a recommendation. */
router.post('/like/:placeId', function (req, res, next) {
  res.send('sunrise/sunset')
})

/* POST pass for a recommendation. */
router.post('/pass/:placeId', function (req, res, next) {
  res.send('sunrise/sunset')
})

module.exports = router
