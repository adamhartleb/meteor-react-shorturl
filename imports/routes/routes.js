import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import Login from '../ui/Login'
import Register from '../ui/Register'
import Links from '../ui/Links'
import FourOhFour from '../ui/FourOhFour'

const onlyLoggedOutPages = ['/', '/register']
const onlyLoggedInPages = ['/links']
const enterPublicPage = () => {
  if (Meteor.userId()) browserHistory.replace('/links')
}
const enterPrivatePage = () => {
  if (!Meteor.userId()) browserHistory.replace('/')
}



export const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Login} onEnter={enterPublicPage} />
    <Route path='/links' component={Links} onEnter={enterPrivatePage} />
    <Route path='/register' component={Register} onEnter={enterPublicPage} />
    <Route path='*' component={FourOhFour} />
  </Router>
)

export const authentication = (authenicated) => {
  const pathname = browserHistory.getCurrentLocation().pathname
  const isLoggedOutPage = onlyLoggedOutPages.includes(pathname)
  const isLoggedInPage = onlyLoggedInPages.includes(pathname)

  if (authenicated && isLoggedOutPage) browserHistory.replace('/links')
  if (!authenicated && isLoggedInPage) browserHistory.replace('/')
}

