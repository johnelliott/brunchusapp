console.log('app.js is running')
import React from 'react'
import { render } from 'react-dom'
import App from './components/app'
import 'whatwg-fetch'

console.log('cards.js is running')

// This might as well come from an API...
const cards = [
  {
    'id': 1,
    'place': {
      'placeId': 1,
      'name': 'sstatic/sunset',
      'distance': '0.5mi',
      'dollarSigns': 2
    }
  },
  {
    'id': 2,
    'place': {
      'placeId': 2,
      'name': 'static skips',
      'distance': '1.7mi',
      'dollarSigns': 2
    }
  }
]
fetch(window.location.origin + '/outings/95b719bc-9a95-4526-af8e-e71f73f4fd3c/recs', {
  headers: {
    'Accept': 'application/json'
  }
})
.then(res => res.json())
.then(json => {
  console.log('THIS IS HARD_CODED DATA in react-app.js', json)
  // Horribly mutate state
  appState.cards = json
  renderApp()
})

const handlers = {
  pass: function passHandler (evt) {
    const popped = cards.pop() // take off the top card
    console.log('pass handler called', popped)
    // TODO post pass this thing
    renderApp()
  },
  like: function likeHandler (evt) {
    console.log('like handler called')
    const popped = cards.pop() // take off the top card
    console.log('like handler called', popped)
    // TODO post like this thing
    renderApp()
  }
}
var appState = { cards, handlers }

function renderApp () {
  render(<div><App {...appState} /></div>, document.getElementById('root'))
}

// Do initial render
renderApp()
