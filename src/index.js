console.log('script is running')

const form = document.getElementById('form') // make this by ID
console.log('form is of type %s, here it is: %s', typeof form, form)

form.addEventListener('submit', function (evt) {
  evt.preventDefault()
  console.log('event fired!')
  console.log('hello this fir is sick', evt)
})
