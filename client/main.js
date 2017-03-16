import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import { Tracker } from 'meteor/tracker'
import { routes, authentication } from '../imports/routes/routes'
import '../imports/startup/simplSchemaConfig'

Tracker.autorun(() => {
  const loggedIn = Meteor.userId()
  authentication(loggedIn)
})

Meteor.startup(() => {
  render(routes, document.getElementById('root'))
})

