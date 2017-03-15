import { Meteor } from 'meteor/meteor'
import validateUser from '../imports/api/users'
import { Links } from '../imports/api/links'

Meteor.startup(() => {
  validateUser()
})
