import { Meteor } from 'meteor/meteor'
import { WebApp } from 'meteor/webapp'

import '../imports/api/users'
import { Link } from '../imports/api/links'
import '../imports/startup/simplSchemaConfig'

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1)
    const result = Link.findOne({ _id })
    if (result) {
      res.statusCode = 302
      res.setHeader('Location', result.url)
      res.end()
      Meteor.call('Links.UpdateVisited', _id)
    } else {
      next()
    }
  })
})
