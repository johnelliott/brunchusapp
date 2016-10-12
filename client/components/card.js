import React from 'react'

class Card extends React.Component {
  constructor () {
    super()

    this.state = {}
    this.state.cardBCR = null
    this.state.startX = null // Position on screen where user starts interacting
    this.state.currentX = null // Position of the element within the animations, The startX minus currentX is how far we need to transform the card overall
    this.state.isDraggingCard = false // Whether or not the card is being dragged by the user
    this.state.screenX = null // The position of the card on the screen
    this.state.cardX = 0 // Animation end goal position
  }
  render () {
    return (
      <div className='card'>
        <p>{this.props.name}</p>
        <img className="card__image" width="200" height="200" />
        <div className="card__details">
          <span>
            {Array(this.props.dollarSigns + 1).join('💸')} {this.props.distance}
          </span>
        </div>
      </div>
    )
  }
}

export default Card
