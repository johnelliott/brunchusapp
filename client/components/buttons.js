import React from 'react'

const Buttons = (props) => (
  <div className='buttons'>
    <button onClick={props.handlers.pass} className='buttons__pass'>✖︎ Pass</button>
    <button onClick={props.handlers.like} className='buttons__like'>✔ Like</button>
  </div>
)

export default Buttons
