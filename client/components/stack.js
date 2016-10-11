import React from 'react'
import Card from './card'

const Stack = React.createClass({
  render () {
    return (
      <div className='card-container'>
        <h1>Stack...</h1>
        {['yo', 'wat', 'hey']
        .map(word => <Card className='card' key={word} name={word} />)}
      </div>
    )
  }
})

export default Stack
