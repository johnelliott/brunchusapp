// TODO eventually copy this into ../cards.js and replace that file

require('../cards.scss')

import React from 'react'
import { render } from 'react-dom'

import Stack from './stack'

console.log('cards.js is running')

// This might as well come from an API...
const recs = [
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
render(<div><Stack cards={recs}/></div>, document.getElementById('root'))
