const url = require('url')
const OAuth2 = require('oauth').OAuth2

const yelpBase = {
  protocol: 'https',
  slashes: true,
  hostname: 'api.yelp.com'
}
const currentToken = {
  token: null,
  expires: null
}

// returns promise for the bearer token
function getBearer (appId, appSecret) {
  // yelp fusion v3 api...

  return new Promise(function (resolve, reject) {
    if (currentToken.token && currentToken.expires > new Date().valueOf()) {
      console.log('could have re-used token', currentToken.expires > new Date() )
      return resolve(currentToken.token)
    }
    // code, params, callback
    const oauth2 = new OAuth2(
      appId,
      appSecret,
      url.format(yelpBase),
      null,
      '/oauth2/token',
      null
    )
    oauth2.getOAuthAccessToken(
      '',
      {'grant_type': 'client_credentials'},
      function (err, accessToken, refreshToken, results) {
        if (err) reject(err)
        // set expires, 180 days according to yelp
        currentToken.expires = new Date(parseInt(results.expires_in) * 1000 + Date.now())
        currentToken.token = accessToken
        console.log('set token', currentToken)
        resolve(accessToken)
      }
    )
  })
}

module.exports = getBearer
