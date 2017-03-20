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
    Link.insert({ _id: shortid.generate(), url, user: this.userId, hidden: false, visitedCount: 0, lastVisitedAt: null })
  },
  'Links.UpdateHidden' (_id, hidden) {
    if (!this.userId) throw new Meteor.Error('Not Authorized')
    Link.update({ _id }, {$set: { hidden: !hidden }})
  },
  'Links.UpdateVisited' (_id) {
    if (!this.userId) throw new Meteor.Error('Not Authorized')
    const date = new Date()
    Link.update({ _id },
      {
        $inc: { visitedCount: 1 },
        $set: { lastVisitedAt: date }
      })
  }
})
