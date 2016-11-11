const createTwilioClient = require('twilio')
const debug = require('debug')('brunch.us:send-twilio-sms')

// Twilio Credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioNumber = process.env.TWILIO_NUMBER

if (!accountSid || !authToken || !twilioNumber) {
  throw new Error('Twilio ENV not configured. TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_NUMBER must be set.')
}

// Create a REST client
const client = createTwilioClient(accountSid, authToken)

module.exports = function sendTwilioSms (number, messageBody) {
  debug(`number: ${number}, messageBody: ${messageBody}`)
  debug('THERE IS IS ONLY SENDING TO JOHNS PHONE HACK IN HEREREEEEEEEE')
  client.messages.create({
    to: `+1${process.env.ENV === 'development' ? process.env.MYPHONE : number}`,
    from: twilioNumber,
    body: messageBody
  }, function (err, message) {
    if (err) throw err
    debug(`Twilio sid: ${message.sid}`)
  })
}
