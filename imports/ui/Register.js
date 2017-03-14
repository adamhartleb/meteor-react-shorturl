import React, { Component } from 'react'
import { Accounts } from 'meteor/accounts-base'

export default class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: ''
    }
    this.createAccount = this.createAccount.bind(this)
  }

  createAccount (e) {
    e.preventDefault()

    const email = this.refs.email.value.trim()
    const password = this.refs.password.value.trim()

    Accounts.createUser({ email, password }, (err) => {
      this.setState({
        error: err.reason
      })
    })
  }

  render () {
    return (
      <div>
        <form onSubmit={(e) => this.createAccount(e)}>
          <input type='email' name='email' placeholder='Email' ref='email' />
          <input type='password' name='password' placeholder='Password' ref='password' />
          <button>Sign Up</button>
        </form>
        <div>
          {this.state.error ? <div>{this.state.error}</div> : null}
        </div>
      </div>
    )
  }
}
