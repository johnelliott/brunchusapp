import React from 'react'
import Card from './card'

const Stack = React.createClass({
  render () {
    return (
      <div className='card-container'>
        {/* https://facebook.github.io/react/docs/jsx-spread.html#spread-attributes */ }
        {this.props.cards.map(props => <Card className='card' key={props.id} {...props.place} />)}
      </div>
    )
  }
})

export default Stack
