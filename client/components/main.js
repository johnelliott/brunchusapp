// TODO eventually copy this into ../cards.js and replace that file

require('../cards.scss')

import React from 'react'
import { render } from 'react-dom'

import Stack from './stack'

console.log('cards.js is running')

export default 'hello'

render(<div><Stack className='container' /></div>, document.getElementById('root'))
