import React, { Component } from 'react'
import LinksList from './LinksList'
import { Accounts } from 'meteor/accounts-base'
import { Link } from '../api/links'
import { Meteor } from 'meteor/meteor'

export default class Links extends Component {
  constructor (props) {
    super(props)

    this.logOut = this.logOut.bind(this)
    this.addLink = this.addLink.bind(this)
  }
  logOut () {
    Accounts.logout()
  }
  addLink (e) {
    e.preventDefault()
    const user = Meteor.userId()
    const url = this.refs.linkUrl.value.trim()

    if (url) {
      Link.insert({ url, user })
      this.refs.linkUrl.value = ''
    }
  }

  render () {
    return (
      <div>
        <button onClick={this.logOut}>Logout</button>
        <h3>Add Link</h3>
        <LinksList />
        <form onSubmit={this.addLink}>
          <input type='text' ref='linkUrl' placeholder='URL' />
          <button>Add Link</button>
        </form>
      </div>
    )
  }
}
