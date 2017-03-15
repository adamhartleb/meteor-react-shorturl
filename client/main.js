import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import { Tracker } from 'meteor/tracker'
import { Link } from '../imports/api/links'
import { routes, authentication } from '../imports/routes/routes'

Tracker.autorun(() => {
  const loggedIn = Meteor.userId()
  authentication(loggedIn)
})

Meteor.startup(() => {
  Meteor.call('greetUser', 'Pia', (err, res) => {
    console.log('Greet User Arguments', err, res)
  })
  render(routes, document.getElementById('root'))
})

