const path = require('path')
const crypto = require('crypto')
const uuid = require('node-uuid')

const debug = require('debug')('brunch.us:server:routes:outings:create')
const ip = require('ip')
const nano = require('nano')(`http://127.0.0.1:${process.env.COUCH_PORT || 5984}`)
const yelp = require('../../yelp-req.js') // TODO make this les ugly
const sendSms = require(path.join(__dirname, '..', '..', 'lib/send-twilio-sms.js'))

const outings = nano.use('outings')

// Data we'll need to respond
const smsLinkHost = `${process.env.ENV === 'development' ? ip.address() : process.process.env.DOMAIN_NAME}:${process.env.PORT || 3000}`
const validUsPhone = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})$/

module.exports = function createOuting (req, res, next) {
  debug('request body', req.body)
  // debug('typeof request body', typeof req.body)
  const validPhoneList = req.body.phone.filter(p => p.match(validUsPhone))
  if (validPhoneList.length === 0) {
    throw new Error('no phone numbers were valid')
  }
  debug('valid phone numbers to send SMSes to:', validPhoneList)

  // form the outing created by the request
  const outing = {
    outingId: uuid.v4(),
    createdAt: new Date().toISOString(),
    parties: [],
    recs: []
  }


  // Create magic links and send messages to the parties involved
  for (let i in validPhoneList) {
    const phoneNumber = validPhoneList[i]
    debug(`doing stuff for ${phoneNumber}`)
    // TODO get non-colliding thing here
    const magicLinkId = crypto.randomBytes(4).toString('hex')
    debug(`made link ${magicLinkId}`)
    outing.parties.push({phoneNumber, magicLinkId}) // no way to tell who's who for now
    // TODO async send out the SMS messages and redirect the outing initiator
    // For now, send everyone an SMS
    sendSms(phoneNumber, `🍳 Let's go to brunch! http://${smsLinkHost}/go/${magicLinkId}`)
  }

  yelp.getYelpBearerToken(process.env.YELP_APP_ID, process.env.YELP_APP_SECRET)
    .then(yelp.searchYelp)
    .then(res => {
      if (res.status === 200) {
        return res.json()
      } else {
        return res.status
      }
    })
    .then(function setRecs (data) {
      outing.recs = data.businesses
      .filter(biz => (biz.rating >= 3.3 && !biz.id.match(/Dunkin/i)))
      .map((biz, index) => {
        return {
          id: index,
          place: {
            id: biz.id,
            name: biz.name,
            image: biz.image_url,
            dollarSigns: biz.price.length,
            distance: '0.2mi' // TODO
          }
        }
      })
      debug(JSON.stringify(outing, null, 2))
      outings.insert(outing, outing.outingId, function (err, body) {
        if (err) {
          debug(err)
          next(err)
        }
        debug('COUCHDB request body', body)
        // debug(`temp recommendations: are just a ${typeof recs}: ${JSON.stringify(recs, null, 2)}`)
        res.status(201)
        res.end('ok this is the resoonse of making an outing')
      })
    })
}
