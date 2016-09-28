console.log('script running')
const form = document.getElementById('form') // make this by ID
const addPhoneFieldsNodeList = document.getElementsByClassName('phone-fill')
const addPhoneFields = Array.prototype.slice.call(addPhoneFieldsNodeList)

// Set up red underline visual feedback clearing
for (let field of addPhoneFields) {
  field.addEventListener('input', function (evt) {
    if (evt.target.classList.contains('invalid-form')) {
      console.log('we have one with invalid-form class')
      evt.target.classList.remove('invalid-form')
      console.log('invalid visual feedback removed on input')
    }
  })
}

form.addEventListener('submit', function (evt) {
  console.log('submit event')
  evt.preventDefault()
  if (form.checkValidity() === false) {
    for (let field of addPhoneFields) {
      console.log('field: %s is valid? %s', field, field.validity.valid)
      if (field.value.length > 0 && !field.validity.valid) {
        console.log('phone field is valid? ', field.validity.valid)
        field.classList.add('invalid-form')
        field.setCustomValidity('US phone number')
      }
    }
  } else {
    console.log('form is valid')
    // TODO call POST function or something
    console.log('event', evt)
    const formData = new FormData(evt.target)
    const request = new XMLHttpRequest()
    request.open('POST', '/outings')
    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        console.log(request.responseText)
        window.location.href = '/outing'
      }
    }
    request.send(formData)
    console.log('form data', formData)
    return false
  }
})

import { AnimationStack } from 'swipe-cards'
console.log(`AnimationStack: %${AnimationStack}`)
