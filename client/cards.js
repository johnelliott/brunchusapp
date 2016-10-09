// load styles here with webpack/javascript because they require the JS to be active to matter
// TODO check for FOUC
require("./theme.scss")
require("./cards.scss")

class Cards {
  constructor () {
    this.cards = Array.from(document.querySelectorAll('.card'))
    // bind this.method to the instance instead of the class
    this.onStart = this.onStart.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.onMove = this.onMove.bind(this)
    this.update = this.update.bind(this)
    this.moveCardAway = this.moveCardAway.bind(this)
    // no need to bind: this.resetTarget = this.resetTarget.bind(this)

    // state
    this.target = null
    this.targetBCR = null
    this.startX = null // Position on screen where user starts interacting
    this.currentX = null // Position of the element within the animations
    // The startX minus currentX is how far we need to transform the card overall
    this.isDraggingCard = false // Whether or not the card is being dragged by the user
    this.screenX = null // The position of the card on the screen
    this.targetX = 0 // Animation end goal position

    // initiatite interactivity

    this.addEventListeners()
    // window.requestAnimationFrame(this.update)
  }

  addEventListeners () {
    document.addEventListener('mousedown', this.onStart)
    document.addEventListener('mousemove', this.onMove)
    document.addEventListener('mouseup', this.onEnd)

    document.addEventListener('touchstart', this.onStart)
    document.addEventListener('touchmove', this.onMove)
    document.addEventListener('touchend', this.onEnd)

    document.querySelector('.buttons__like').addEventListener('click', this.moveCardAway)
    document.querySelector('.buttons__pass').addEventListener('click', this.moveCardAway)
  }

  //  requestAnimationFrame () {
  //    // TODO start when the user starts interacting, stop when the last animations finish
  //    requestAnimationFrame(this.update)
  //  }

  // update the element on each animation frame
  update () {
    window.requestAnimationFrame(this.update)

    if (!this.target) {
      return
    }

    if (this.isDraggingCard) {
      this.screenX = this.currentX - this.startX
    } else {
      // ease it back in to the start
      this.screenX += (this.targetX - this.screenX) / 5
    }

    const normalizedDragDistance =
      (Math.abs(this.screenX) / this.targetBCR.width)
    // TODO get hte math right between ckicking and draggings
    const rotationDegrees = (this.screenX / this.targetBCR.width) * 10

    const opacity = 1 - Math.pow(normalizedDragDistance, 3)

    this.target.style.transform = `translateY(${-1 * Math.abs(this.screenX / 5)}px) translateX(${this.screenX}px) rotate(${-rotationDegrees}deg)`
    this.target.style.opacity = opacity

    if (this.isDraggingCard) {
      return
    }

    // Now, if the user is done dragging we want something else to happen
    const isNearlyAtStart = (Math.abs(this.screenX) < 0.1)
    const isNearlyInvisible = (opacity < 0.01)

    if (isNearlyInvisible) {
      if (!this.target || !this.target.parentNode) {
        return
      }
      // TODO Add/call/fire network side-effects here (e.g. Fetch/POST)
      this.target.parentNode.removeChild(this.target)
      // maintain state of this.cards
      const targetIndex = this.cards.indexOf(this.target)
      this.cards.splice(targetIndex, 1)
      this.animateOtherCardsIntoPosition()
    } else if (isNearlyAtStart) {
      this.resetTarget()
    }
  }

  moveCardAway (evt) {
    // assume target is last card in stack
    this.target = this.cards[this.cards.length - 1]
    // get BCR because we don't have any
    this.targetBCR = this.target.getBoundingClientRect()
    const moveDistance = this.targetBCR.left + (this.targetBCR.width / 2)
    const rotationDegrees = moveDistance / 40
    // TODO don't rely on the button class name!
    const didLike = evt.target.className === 'buttons__like'

    // TODO Add/call/fire network side-effects here (e.g. Fetch/POST)

    this.target.style.willChange = 'transform'
    this.target.style.transform = `translateX(${didLike ? moveDistance : -moveDistance}px) rotate(${didLike ? -rotationDegrees : rotationDegrees}deg)`
    // this.target.style.boxShadow = '0 0.0625em 0.1875em 0 rgba(0, 0, 0, 0.1)'
    this.target.style.opacity = 0
    this.target.style.transition = 'all 1s ease'

    const onAnimationComplete = evt => {
      if (!this.target || !this.target.parentNode) {
        return
      }
      evt.target.willChange = ''
      evt.target.parentNode.removeChild(evt.target)

      // maintain state of this.cards
      const targetIndex = this.cards.indexOf(this.target)
      this.cards.splice(targetIndex, 1)

      this.target = null
      this.animateOtherCardsIntoPosition()
    }

    this.target.addEventListener('transitionend', onAnimationComplete)
    // clean up event listeners
  }

  animateOtherCardsIntoPosition () {
    console.log('animateOtherCardsIntoPosition called')

    const onTransitionEnd = evt => {
      // evt.target.willChange = 'initial'
      evt.target.style.transform = 'inherit'
      evt.target.style.transition = 'none'
      evt.target.removeEventListener('transitionend', onTransitionEnd)
    }

    // this.cards[0].parentNode.style.willChange = 'transform' // ??? hmm worth it?
    this.cards.forEach(card => {
      // card.style.willChange = 'transform'
      card.style.transition = 'all 1s ease'
      card.addEventListener('transitionend', onTransitionEnd)
      // card.style.transform = 'inherit'
    })
  }

  resetTarget () {
    if (!this.target) {
      return
    }

    this.target.style.willChange = 'initial'
    this.target.style.transform = 'none'
    this.target = null
  }

  onEnd (evt) {
    if (!this.target) {
      return
    }

    this.targetX = 0
    let screenX = this.currentX - this.startX
    const dragThreshold = this.targetBCR.width * 0.35
    if (Math.abs(screenX) > dragThreshold) {
      this.targetX = (screenX > 0)
      ? this.targetBCR.width
      : -this.targetBCR.width
    }

    // update state now that we're no longer dragging
    this.isDraggingCard = false
  }

  onMove (evt) {
    if (!this.target) {
      return
    }
    this.currentX = evt.pageX || evt.touches[0].pageX
  }

  onStart (evt) {
    // Ignore not clicking on a card
    if (!evt.target.className.match(/card/)) {
      return
    }
    window.requestAnimationFrame(this.update)

    // TODO Add/trigger network side-effects here

    // Set target in instance state
    this.target = getCardNode(evt.target)

    function getCardNode (node) {
      if (node.classList.contains('card')) {
        return node
      } else {
        return getCardNode(node.parentElement)
      }
    }

    this.targetBCR = this.target.getBoundingClientRect()

    this.startX = evt.pageX || evt.touches[0].pageX
    this.currentX = this.startX

    this.isDraggingCard = true
    // Put the card on it's own layer for better rendering performance
    this.target.style.willChange = 'transform'
    // prevent onMove throttling in chrome
    evt.preventDefault()
  }

}

window.addEventListener('load', function () { new Cards() })

export default Cards
