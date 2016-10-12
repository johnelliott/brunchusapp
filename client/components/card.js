import React from 'react'

const Card = React.createClass({
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
})

export default Card
