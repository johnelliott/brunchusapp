import React from 'react'

const Card = React.createClass({
  render () {
    return (
      <div className='buttons'>
        <button onClick={this.props.passHandler} className='buttons__pass'>✖︎ Pass</button>
        <button onClick={this.props.likeHandler} className='buttons__like'>✔ Like</button>
      </div>
    )
  }
})

export default Card
