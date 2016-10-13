import React from 'react'

const Buttons = (props) => (
  <div className='buttons'>
    <button onClick={props.buttonHandlers.pass} className='buttons__pass'>✖︎ Pass</button>
    <button onClick={props.buttonHandlers.like} className='buttons__like'>✔ Like</button>
  </div>
)

export default Buttons
