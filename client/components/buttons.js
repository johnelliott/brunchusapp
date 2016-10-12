import React from 'react'

// class Card extends React.Component {
//   render () {
//     return (
//       <div className='buttons'>
//         <button onClick={this.props.passHandler} className='buttons__pass'>✖︎ Pass</button>
//         <button onClick={this.props.likeHandler} className='buttons__like'>✔ Like</button>
//       </div>
//     )
//   }
// }

const Buttons = (props) => (
  <div className='buttons'>
    <button onClick={props.passHandler} className='buttons__pass'>✖︎ Pass</button>
    <button onClick={props.likeHandler} className='buttons__like'>✔ Like</button>
  </div>
)

export default Buttons
