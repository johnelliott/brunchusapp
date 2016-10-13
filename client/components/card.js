import React from 'react'
import ReactDOM from 'react-dom'

class Card extends React.Component {
  constructor () {
    super()

    // because this is an ES6 class, bind this.method to the instance instead of the class
    this.onStart = this.onStart.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.onMove = this.onMove.bind(this)
    this.updatePosition = this.updatePosition.bind(this)
    // this.moveCardAway = this.moveCardAway.bind(this)

    // the plan here is to maintain state for only this card,
    // then dispatch an action when we need to remove it,
    // and remove it by key name
    this.state = {}
    this.state.cardBCR = null
    this.state.startX = null // Position on screen where user starts interacting
    this.state.currentX = null // Position of the element within the animations, The startX minus currentX is how far we need to transform the card overall
    this.state.isDraggingCard = false // Whether or not the card is being dragged by the user
    this.state.screenX = null // The position of the card on the screen
    this.state.cardX = 0 // Animation end goal position
  }
  componentDidMount () {
    this.addEventListeners()
  }
  addEventListeners () {
    // These might need to be in reference to the backing instance....
    // or it might just work
    document.addEventListener('mousedown', this.onStart)
    document.addEventListener('mousemove', this.onMove)
    document.addEventListener('mouseup', this.onEnd)

    document.addEventListener('touchstart', this.onStart)
    document.addEventListener('touchmove', this.onMove)
    document.addEventListener('touchend', this.onEnd)
    // document.addEventListener('touchcancel', this.onEnd)
    // TODO remove event listeners on unmount
  }
  onStart (evt) {
    console.log('onStart called')
    // Ignore clicks outside a card
    if (!getCardNode(evt.target)) {
      return
    }
    function getCardNode (node) {
      if (node.matches('.card')) {
        return true
      } else if (node.matches('body')) {
        return false
      } else {
        return getCardNode(node.parentElement)
      }
    }

    window.requestAnimationFrame(this.updatePosition)

    const thisNode = ReactDOM.findDOMNode(this)
    // console.log('thisNode', thisNode)

    // TODO Add/trigger network side-effects here

    this.state.cardBCR = thisNode.getBoundingClientRect()
    // console.log('this.state.cardBCR', this.state.cardBCR)

    this.state.startX = evt.pageX || evt.touches[0].pageX
    this.state.currentX = this.state.startX

    this.state.isDraggingCard = true
    // Put the card on it's own layer for better rendering performance
    thisNode.style.willChange = 'transform'
    // prevent onMove throttling in chrome
    evt.preventDefault()
  }
  onMove (evt) {
    this.state.currentX = evt.pageX || evt.touches[0].pageX
    // console.log('onMove called', this.state.currentX)
  }
  onEnd (evt) {
    // TODO ....
    // console.log('onEnd called')
    this.state.isDraggingCard = false
  }
  updatePosition (evt) {
    // TODO
    if (this.state.isDraggingCard) {
      window.requestAnimationFrame(this.updatePosition)
    }
    console.log('updatePosition called')
  }


  // moveCardAway (evt) {
  //   // get BCR because we don't have any
  //   this.state.cardBCR = this.getBoundingClientRect()
  //   console.log('getBoundingClientRect BCR', this.state.cardBCR)
  //   const moveDistance = thisBCR.left + (thisBCR.width / 2)
  //   const rotationDegrees = moveDistance / 40
  //   // TODO don't rely on the button class name!
  //   const didLike = evt.target.className === 'buttons__like'
  //
  //   // TODO Add/call/fire network side-effects here (e.g. Fetch/POST)
  //
  //   this.style.willChange = 'transform'
  //   this.style.transform = `translateX(${didLike ? moveDistance : -moveDistance}px) rotate(${didLike ? -rotationDegrees : rotationDegrees}deg)`
  //   // this.style.boxShadow = '0 0.0625em 0.1875em 0 rgba(0, 0, 0, 0.1)'
  //   this.style.opacity = 0
  //   this.style.transition = 'all 1s ease'
  //
  //   const onAnimationComplete = evt => {
  //     if (!this.state.target || !this.state.target.parentNode) {
  //       return
  //     }
  //     evt.target.willChange = ''
  //     // evt.target.parentNode.removeChild(evt.target)
  //
  //     // remove card
  //     const targetIndex = this.state.cards.indexOf(this.state.target)
  //     this.state.cards.splice(targetIndex, 1)
  //
  //     this.state.target = null
  //     this.animateOtherCardsIntoPosition()
  //   }
  //
  //   this.state.target.addEventListener('transitionend', onAnimationComplete)
  //   // clean up event listeners
  // }

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
