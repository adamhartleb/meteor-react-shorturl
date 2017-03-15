import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const Link = new Mongo.Collection('links')

if (Meteor.isServer) {
  Meteor.publish('links', function () {
    return Link.find({ user: this.userId })
  })
}

Meteor.methods({
  greetUser (name = 'Adam') {
    console.log('greetUser is running')
    return `Hello ${name}`
  }
})
