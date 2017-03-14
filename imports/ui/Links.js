import React, { Component } from 'react'
import { Accounts } from 'meteor/accounts-base'

export default class Links extends Component {
  constructor (props) {
    super(props)
    this.logOut = this.logOut.bind(this)
  }
  logOut () {
    Accounts.logout()
  }
  render () {
    return (
      <div>
        <button onClick={this.logOut}>
          Logout
        </button>
      </div>
    )
  }
}
