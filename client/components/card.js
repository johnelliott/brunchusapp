import React from 'react'

const Card = React.createClass({
  render () {
    return (
      <div className='card'>
        <p>I am a card named {this.props.name}</p>
        <img className="card__image" width="200" height="200" />
        <div className="card__details">
          <span>💸💸 0.5mi</span>
        </div>
      </div>
    )
  }
})

export default Card
