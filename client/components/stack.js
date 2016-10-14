import React from 'react'
import Card from './card'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const Stack = React.createClass({
  render () {
    return (
      <div className='card-container'>
        {/* https://facebook.github.io/react/docs/jsx-spread.html#spread-attributes */ }
        <ReactCSSTransitionGroup
          transitionName='example'
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {this.props.cards.map(props => <Card className='card' ref={`card-key-${props.id}`} key={props.id} handlers={this.props.handlers} {...props.place} />)}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
})

export default Stack
