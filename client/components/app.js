// TODO eventually copy this into ../cards.js and replace that file
require('../cards.scss')

import React from 'react'
import Stack from './stack'
import Buttons from './buttons'

// Compose buttons and cards
const App = React.createClass({
  render () {
    return (<div className='container'>
      <Stack {...this.props} />
      <Buttons {...this.props} />
    </div>)
  }
})

export default App
