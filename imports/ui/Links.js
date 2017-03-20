import React, { Component } from 'react'
import LinksList from './LinksList'
import AddLink from './AddLink'
import { LogoutHeader } from './LogoutHeader'

export default class Links extends Component {
  render () {
    return (
      <div>
        <LogoutHeader title='Links' />
        <LinksList />
        <AddLink />
      </div>
    )
  }
}
