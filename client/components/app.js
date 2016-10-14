// TODO eventually copy this into ../cards.js and replace that file

require('../cards.scss')

import React from 'react'
import { render } from 'react-dom'

import Stack from './stack'
import Buttons from './buttons'

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

const App = React.createClass({
  render () {
    return (<div className='container'>
      <Stack {...this.props} />
      <Buttons {...this.props} />
    </div>)
  }
})

function renderApp () {
  render(<div><App {...appProps} /></div>, document.getElementById('root'))
}

renderApp()
export default App
