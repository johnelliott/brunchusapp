const url = require('url')
const fetch = require('node-fetch')
const getYelpBearerToken = require('./lib/yelp-oauth2.js')
require('dotenv').config()

const yelpBase = {
  protocol: 'https',
  slashes: true,
  hostname: 'api.yelp.com/v3'
}



// returns promise for search data
function searchYelp (token) {
  // TODO remove extra data from bearer token provider

  // combine with api defaults
  const entpointOpts = Object.assign({}, yelpBase, {
    pathname: 'businesses/search',
    query: {
      latitude: 40.697011,
      longitude: -73.935213,
      radius: 800,
      categories: 'coffee'
    }
  })
  const yelpUrl = url.format(entpointOpts)

  const requestOptions = {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  // search for things around little skips
  return fetch(yelpUrl, requestOptions)
}

if (require.main === module) {
  // Example!
  const outing = {}
  getYelpBearerToken(process.env.YELP_APP_ID, process.env.YELP_APP_SECRET)
    .then(searchYelp)
    .then(res => {
      if (res.status === 200) {
        return res.json()
      } else {
        return res.status
      }
    })
    .then(function setRecs (data) {
      outing.recs = data.businesses
      .filter(biz => biz.rating >= 3)
      .map((biz, i) => {
        return {
          id: i,
          place: {
            id: biz.id,
            name: biz.name,
            image: biz.image_url,
            dollarSigns: biz.price.length,
            distance: '0.2mi' // TODO
          }
        }
      })
      console.log(JSON.stringify(outing, null, 2))
    })
}

exports.searchYelp = searchYelp
exports.getYelpBearerToken = getYelpBearerToken
