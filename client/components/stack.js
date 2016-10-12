import React from 'react'
import Card from './card'

const Stack = React.createClass({
  render () {
    return (
      <div className='card-container'>
        {this.props.cards.map(props => <Card className='card' key={props.id} {...props.place} />)}
      </div>
    )
  }
})

export default Stack
