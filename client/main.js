import { Meteor } from 'meteor/meteor'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import Login from '../imports/ui/Login'
import Register from '../imports/ui/Register'
import Links from '../imports/ui/Links'
import FourOhFour from '../imports/ui/FourOhFour'

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Login} />
    <Route path='/links' component={Links} />
    <Route path='/register' component={Register} />
    <Route path='*' component={FourOhFour} />
  </Router>
)



Meteor.startup(() => {
  render(routes, document.getElementById('root'))
})

