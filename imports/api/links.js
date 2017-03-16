import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'
import shortid from 'shortid'
export const Link = new Mongo.Collection('links')

if (Meteor.isServer) {
  Meteor.publish('links', function () {
    return Link.find({ user: this.userId })
  })
}

Meteor.methods({
  'Links.Insert' (url) {
    if (!this.userId) throw new Meteor.Error('Not Authorized')
    new SimpleSchema({
      url: {
        type: String,
        label: 'Your link',
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({ url })
    Link.insert({ _id: shortid.generate(), url, user: this.userId })
  }
})
