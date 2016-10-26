# [Brunch Us 🍳](https://brunchus.primitivemachine.com)

A web app for friends to choose a brunch spot using SMS and a familiar stack of cards UI.

*WIP* :]

# About
The app loads with some initial markup and CSS before the react app starts. A service worker caches assets on supported clients. Swiping is via a React app with server-renderd HTML. Animations are part react-addons-css-transition-group (add/remove cards) and part vanilla JS (swiping cards).

![Phone UIs](http://67.media.tumblr.com/391e3ff73565221adeb6a479f3b2804b/tumblr_ofntwgQC2u1viup31o1_400.png)

![Phone UI](http://67.media.tumblr.com/2decd9997f29066adc4e0d41359c668f/tumblr_of1m0ypkZZ1viup31o1_400.jpg)

## What's inside?
```
client
  individual css files per page: sass files, required by JS files, munged by webpack -> .css files, added to a style tag by pug templates
  snowflake onboarding page
    static form html
    individual form.js
  cards module in es6
server
  html onboarding page with form that works without javascript
  server-render/cache app shell via pug templates
build system
  webpack and npm scripts
  multiple webpack configs
deploys
  re-use ansible and AWS bits from wb-deploy project
```
## In progress
- Ingredient options modal for recommendations: gluten, vegan, veg, dog, outside, coffee, internet
- TLS / browser geolocation API
- CSS


## Testimonials
"A brunch app is a wonderful thing. If you need testers I think you should call on me because I am a trained professional when it comes to brunch." - Mom
