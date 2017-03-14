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

    if (password.length < 6) return this.setState({ error: 'Password must be greater than 6 characters long' })

    Accounts.createUser({ email, password }, (err) => {
      if (err) this.setState({ error: err.reason })
      else this.setState({ error: '' })
    })
  }

  render () {
    return (
      <div>
        <h1>Register for Shrt Url</h1>
        <form onSubmit={(e) => this.createAccount(e)} noValidate>
          <input type='email' name='email' placeholder='Email' ref='email' />
          <input type='password' name='password' placeholder='Password' ref='password' />
          <button>Sign Up</button>
        </form>
        <div>
          {this.state.error ? <h3>{this.state.error}</h3> : null}
        </div>
      </div>
    )
  }
}
