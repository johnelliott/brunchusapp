console.log('app.js is running')
import React from 'react'
import { render } from 'react-dom'
import App from './components/app'

console.log('cards.js is running')

// This might as well come from an API...
const cards = [
  {
    'id': 1,
    'place': {
      'placeId': 1,
      'name': 'sunrise/sunset',
      'distance': '0.5mi',
      'dollarSigns': 2
    }
  },
  {
    'id': 2,
    'place': {
      'placeId': 2,
      'name': 'little skips',
      'distance': '0.7mi',
      'dollarSigns': 2
    }
  }
]

const handlers = {
  pass: function passHandler (evt) {
    console.log('pass handler called')
    cards.pop() // take off the top card
    // TODO post like this thing
    renderApp()
  },
  like: function likeHandler (evt) {
    console.log('like handler called')
    cards.pop() // take off the top card
    // TODO post like this thing
    renderApp()
  }
}
const appProps = { cards, handlers }

function renderApp () {
  render(<div><App {...appProps} /></div>, document.getElementById('root'))
}

renderApp()
