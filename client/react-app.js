console.log('app.js is running')
import React from 'react'
import { render } from 'react-dom'
import App from './components/app'
import 'whatwg-fetch'

console.log('cards.js is running')

// This might as well come from an API...
const cards = []
fetch(window.location.href + '/recs', {
  headers: {
    'Accept': 'application/json'
  }
})
.then(res => res.json())
.then(json => {
  // Horribly mutate state
  appState.cards = json
  renderApp()
})

const handlers = {
  pass: function passHandler (evt) {
    appState.cards.pop() // take off the top card
    console.log('pass handler called')
    // TODO post pass this thing
    renderApp()
  },
  like: function likeHandler (evt) {
    console.log('like handler called')
    appState.cards.pop() // take off the top card
    console.log('like handler called')
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
