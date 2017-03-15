import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import SimpleSchema from 'simpl-schema'

Accounts.validateNewUser(user => {
  try {
    new SimpleSchema({
      email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
      }
    }).validate({ email: user.emails[0].address })
  } catch (e) {
    throw new Meteor.Error(400, e.message)
  }

  return true
})
