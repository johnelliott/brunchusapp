const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const uuid = require('node-uuid')

const debug = require('debug')('brunch.us:server:routes:outings:create')
const ip = require('ip')
const nano = require('nano')(`http://127.0.0.1:${process.env.COUCH_PORT || 5984}`)
const sendSms = require(path.join(__dirname, '..', '..', 'lib/send-twilio-sms.js'))

const outings = nano.use('outings')

const smsLinkHost = `${process.env.ENV === 'development' ? ip.address() : process.process.env.DOMAIN_NAME}:${process.env.PORT || 3000}`
const validUsPhone = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})$/

const recs = JSON.parse(fs.readFileSync(`lib/recommendations.json`))

module.exports = function createOuting (req, res, next) {
  debug('request body', req.body)
  // debug('typeof request body', typeof req.body)
  const validPhoneList = req.body.phone.filter(p => p.match(validUsPhone))
  if (validPhoneList.length === 0) {
    throw new Error('no phone numbers were valid')
  }
  debug('valid phone numbers to send SMSes to:', validPhoneList)

  const outingId = uuid.v4()
  const parties = []
  for (let phone in validPhoneList) {
    debug(`doing stuff for ${phone}`)
    debug(`made link ${outingId}`)
    parties.push({phone, magicLinkId: outingId}) // no way to tell who's who for now
    // TODO async send out the SMS messages and redirect the outing initiator
    // For now, send everyone an SMS
    sendSms(phone, `🍳 Let's go to brunch! http://${smsLinkHost}/outings/${outingId}`)
  }
  outings.insert({ parties, recs, createdAt: new Date().toISOString() }, outingId, function (err, body) {
    if (err) {
      debug.error(err)
      next(err)
    }
    debug('COUCHDB request body', body)
    // debug(`temp recommendations: are just a ${typeof recs}: ${JSON.stringify(recs, null, 2)}`)
    res.status(201)
    res.end('ok this is the resoonse of making an outing')
  })
}
