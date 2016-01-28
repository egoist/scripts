/**
 * Check if GitHub is up again or not.
 * When goes up just notify me
 */

const notifier = require('node-notifier')
const fetch = require('node-fetch')

setInterval(() => {
  fetch('https://github.com/egoist')
    .then(data => data.text())
    .then(data => {
      if (data.indexOf(`Sorry, we're down for maintenance`) === -1) {
        notifier.notify({
          'title': 'Check GitHub',
          'message': '√ Up!'
        })
        process.exit()
      }
    })
}, 1000)
