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
  likeHandler: function likeHandler (evt) { console.log('button handler called', evt) },
  passHandler: function passHandler (evt) { console.log('button handler called', evt) }
}
const topLevelProps = { cards, buttonHandlers }

render(<div className='container'>
  <Stack {...topLevelProps} />
  <Buttons {...buttonHandlers} />
</div>, document.getElementById('root'))
