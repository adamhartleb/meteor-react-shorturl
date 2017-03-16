import React, { Component } from 'react'
import LinksList from './LinksList'
import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'

export default class Links extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: ''
    }
    this.logOut = this.logOut.bind(this)
    this.addLink = this.addLink.bind(this)
  }
  logOut () {
    Accounts.logout()
  }
  addLink (e) {
    e.preventDefault()
    const url = this.refs.linkUrl.value.trim()

    if (url) {
      Meteor.call('Links.Insert', url, (err, res) => {
        if (err) this.setState({ error: err.reason })
      })
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
        {(this.state.error) ? <h3>{this.state.error}</h3> : null}
      </div>
    )
  }
}
