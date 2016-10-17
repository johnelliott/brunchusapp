const url = require('url')
const OAuth2 = require('oauth').OAuth2

const yelpBase = {
  protocol: 'https',
  slashes: true,
  hostname: 'api.yelp.com'
}

function getBearer(appId, appSecret) {
  // yelp fusion v3 api...
  const oauth2 = new OAuth2(
    appId,
    appSecret,
    url.format(yelpBase),
    null,
    '/oauth2/token',
    null
  )

  return new Promise(function (accept, reject) {
    // code, params, callback
    oauth2.getOAuthAccessToken(
      '',
      {'grant_type': 'client_credentials'},
      function(err, accessToken, refreshToken, results) {
        if (err) reject(err)
        console.log('bearer', accessToken, refreshToken)
        console.log('results', results)
        accept({accessToken, refreshToken, results})
      }
    )
  })
}

module.exports = getBearer
//.then(args => args.results.access_token)
