import { Meteor } from 'meteor/meteor'
import validateUser from '../imports/api/users'

Meteor.startup(() => {
  validateUser()
})
