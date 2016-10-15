import React from 'react'
import ReactDOM from 'react-dom'

class Card extends React.Component {
  constructor (props) {
    super(props)

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
    this.state.screenX = 0 // The position of the card on the screen
    this.state.cardX = 0 // Animation end goal position
    this.state.isDraggingCard = false // Whether or not the card is being dragged by the user
    this.state.isNearlyAtStart = null
    this.DOMNode = null
  }

  componentDidMount () {
    this.DOMNode = ReactDOM.findDOMNode(this)
    this.addEventListeners()
  }

  addEventListeners () {
    // These might need to be in reference to the backing instance....
    // or it might just work

    this.DOMNode.addEventListener('mousedown', this.onStart)
    this.DOMNode.addEventListener('mousemove', this.onMove)
    this.DOMNode.addEventListener('mouseup', this.onEnd)

    this.DOMNode.addEventListener('touchstart', this.onStart)
    this.DOMNode.addEventListener('touchmove', this.onMove)
    this.DOMNode.addEventListener('touchend', this.onEnd)
    // document.addEventListener('touchcancel', this.onEnd)
    // TODO remove event listeners on unmount
  }

  onStart (evt) {
    // console.log('onStart called')
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

    this.state.cardBCR = this.DOMNode.getBoundingClientRect()
    window.requestAnimationFrame(this.updatePosition)

    // TODO Add/trigger network side-effects here

    // console.log('this.state.cardBCR', this.state.cardBCR)

    this.state.startX = evt.pageX || evt.touches[0].pageX
    this.state.currentX = this.state.startX

    this.state.isDraggingCard = true
    // Put the card on it's own layer for better rendering performance
    this.DOMNode.style.willChange = 'transform'
    // prevent onMove throttling in chrome
    evt.preventDefault()
  }

  onMove (evt) {
    this.state.currentX = evt.pageX >= 0 ? evt.pageX : evt.touches[0].pageX
    // console.log('onMove called', this.state.currentX)
  }

  onEnd (evt) {
    this.state.cardX = 0
    let screenX = this.state.currentX - this.state.startX
    if (!this.state.cardBCR) {
      this.state.cardBCR = this.DOMNode.getBoundingClientRect()
    }
    const dragThreshold = this.state.cardBCR.width * 0.35
    if (Math.abs(screenX) > dragThreshold) {
      console.log('we about to stock it to side')
      this.state.cardX = (screenX > 0)
      ? this.state.cardBCR.width
      : -this.state.cardBCR.width
    }
    this.state.isDraggingCard = false
  }

  updatePosition (evt) {
    // TODO dry this up with isNearlyAtStart
    if (this.state.isDraggingCard) {
      window.requestAnimationFrame(this.updatePosition)
    }

    if (this.state.isDraggingCard) {
      this.state.screenX = this.state.currentX - this.state.startX
    } else {
      // ease it back in to the start
      this.state.screenX += (this.state.cardX - this.state.screenX) / 5
    }

    const normalizedDragDistance =
      (Math.abs(this.state.screenX) / this.state.cardBCR.width)
    // TODO get hte math right between ckicking and draggings
    const rotationDegrees = (this.state.screenX / this.state.cardBCR.width) * 10

    const opacity = 1 - Math.pow(normalizedDragDistance, 3)

    this.DOMNode.style.transform = `translateX(${this.state.screenX}px) rotate(${-rotationDegrees}deg) translateY(-${Math.abs(this.state.screenX) / 8}px)`
    this.DOMNode.style.opacity = opacity

    if (this.state.isDraggingCard) {
      return
    }

    // Now, if the user is done dragging we want something else to happen
    const isNearlyAtStart = (Math.abs(this.state.screenX) < 0.1)
    const isNearlyInvisible = (opacity < 0.01)

    if (!isNearlyAtStart && !isNearlyInvisible) {
      window.requestAnimationFrame(this.updatePosition)
    }

    if (isNearlyInvisible) {
      console.log('card isNearlyInvisible!')
      // TODO Add/call/fire network side-effects here (e.g. Fetch/POST)
      // INFO swipe right = like
      // INFO swipe left = pass
      const didLike = this.state.cardX >= 0
      if (didLike) {
        this.props.handlers.like()
      } else {
        this.props.handlers.pass()
      }

      // Reset screenX to prevent next requestAnimationFrame...
      // and this could be done in a better way
      this.state.screenX = null
    } else if (isNearlyAtStart) {
      // console.log('card isNearlyAtStart!')
      this.DOMNode.style.willChange = 'initial'
      this.DOMNode.style.transform = 'none'
    }
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
  //     this.transitionEndHelper()
  //   }
  //
  //   this.state.target.addEventListener('transitionend', onAnimationComplete)
  //   // clean up event listeners
  // }

  render () {
    return (
      <div className='card'>
        <p className="card__title">{this.props.name}</p>
        <img className="card__image" width="200" height="200" />
        <div className="card__details">
          <span>
            {Array(this.props.dollarSigns + 1).join('💸')} {this.props.distance ? ` ${this.props.distance}` : ''}
          </span>
        </div>
      </div>
    )
  }
}

// Prop validation
// https://facebook.github.io/react/docs/reusable-components.html#prop-validation
Card.propTypes = {
  id: React.PropTypes.number,
  distance: React.PropTypes.string,
  dollarSigns: React.PropTypes.number
}

export default Card
