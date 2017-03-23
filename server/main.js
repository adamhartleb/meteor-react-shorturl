import { Meteor } from 'meteor/meteor'
import { WebApp } from 'meteor/webapp'

import '../imports/api/users'
import { Link } from '../imports/api/links'
import '../imports/startup/simplSchemaConfig'

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    console.log(req.url)
    const _id = req.url.slice(1)
    const result = Link.findOne({ _id })
    if (result) {
      let urlSubStr = result.url.substring(0, 4)
      if (urlSubStr !== 'http') result.url = 'https://' + result.url
      res.statusCode = 302
      res.setHeader('Location', result.url)
      res.end()
      Meteor.call('Links.UpdateVisited', _id)
    } else {
      next()
    }
  })
})
