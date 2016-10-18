import React from 'react'

const Buttons = (props) => (
  <div className='buttons'>
    <button onClick={props.handlers.pass} className='buttons__pass'>Pass</button>
    <button onClick={props.handlers.like} className='buttons__like'>Like</button>
  </div>
)
// Prop validation
// https://facebook.github.io/react/docs/reusable-components.html#prop-validation
Buttons.propTypes = {
  handlers: React.PropTypes.shape({
    pass: React.PropTypes.func,
    like: React.PropTypes.func
  })

}
export default Buttons
