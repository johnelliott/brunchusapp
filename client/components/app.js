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
const buttonHandlers = {
  pass: function passHandler (evt) { console.log('pass button handler called') },
  like: function likeHandler (evt) {
    console.log('like button handler called')
    // 1 is the top card of two... this is just temporary
    const topCard = document.getElementsByClassName('card')[1]
    topCard.style.transform = "translateX(200px) rotate(5deg)"
    setTimeout(function() {
      topCard.style.transform = "none"
    }, 1500)
  }
}
const appProps = { cards, buttonHandlers }

const App = React.createClass({
  render() {
    return (<div className='container'>
      <Stack {...this.props} />
      <Buttons {...this.props} />
    </div>)
  }
})

render(<div><App {...appProps} /></div>, document.getElementById('root'))

export default App
